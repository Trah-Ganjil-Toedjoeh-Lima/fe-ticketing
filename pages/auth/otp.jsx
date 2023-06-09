import { useState } from "react";

import Swal from "sweetalert2";
import OTPInput from "react-otp-input";
import { Card } from "flowbite-react";
import { useRouter } from "next/router";

import { axiosInstance } from "@/utils/config";
import { EnvelopeOpenIcon } from "@heroicons/react/24/solid";
import { FaArrowLeft, FaCheck } from "react-icons/fa";

import {
  notifyError,
  notifyErrorMessage,
  notifyInfo,
  notifySucces,
} from "@/components/notify";
import { useEffect } from "react";
export default function OtpPage() {
  const router = useRouter();
  const loginInput = router.query;
  const [otp, setOtp] = useState("");

  useEffect(() => {
    async function checkIfTokenValid() {
      try {
        const res = await axiosInstance.get("/api/v1/user/profile"); //login-only endpoint
        notifyErrorMessage("Anda sudah login");
        if (res.status === 200)
          router.push({
            pathname: "/profile",
          });
        return;
      } catch (err) {
        // Only goes here when the status isn't 200 OK
        if (err.response.status !== 200) {
          notifyErrorMessage("Token Expired. Silahkan login kembali.");
          localStorage.removeItem("auth_token");
          router.push("/auth");
          return;
        }
      }
    }

    if (localStorage.getItem("auth_token")) {
      checkIfTokenValid();
    } else if (loginInput.email === undefined) {
      notifyErrorMessage("Email tidak boleh kosong");
      router.push({
        pathname: "/auth",
      });
    }
  }, []);

  useEffect(() => {
    Swal.fire({
      html: `Kode OTP anda <br><br> ${loginInput.otp}`,
      toast: false,
      icon: "warning",
      iconColor: "#f6f7f1",
      background: "#2d2d2f",
      color: "#f6f7f1",
      showConfirmButton: true,
      cancelButtonColor: "#c76734",
      confirmButtonText: "OK",
      confirmButtonColor: "#287d92",
      showClass: {
        popup: "",
      },
    });
  }, []);

  async function LoginSubmit(e) {
    e.preventDefault();

    if (otp.length == 6) {
      try {
        await axiosInstance
          .post("/api/v1/user/otp", {
            email: loginInput.email,
            otp: otp,
          })
          .then((res) => {
            if (res.status === 200) {
              localStorage.setItem(
                "auth_token",
                `Bearer ${res.data.token.AccessToken}`
              );
              Swal.fire({
                html: `<b>${res.data.message}</b> tunggu...`,
                toast: true,
                width: 300,
                icon: "success",
                color: "#f6f7f1",
                background: "#2d2d2f",
                iconColor: "#287d92",
                showConfirmButton: false,
                timer: 1500,
                showClass: {
                  popup: "",
                },
              }).then(() => {
                notifySucces("Login Berhasil");
                router.push({
                  pathname: "/profile",
                });
              });
            }
          });
      } catch (err) {
        if (err.response.data.message === "otp is not valid") {
          notifyErrorMessage("Kode OTP tidak valid");
        } else {
          notifyErrorMessage(err.response.data.message);
        }
      }
    } else if (otp.length === 0) {
      notifyErrorMessage("Kode OTP tidak boleh kosong");
    } else {
      notifyErrorMessage("Kode OTP harus 6 digit");
    }
  }

  function handleBack() {
    router.push({
      pathname: "/auth",
    });
  }

  if (typeof window !== "undefined") {
    const btn = document.getElementById("Submit");
    if (btn) {
      // Not called
      btn.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          document.getElementById("Submit").click();
        }
      });
    }
  }
  console.log(loginInput.otp);
  // notifyInfo("kode otp anda: " + loginInput.otp)

  return (
    <div className='max-w-screen flex min-h-screen flex-col items-center justify-center bg-gmco-grey'>
      <form action='#' onSubmit={LoginSubmit}>
        <Card className=' flex  max-w-sm items-center rounded-lg border border-slate-100 bg-slate-300 bg-opacity-40 bg-clip-padding py-4 backdrop-blur-sm backdrop-filter sm:pl-1 md:max-w-xl md:px-4 md:py-7 lg:px-6 '>
          <div
            className='-mt-3 flex cursor-pointer gap-3 duration-300  hover:scale-x-105 hover:scale-y-125'
            onClick={handleBack}
          >
            <FaArrowLeft className=' left-0  h-6 w-6  text-gmco-white'></FaArrowLeft>
            <span className='text-base text-gmco-white'> Kembali</span>
          </div>
          <EnvelopeOpenIcon className='mx-auto h-16 w-16 stroke-gmco-white text-gmco-white' />
          <div className='self-center text-2xl font-bold  text-gmco-white md:text-3xl'>
            Masukkan Kode Verifikasi
          </div>
          <div className='text-md text-center text-gmco-white  sm:text-sm '>
            <p className=''>
              Kode verifikasi telah dikirim ke{" "}
              <span className='font-medium text-cyan-200'>
                {loginInput.email}
              </span>{" "}
            </p>{" "}
            <span className='text-justify'>
              Silakan tunggu beberapa menit. Periksa folder <b>spam</b> di email
              Anda jika tidak melihat email masuk untuk memastikan pesan OTP
              tidak terlewat.{" "}
            </span>
          </div>
          <div className='mx-auto mt-9 items-center object-center  '>
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span>-</span>}
              renderInput={(props) => <input {...props} />}
              inputType='number'
              inputStyle={{
                fontFamily: "monospace",
                margin: "0.1em",
                width: "2.5em",
                borderRadius: "10px",
                fontSize: "20px",
                height: "2.5em",
                textAlign: "center",
                backgroundColor: "white",
                color: "black",
                border: "1px solid white",
              }}
            />
          </div>
          <br />
          <div className='text-md text-center text-gmco-white  sm:text-sm '>
            <button
              type='submit'
              className='font type mt-1 w-full rounded-xl border border-gmco-white bg-gmco-orange-secondarylight p-2 text-base font-semibold text-white hover:border  hover:border-gray-300 hover:bg-gmco-yellow-secondary hover:text-gmco-white md:p-2 md:text-lg'
              onClick={LoginSubmit}
            >
              <FaCheck className='mr-2 inline-block' />
              Submit
            </button>
          </div>
        </Card>
      </form>
    </div>
  );
}
