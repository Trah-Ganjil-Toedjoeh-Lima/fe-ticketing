import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { axiosInstance } from "@/atoms/config";

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
        .post("/api/v1/user/login", {
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
    <div>
      <div className='right-0 flex w-full flex-col items-center space-y-8 bg-gray-300 bg-opacity-50 p-4 py-40 backdrop-blur-sm backdrop-filter md:h-1/2 md:w-5/12  '>
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
            <label class='text-md mb-2'>Name</label>
            <input
              type='name'
              placeholder='Ngademin Siapa?'
              onChange={(e) => handleInput(e)}
              value={loginInput.name}
              class='w-full rounded-md border border-gray-300 p-2 placeholder:font-light placeholder:text-gray-500'
              id='name'
            />
            <label class='text-md mb-2'>Email</label>
            <input
              type='email'
              placeholder='johndoe@mail.com'
              onChange={(e) => handleInput(e)}
              value={loginInput.email}
              class='w-full rounded-md border border-gray-300 p-2 placeholder:font-light placeholder:text-gray-500'
              id='email'
            />
            <label class='text-md mb-2'>Phone</label>
            <input
              type='phone'
              placeholder='1-800-273-8255'
              onChange={(e) => handleInput(e)}
              value={loginInput.phone}
              class='w-full rounded-md border border-gray-300 p-2 placeholder:font-light placeholder:text-gray-500'
              id='phone'
            />
          </div>
          <button
            type='submit'
            class='type mb-6 w-full rounded-lg bg-gmco-blue p-2 text-white hover:border hover:border-gray-300 hover:bg-gmco-yellow-secondary hover:text-gmco-white'
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
