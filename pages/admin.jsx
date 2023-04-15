import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { axiosInstance } from "@/atoms/config";

export default function Admin() {
  const { asPath, pathname } = useRouter();
  const [adminData, setAdminData] = useState([]);
  const [appConfig, setAppConfig] = useState([]);

  useEffect(() => {
    (async () => {
      const [res, res1] = await Promise.all([
        axiosInstance.get("/adminSeatDetails"),
        axiosInstance.get("/appConfig")
      ]);
  
      setAdminData(res.data.data);
      setAppConfig(res1.data.app_config.IsOpenGate);
    })();
  }, []);

  const mapAdminData = adminData.map((item) => {
    // const { Seat, User } = item;
    // return Seat;
    return item;
  });

  return (
    <div>
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
            <tr key={item.Seat.SeatId} className='bg-white border-b'>
              <td className='pl-8 pr-4 py-4 font-medium text-gray-900 whitespace-nowrap'>
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
