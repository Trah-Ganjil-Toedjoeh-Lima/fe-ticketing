import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";
import { axiosInstance } from "@/atoms/config";

export default function Error() {
  const router = useRouter();

  async function logoutSubmit(e) {
    e.preventDefault();

    if (!localStorage.getItem("auth_token")) {
      router.push("/admin/login");
    } else {
      await axiosInstance.post("/api/v1/user/logout").then((res) => {
        if (res.data.message == "success") {
          localStorage.removeItem("auth_token");
          router.push("/admin/login");
        }
      });
    }
  }

  return (
    <>
      <Head>
        <title>Error!</title>
      </Head>
      <div className="relative min-h-screen bg-gmco-orange-secondarydark p-4 md:flex">
        <div className="container relative items-center justify-center space-y-4">
          <div className="text-4xl font-bold text-gray-50">
            Error: Unauthorized
          </div>
          <div>
            <p className="text-base text-gray-50">
              Oops! Your account is not authorized to access this route.
              <br/> Please log out, then log in as an admin.<br/>
              <p className="italic">Only click if you are an admin!</p>
            </p>
          </div>
          <div>
            <button
              onClick={(e) => logoutSubmit(e)}
              type="submit"
              className="mb-6 w-40 rounded-full border-2 border-white bg-gmco-orange-secondarylight p-2 font-semibold text-white  hover:bg-gmco-yellow-secondary hover:text-gmco-white"
            >
              LOG OUT
            </button>
          </div>
          <div>
            <p className="text-base text-gray-50">
              If you are not an admin, you can go back home.
            </p>
          </div>
          <div>
            <button
              onClick={() => router.push("/")}
              type="submit"
              className="mb-6 w-56 rounded-full border-2 border-white bg-gmco-orange-secondarylight p-2 font-semibold text-white  hover:bg-gmco-yellow-secondary hover:text-gmco-white"
            >
              BACK TO HOME
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
