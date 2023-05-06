// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";
// import { axiosInstance } from "@/utils/config";
// import { saveAs } from 'file-saver';
// import { notifyInfo } from "@/components/notify";

export default function DownloadTicket() {
  //   const router = useRouter();
  //   const { Link } = router.query;
  //   const handleDownload = async (seat_name, user_name) => {
  //     const response = await fetch(
  //       "https://files.gmco-event.com/tickets/" +
  //         seat_name +
  //         "_" +
  //         Link +
  //         ".png"
  //     );
  //     const blob = await response.blob();
  //     saveAs(blob, seat_name + "_" + user_name + ".png");
  //   };
  //   useEffect(() => {
  //     const fetchTicketData = async () => {
  //       try {
  //         await axiosInstance
  //           .get(`/api/v1/seat/${Link}`)
  //           .then((res) => {
  //             handleDownload(res.data.data.seat_name, res.data.data.user_name);
  //             notifyInfo("Downloading ticket...");
  //             router.push("/profile");
  //           });
  //       } catch (err) {
  //         router.push("/profile")
  //       }
  //     }; // end of fetchTicketData
  //     fetchTicketData();
  //     router.push("/profile")
  //   }, []);
  //   return null;
}
