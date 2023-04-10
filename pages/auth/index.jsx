import React from "react";

export default function index() {
  return (
    <section className="bg-gmco-grey min-h-screen block items-center justify-center p-4 md:flex">
      <div className=" bg-[url('/GMCO.jpg')] bg-cover bg-left-top flex flex-col items-center  max-w-screen-lg overflow-hidden rounded-lg shadow-lg w-full md:flex-row md:m-10">
        {/* leftside */}
        <div className=" backdrop-filter flex flex-col text-white justify-center items-center w-full p-4 md:w-1/2 md:p-10  ">
          <h1 className="mb-3 text-4xl font-bold md:text-3xl"> GC GMCO </h1>
          <p className="mb-3 text-2xl font-bold md:text-xl"> Anjangsana Symphony </p>
        </div>

        <div className="py-40 bg-white flex flex-col items-center p-4 space-y-8 w-full md:w-1/2 md:h-1/2  ">
          <div className="flex flex-col items-center ">
            <h1 className="mb-3 text-xl font-bold"> Welcome to GC GMCO</h1>
            <p>Login to your account</p>
          </div>
          <form action="" className="flex flex-col items-center space-y-4">
            <div className="relative">
              <label class="mb-2 text-md">Email</label>
              <input
                type="email"
                placeholder="johndoe@mail.com"
                class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                id="email"
              />
            </div>
            <button class="w-full bg-gmco-blue text-white p-2 rounded-lg mb-6 hover:bg-gmco-yellow-secondary hover:text-gmco-white hover:border hover:border-gray-300">
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
