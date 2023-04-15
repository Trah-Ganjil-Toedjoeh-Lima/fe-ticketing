import { useState } from "react";
import OTPInput from "react-otp-input";
import { Card } from "flowbite-react";
import { EnvelopeOpenIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import { axiosInstance } from "@/atoms/config";
import Swal from "sweetalert2";

export default function OtpPage() {
  const router = useRouter();
  const loginInput = router.query;
  const [otp, setOtp] = useState("");
  const [otpSubmit, setOtpSubmit] = useState({
    email: loginInput.email,
    otp: otp,
  });

  async function LoginSubmit(e) {
    e.preventDefault();
    if (otp.length == 6) {
      try {
        console.log(JSON.stringify(loginInput));
        await axiosInstance
          .post("/api/v1/user/otp", {
            email: loginInput.email,
            otp: otp,
          })
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              console.log(res.data.token.AccessToken);
              localStorage.setItem("auth_token", `Bearer ${res.data.token.AccessToken}`);
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
        // notifyError(err);
        console.log(err);
      }
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Card className=" flex  py-4 max-w-sm sm:pl-1 md:px-4 md:py-7 md:max-w-xl lg:px-6 items-center">
        <EnvelopeOpenIcon className="w-16 h-16 mx-auto colo">
          {" "}
        </EnvelopeOpenIcon>
        <div class="font-medium self-center text-xl sm:text-2xl uppercase text-gray-800">
          Masukkan Kode Verifikasi
        </div>
        <div class="font-normal text-sm text-center sm:text-base  text-gray-800 ">
          Kode verifikasi telah dikirimkan melalui email terdaftar
        </div>
        <div className="mx-auto items-center object-center mt-9">
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
          class="w-full mt-6 bg-gmco-blue text-white text-base p-2 font font-semibold rounded-lg md:p-2 md:text-lg  hover:bg-gmco-yellow-secondary hover:text-gmco-white hover:border hover:border-gray-300 type"
          onClick={LoginSubmit}
        >
          Submit
        </button>
      </Card>
    </div>
  );
}
