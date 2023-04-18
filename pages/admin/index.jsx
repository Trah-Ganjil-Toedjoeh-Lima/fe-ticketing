import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { axiosInstance } from "@/atoms/config";
import { ToggleSwitch } from "flowbite-react";

export default function Admin() {
  const [adminData, setAdminData] = useState([]);
  const [appConfig, setAppConfig] = useState([]);
  const [qrScan, setQrScan] = useState([]);

  const router = useRouter();

  async function handleSwitch() {
    const postURL = appConfig
      ? "/v1/admin/close_the_gate"
      : "/v1/admin/open_the_gate";

    try {
      const res = await axiosInstance.post(postURL);
      console.log(res);
      setAppConfig(!appConfig);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    // Check if admin is logged in
    if (typeof window !== "undefined") {
      // If not, redirect to /admin/login
      if (!localStorage.getItem("auth_token")) {
        router.push("/admin/login");
      }
    }
  }, []);

  useEffect(() => {
    (async () => {
      const [res, res1] = await Promise.all([
        axiosInstance.get("/v1/admin/seats"),
        axiosInstance.get("/v1/admin/get_app_config"),
      ]);

      setAdminData(res.data.data);
      setAppConfig(res1.data.app_config.IsOpenGate);
      setQrScan(res1.data.app_config.QrScanBehaviour);

      console.log(appConfig);
      console.log(qrScan);
    })();
  }, [appConfig, qrScan]);

  const mapAdminData = adminData.map((item) => {
    // const { Seat, User } = item;
    // return Seat;
    return item;
  });

  return (
    <div>
      <div>
        Open Gate
        <ToggleSwitch onClick={handleSwitch} checked={appConfig} />
      </div>
      <table>
        <caption>Seats</caption>
        <thead>
          <tr>
            <th>ID</th>
            <th>Seat</th>
            <th>Price</th>
            <th>Link</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {mapAdminData.map((item) => (
            <tr key={item.Seat.SeatId} className='border-b bg-white'>
              <td className='whitespace-nowrap py-4 pl-8 pr-4 font-medium text-gray-900'>
                {item.Seat.SeatId}
              </td>
              <td className='pl-8 pr-4'>{item.Seat.Name}</td>
              <td className='pl-8 pr-4'>{item.Seat.Price}</td>
              <td className='pl-8 pr-4'>{item.Seat.Link}</td>
              <td className='pl-8 pr-4'>{item.User.Name}</td>
              <td className='pl-8 pr-4'>{item.User.Email}</td>
              <td className='pl-8 pr-4'>{item.User.Phone}</td>
              <td className='pl-8 pr-4'>{item.Seat.Status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const { req } = ctx;
  let baseURL = "";
  if (`https://${req.headers.host}/` === process.env.NEXT_PUBLIC_BASE_URL) {
    baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  }
  return { props: {} };
}
