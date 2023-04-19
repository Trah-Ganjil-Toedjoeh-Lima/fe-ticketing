import axios from "axios";

export const axiosInstance = axios.create({
  withCredentials: true,
  headers: {
    Authorization:
      typeof window !== "undefined" && localStorage.getItem("auth_token"),
  },
});

export function midtransSetup(myMidtransClientKey, callback) {
  // You can also change below url value to any script url you wish to load,
  // for example this is snap.js for Sandbox Env (Note: remove `.sandbox` from url if you want to use production version)
  const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";

  let scriptTag = document.createElement("script");
  scriptTag.src = midtransScriptUrl;

  // Optional: set script attribute, for example snap.js have data-client-key attribute
  // (change the value according to your client-key)
  scriptTag.setAttribute("data-client-key", myMidtransClientKey);

  document.body.appendChild(scriptTag);

  return () => {
    document.body.removeChild(scriptTag);
  };
}
