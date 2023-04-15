import React from "react";
import { useState } from "react";
import { notifyError } from "../../components/notify";
import { useRouter } from "next/router";
import { axiosInstance } from "@/atoms/config";

export default function Index() {
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

  async function LoginSubmit(e) {
    e.preventDefault();
    try {
      console.log(JSON.stringify(loginInput));
      await axiosInstance
        .post("/api/v1/user/register_email", {
          email: loginInput.email,
        })
        .then((res) => {
          const otp = res.data.totp_token;
          setLoginInput({ ...loginInput, otp: res.data.totp_token });
          if (res.status === 200) {
            // localStorage.setItem("auth_token", res.data.access_token);
            router.push({
              pathname: "/auth/otp",
              query: {
                email: loginInput.email,
                otp: res.data.totp_token,
              },
            });
          }
        });
    } catch (err) {
      notifyError(err);
    }
  }

  if (process.browser) {
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

  return (
    <section className="bg-gmco-grey min-h-screen block items-center justify-center p-4 md:flex">
      <div className=" relative bg-[url('/GMCO.jpg')] bg-cover flex flex-col  max-w-screen-lg overflow-hidden rounded-lg shadow-lg w-full md:flex-row md:m-10 ">
        {/* leftside */}
        <div className=" backdrop-filter flex flex-col  text-white w-full place mt-14 ml-3 p-4 h-3/6 md:w-7/12 md:p-10 md:items-start md:mt-0 ">
          <h1 className="mb-3 text-4xl font-bold md:text-5xl">
            {" "}
            Grand Concert{" "}
          </h1>
          <p className="mb-3 text-2xl font-base md:text-3xl">Vol.10</p>
          <p className=" text-2xl font-base md:text-2xl">
            {" "}
            Anjangsana Simfoni{" "}
          </p>
        </div>
        <img
          src="/logo_gmco.webp"
          alt=""
          className="absolute w-32 top-3 left-5 md:top-3/4 md:w-52 md:left-9"
        />

        <div className="py-32 bg-gray-300 backdrop-filter backdrop-blur-sm bg-opacity-50 flex flex-col items-center right-0 p-4 space-y-8 w-full mt-7 md:w-5/12 md:mt-0 md:py-40 ">
          <div className="flex flex-col items-center ">
            <h1 className="mb-3 text-xl font-bold"> Welcome to GC GMCO</h1>
            <p>Login to your account</p>
          </div>
          <form
            action="#"
            className="flex flex-col items-center space-y-4"
            onSubmit={LoginSubmit}
          >
            <div className="relative">
              <label class="mb-2 text-md">Email</label>
              <input
                type="email"
                placeholder="johndoe@mail.com"
                onChange={(e) => HandleInput(e)}
                value={loginInput.email}
                class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                id="email"
              />
            </div>
            <button
              type="submit"
              class="w-full bg-gmco-blue text-white p-2 rounded-lg mb-6 hover:bg-gmco-yellow-secondary hover:text-gmco-white hover:border hover:border-gray-300 type"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
      {/* right side */}
      {/* <div class=" md:w-1/3 lg:w-1/4">
          <img
            src="/herotemp.jpg"
            alt=""
            className="w-full h-full hidden lg:rounded-r-2xl md:block object-cover"
          />
          <div class="absolute hidden top-5 right-6 p-6 bg-white bg-opacity-30 backdrop-blur-sm rounded drop-shadow-lg md:block">
            <span class="text-white text-xl">Welcome to GC GMCO</span>
          </div>
        </div> */}
    </section>
  );
}
