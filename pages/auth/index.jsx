import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";

import { EnvelopeIcon } from "@heroicons/react/24/outline";

import { notifyError, notifyErrorMessage } from "@/components/notify";
import { axiosInstance } from "@/utils/config";
import { useEffect } from "react";

export default function Auth() {
  const router = useRouter();
  const [loginInput, setLoginInput] = useState({
    email: "",
    otp: "",
  });

  function HandleInput(e) {
    e.persist();
    setLoginInput({ ...loginInput, [e.target.id]: e.target.value });
  }

  // function testSubmit(e) {
  //   e.preventDefault();
  //   router.push({
  //     pathname: "/auth/otp",
  //     query: { loginInput: loginInput.email },
  //   });
  // }

  useEffect(() => {
    async function checkIfTokenValid() {
      if (localStorage.getItem("auth_token")) {
        try {
          const res = await axiosInstance.get("/api/v1/user/profile"); //login-only endpoint
          if (res.status === 200) notifyErrorMessage("Anda sudah login");
          router.push({
            pathname: "/profile",
          });
          return;
        } catch (err) {
          if (err.response.status !== 200) {
            notifyErrorMessage("Token Expired. Silahkan login kembali.");
            localStorage.removeItem("auth_token");
          }
        }
      }
    }
    checkIfTokenValid();
  }, []);

  async function LoginSubmit(e) {
    e.preventDefault();
    if (loginInput.email === "") {
      notifyErrorMessage("Email tidak boleh kosong");
      return;
    }

    try {
      await axiosInstance
        .post("/api/v1/user/register_email", {
          email: loginInput.email,
        })
        .then((res) => {
          // const otp = res.data.totp_token;
          setLoginInput({ ...loginInput, otp: res.data.totp_token });
          if (res.status === 200) {
            // localStorage.setItem("auth_token", res.data.access_token);
            router.push(
              // "/auth/otp"
              {
                pathname: "/auth/otp",
                query: { email: loginInput.email, otp: res.data.totp_token },
              },
              "/auth/otp"
            );
            console.log(res.data);
          }
        });
    } catch (err) {
      //console.log(err);
      if (err.response.status === 425) {
        notifyErrorMessage("Anda belum bisa login. Silahkan coba lagi nanti.");
      }
      router.push("/");
      //notifyError();
    }
  }

  if (typeof window !== "undefined") {
    const btn = document.getElementById("login");
    if (btn) {
      // Not called
      btn.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          document.getElementById("login").click();
        }
      });
    }
  }

  function handleGoBack() {
    router.back();
  }

  return (
    <section className='max-w-screen block min-h-screen items-center justify-center bg-gmco-grey p-4 md:flex'>
      <div className=' relative flex w-full max-w-screen-lg flex-col overflow-hidden rounded-lg bg-cover shadow-lg md:m-10 md:flex-row '>
        {/* leftside */}
        <div className='absolute h-full w-full bg-gmco-grey'>
          <Image
            src='/seatmap/GMCO.webp'
            alt='bg gmco concert'
            className='h-full w-auto object-cover opacity-50'
            width={2000}
            height={2000}
          />
        </div>
        <div className='place relative ml-3 mt-14  flex h-3/6 w-full flex-col p-4 text-white backdrop-filter md:mt-0 md:w-7/12 md:items-start md:p-10 '>
          <h1 className='mb-3 text-4xl font-bold md:text-5xl'>
            Grand Concert{" "}
          </h1>
          <p className='font-base mb-3 text-2xl md:text-3xl'>Vol.10</p>
          <p className=' font-base text-2xl md:text-2xl'>Anjangsana Simfoni </p>
        </div>
        <Image
          src='/logo-anjangsana.webp'
          alt='logo'
          className='absolute left-5 top-3 w-12  md:left-9 md:top-3/4 md:w-32'
          width={1000}
          height={1000}
        />

        <div className='right-0 mt-7 flex w-full flex-col items-center space-y-8 bg-gray-400 bg-opacity-50 p-4 py-32 backdrop-blur-sm backdrop-filter md:mt-0 md:w-5/12 md:py-40 '>
          <div className='-mt-7 flex flex-col items-center'>
            <h1 className='mb-3 text-4xl font-bold text-gmco-white'>
              Selamat Datang
            </h1>
          </div>
          <form
            action='#'
            className='flex flex-col items-center space-y-4'
            onSubmit={LoginSubmit}
          >
            <div className='w-full'>
              <label className='pl-2 text-base text-gmco-white'>
                Masukkan email anda
              </label>
              <div className='relative flex w-full items-stretch'>
                <div className=' flex'></div>
                <input
                  type='email'
                  placeholder='Email'
                  onChange={(e) => HandleInput(e)}
                  value={loginInput.email}
                  className='mt-2 w-full rounded-[20px] border border-gray-300 py-2 placeholder:font-light placeholder:text-gray-500'
                  id='email'
                  required
                />
                <EnvelopeIcon className='absolute right-4 top-4 h-7 w-7 stroke-slate-400'>
                  {" "}
                </EnvelopeIcon>
              </div>
            </div>
            <label className='my-2 text-center text-sm text-gmco-white'>
              Anda akan dikirimkan kode OTP melalui email.
              <br /> Pastikan email yang anda gunakan valid
            </label>

            <button
              type='submit'
              className='mb-6 w-full rounded-full border-2 border-white bg-gmco-orange-secondarylight p-2 font-semibold text-white  hover:bg-gmco-yellow-secondary hover:text-gmco-white'
            >
              LOG IN / REGISTER
            </button>

            <button
              onClick={handleGoBack}
              className='mb-6 w-full rounded-full border-2 border-white bg-gmco-orange-secondarylight p-2 font-semibold text-white  hover:bg-gmco-yellow-secondary hover:text-gmco-white'
            >
              KEMBALI
            </button>

            <label className='pt-3 text-center text-xs text-gmco-white'>
              Gadjah Mada Chamber Orchestra
            </label>
          </form>
        </div>
      </div>
      {/* right side */}
    </section>
  );
}
