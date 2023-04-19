import { useState } from "react";
import OTPInput from "react-otp-input";
import { Card } from "flowbite-react";
import { EnvelopeOpenIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import { axiosInstance } from "@/atoms/config";
import Swal from "sweetalert2";
import { notifyError } from "@/components/notify";

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
                iconColor: "#16a34a",
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

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Card className=" flex  max-w-sm items-center py-4 sm:pl-1 md:max-w-xl md:px-4 md:py-7 lg:px-6">
        <EnvelopeOpenIcon className="mx-auto h-16 w-16"> </EnvelopeOpenIcon>
        <div className="self-center text-xl font-medium uppercase text-gray-800 sm:text-2xl">
          Masukkan Kode Verifikasi
        </div>
        <div className="text-center text-sm font-normal text-gray-800  sm:text-base ">
          Kode verifikasi telah dikirimkan melalui email terdaftar
        </div>
        <div className="mx-auto mt-9 items-center object-center">
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
              backgroundColor: "black",
              color: "white",
              border: "1px solid lightskyblue",
            }}
          />
        </div>
        <button
          type="submit"
          className="font type mt-6 w-full rounded-lg bg-gmco-blue p-2 text-base font-semibold text-white hover:border  hover:border-gray-300 hover:bg-gmco-yellow-secondary hover:text-gmco-white md:p-2 md:text-lg"
          onClick={LoginSubmit}
        >
          Submit
        </button>
      </Card>
    </div>
  );
}
