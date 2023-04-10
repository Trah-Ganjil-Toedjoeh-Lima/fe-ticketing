import React from "react";
import { useState } from "react";
import OTPInput from "react-otp-input";
import { Card } from "flowbite-react";
import { EnvelopeOpenIcon } from "@heroicons/react/24/solid";

export default function otp() {
  const [otp, setOtp] = useState("");
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Card className="flex flex-col px-2 sm:px-2 md:px-4 lg:px-6 py-7 w-full max-w-lg ">
        <EnvelopeOpenIcon className="w-16 h-16 mx-auto"> </EnvelopeOpenIcon>
        <div class="font-medium self-center text-xl sm:text-2xl uppercase text-gray-800">
          Masukkan Kode Verifikasi
        </div>
        <div class="font-normal text-center text-base sm:text-sm uppercase text-gray-800 ">
          Kode verifikasi telah dikirimkan melalui email terdaftar
        </div>
        <div className="mx-auto">
          <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={4}
            renderSeparator={<span>-</span>}
            renderInput={(props) => <input {...props} />}
            inputType="number"
            inputStyle={{
              fontFamily: "monospace",
              margin: "10px",
              width: "3em",
              borderRadius: "1px",
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
