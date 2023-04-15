import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { axiosInstance } from "@/atoms/config";

export default function AdminLogin() {
  const router = useRouter();
  const [loginInput, setLoginInput] = useState({
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
        .post("/api/v1/user/login", {
          email: loginInput.email,
          phone: loginInput.phone,
        })
        .then((res) => {
          if (res.status === 200) {
            console.log(res.data);
            localStorage.setItem("auth_token", res.data.token.AccessToken);
            router.push("/admin");
          }
        });
    } catch (err) {
      notifyError(err);
    }
  }

  return (
    <div>
      <div className='py-40 bg-gray-300 backdrop-filter backdrop-blur-sm bg-opacity-50 flex flex-col items-center right-0 p-4 space-y-8 w-full md:w-5/12 md:h-1/2  '>
        <div className='flex flex-col items-center '>
          <h1 className='mb-3 text-xl font-bold'>
            {" "}
            Grand Concert Vol. 10 Anjangsana Simfoni
          </h1>
          <p>Login Admin</p>
        </div>
        <form
          action='#'
          className='flex flex-col items-center space-y-4'
          onSubmit={loginSubmit}
        >
          <div className='relative'>
            <label class='mb-2 text-md'>Email</label>
            <input
              type='email'
              placeholder='johndoe@mail.com'
              onChange={(e) => handleInput(e)}
              value={loginInput.email}
              class='w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500'
              id='email'
            />
            <input
              type='phone'
              placeholder='1-800-273-8255'
              onChange={(e) => handleInput(e)}
              value={loginInput.phone}
              class='w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500'
              id='phone'
            />
          </div>
          <button
            type='submit'
            class='w-full bg-gmco-blue text-white p-2 rounded-lg mb-6 hover:bg-gmco-yellow-secondary hover:text-gmco-white hover:border hover:border-gray-300 type'
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
