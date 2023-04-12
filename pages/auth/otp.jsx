import React from "react";
import { useState } from "react";
import OTPInput from "react-otp-input";
import { Card } from "flowbite-react";
import { EnvelopeOpenIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";

export default function otp() {
  const router = useRouter()
  const loginInput = router.query
  const [otp, setOtp] = useState("");
  console.log(loginInput,"ini dari login");
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Card className=" flex  py-14 max-w-sm sm:pl-1 md:px-4 md:py-7 md:max-w-xl lg:px-6 items-center">
        <EnvelopeOpenIcon className="w-16 h-16 mx-auto colo">
          {" "}
        </EnvelopeOpenIcon>
        <div class="font-medium self-center text-xl sm:text-2xl uppercase text-gray-800">
          Masukkan Kode Verifikasi
        </div>
        <div class="font-normal text-sm text-center sm:text-base  text-gray-800 ">
          Kode verifikasi telah dikirimkan melalui email terdaftar
        </div>
        <div className="mx-auto items-center mt-9">
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
      </Card>
    </div>
  );
}
