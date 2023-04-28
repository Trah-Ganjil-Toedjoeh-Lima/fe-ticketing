import { useState } from "react";

import Swal from "sweetalert2";
import OTPInput from "react-otp-input";
import { Card } from "flowbite-react";
import { useRouter } from "next/router";

import { notifyError } from "@/components/notify";
import { axiosInstance } from "@/atoms/config";
import { EnvelopeOpenIcon } from "@heroicons/react/24/solid";

export default function OtpPage() {
  const router = useRouter();
  const loginInput = router.query;
  const [otp, setOtp] = useState("");

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
                router.push({
                  pathname: "/",
                });
              });
            }
          });
      } catch (err) {
        notifyError(err);
      }
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

  return (
    <div className="max-w-screen flex min-h-screen flex-col items-center justify-center bg-gmco-grey">
      <Card className=" flex  max-w-sm items-center rounded-lg border border-slate-100 bg-slate-300 bg-opacity-40 bg-clip-padding py-4 backdrop-blur-sm backdrop-filter sm:pl-1 md:max-w-xl md:px-4 md:py-7 lg:px-6 ">
        <EnvelopeOpenIcon className="mx-auto h-16 w-16 stroke-gmco-white text-gmco-white" />
        <div className="self-center text-2xl font-bold  text-gmco-white md:text-3xl">
          Masukkan Kode Verifikasi
        </div>
        <div className="text-md text-center font-thin text-gmco-white  sm:text-base ">
          kode verifikasi telah dikirimkan melalui email terdaftar
        </div>
        <div className="mx-auto mt-9 items-center object-center  ">
          <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span>-</span>}
            renderInput={(props) => <input {...props} />}
            inputType="number"
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
        <button
          type="submit"
          className="font type mt-6 w-full rounded-xl border border-gmco-white bg-gmco-orange-secondarylight p-2 text-base font-semibold text-white hover:border  hover:border-gray-300 hover:bg-gmco-yellow-secondary hover:text-gmco-white md:p-2 md:text-lg"
          onClick={LoginSubmit}
        >
          Submit
        </button>
      </Card>
    </div>
  );
}
