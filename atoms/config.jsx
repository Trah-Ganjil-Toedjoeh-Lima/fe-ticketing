import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_JSON_URL,
  withCredentials: true,
});

export function midtransSetup() {
  // You can also change below url value to any script url you wish to load,
  // for example this is snap.js for Sandbox Env (Note: remove `.sandbox` from url if you want to use production version)
  const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";

  let scriptTag = document.createElement("script");
  scriptTag.src = midtransScriptUrl;

  // Optional: set script attribute, for example snap.js have data-client-key attribute
  // (change the value according to your client-key)
  const myMidtransClientKey = process.env.NEXT_MIDTRANS_CLIENT_KEY_SANDBOX;
  scriptTag.setAttribute("data-client-key", "SB-Mid-client-pKhjdsW23b2bUqjV");

  document.body.appendChild(scriptTag);

  return () => {
    document.body.removeChild(scriptTag);
  };
}
