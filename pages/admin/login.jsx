import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { axiosInstance } from "@/atoms/config";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { notifyError } from "../../components/notify";

export default function AdminLogin() {
  const router = useRouter();

  useEffect(() => {
    // Check if admin is logged in
    if (typeof window !== "undefined") {
      // If so, redirect to /admin
      if (localStorage.getItem("auth_token")) {
        router.push("/admin");
      }
    }
  }, []);

  const [loginInput, setLoginInput] = useState({
    name: "",
    email: "",
    phone: "",
  });

  function handleInput(e) {
    e.persist();
    setLoginInput({ ...loginInput, [e.target.id]: e.target.value });
  }

  async function loginSubmit(e) {
    e.preventDefault();
    try {
      console.log(JSON.stringify(loginInput));
      await axiosInstance
        .post("/v1/user/login", {
          name: loginInput.name,
          email: loginInput.email,
          phone: loginInput.phone,
        })
        .then((res) => {
          if (res.status === 200) {
            console.log(res.data);
            localStorage.setItem(
              "auth_token",
              `Bearer ${res.data.token.AccessToken}`
            );
            router.push("/admin");
          }
        });
    } catch (err) {
      notifyError(err);
    }
  }

  return (
    <section className='block min-h-screen items-center justify-center bg-gmco-grey p-4 md:flex'>
      <div className="relative flex w-full max-w-screen-lg flex-col overflow-hidden rounded-lg bg-[url('/Micon-Cropped.webp')] bg-cover shadow-lg md:m-10 md:flex-row ">
        {/* leftside */}
        <div className='place ml-3 mt-14  flex h-3/6 w-full flex-col p-4 text-white backdrop-filter md:mt-0 md:w-7/12 md:items-start md:p-10'>
          <h1 className='mb-3 text-4xl font-bold md:text-5xl'>
            {" "}
            Grand Concert{" "}
          </h1>
          <p className='font-base mb-3 text-2xl md:text-3xl'>Vol. 10</p>
          <p className=' font-base text-2xl md:text-2xl'>
            {" "}
            Anjangsana Simfoni{" "}
          </p>
        </div>
        <img
          src='/logo_gmco.webp'
          alt=''
          className='absolute left-5 top-3 w-32 md:left-9 md:top-3/4 md:w-52'
        />

        <div className='right-0 mt-7 flex w-full flex-col items-center space-y-8 bg-gray-400 bg-opacity-50 p-4 py-32 backdrop-blur-sm backdrop-filter md:mt-0 md:w-5/12 md:py-40 '>
          <div className='-mt-7 flex flex-col items-center'>
            <h1 className='mb-3 text-4xl font-bold text-gmco-white'>
              Login Admin
            </h1>
          </div>
          <form
            action='#'
            className='flex flex-col items-center space-y-4'
            onSubmit={loginSubmit}
          >
            <div className='relative'>
              <label className=' pl-2 text-base text-gmco-white'>
                Masukkan email, nama, dan nomor telepon admin.
              </label>
              <div className='relative flex flex-col items-center justify-center'>
                <input
                  type='email'
                  placeholder='Email'
                  onChange={(e) => handleInput(e)}
                  value={loginInput.email}
                  className='mt-2 w-11/12 rounded-[20px] border border-gray-300 py-2 placeholder:font-light placeholder:text-gray-500'
                  id='email'
                />
                <EnvelopeIcon className='absolute right-8 top-3.5 h-7 w-7 stroke-slate-400'>
                  {" "}
                </EnvelopeIcon>
                <input
                  type='text'
                  placeholder='Name'
                  onChange={(e) => handleInput(e)}
                  value={loginInput.name}
                  className='mt-2 w-11/12 rounded-[20px] border border-gray-300 py-2 placeholder:font-light placeholder:text-gray-500'
                  id='name'
                />
                <input
                  type='number'
                  placeholder='Phone'
                  onChange={(e) => handleInput(e)}
                  value={loginInput.phone}
                  className='mt-2 w-11/12 rounded-[20px] border border-gray-300 py-2 placeholder:font-light placeholder:text-gray-500'
                  id='phone'
                />
              </div>
            </div>
            <label className='my-2 text-center text-sm text-gmco-white'>
              Khusus untuk administrator.
            </label>

            <button
              type='submit'
              className='mb-6 w-full rounded-full border-2 border-white bg-gmco-orange-secondarylight p-2 font-semibold text-white  hover:bg-gmco-yellow-secondary hover:text-gmco-white'
            >
              LOG IN
            </button>
            <label className='pt-3 text-center text-xs text-gmco-white'>
              Gadjah Mada Chamber Orchestra
            </label>
          </form>
        </div>
      </div>
    </section>
  );
}
