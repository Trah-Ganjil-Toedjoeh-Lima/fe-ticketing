import React from "react";


export default function index() {
  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
        {/* leftside */}
        <div className=" flex flex-col justify-center p-8 md:p-14">
          <span className="mb-3 text-4xl font-bold"> Welcome to GC GMCO</span>
          <span className="mb-3 text-4xl font-bold"> Login</span>
          <form action="">
            <div className="py-4">
              <span class="mb-2 text-md">Email</span>
              <input
                type="text"
                class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                name="email"
                id="email"
              />
            </div>
            <button class="w-full bg-black text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-black hover:border hover:border-gray-300">
              Sign in
            </button>
          </form>
        </div>
        {/* right side */}
        <div class="relative">
          <img
            src="/herotemp.jpg"
            alt=""
            className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
          />
          <div class="absolute hidden top-5 right-6 p-6 bg-white bg-opacity-30 backdrop-blur-sm rounded drop-shadow-lg md:block">
            <span class="text-white text-xl">Welcome to GC GMCO</span>
          </div>
        </div>
      </div>
    </section>
  );
}
