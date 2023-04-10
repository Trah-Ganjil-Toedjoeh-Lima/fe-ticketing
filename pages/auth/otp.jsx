import React from "react";
import { useState } from "react";
import OTPInput from "react-otp-input";

export default function otp() {
  const [otp, setOtp] = useState("");
  return (
    <OTPInput
      value={otp}
      onChange={setOtp}
      numInputs={4}
      renderSeparator={<span>-</span>}
      renderInput={(props) => <input {...props} />}
      style="w-12 h-12 border-2 rounded bg-transparent outline-none text-center font-semibold text-xl spin-button-none border-gray-400 focus:border-gray-700 focus:text-gray-700 text-gray-400 transition"
    />
  );
}
