import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/utils/config";

export default function DownloadTicket() {
  const router = useRouter();
  const { Link } = router.query;

  useEffect(() => {
    const fetchTicketData = async () => {
      try {
        await axiosInstance
          .get(`/api/v1/seat/${Link}`)
          .then((res) => {
            router.push(
              "https://files.gmco-event.com/tickets/" +
                res.data.data.seat_name +
                "_" +
                Link +
                ".png"
            );
            return;
          });
        // console.log(res.data.data);
      } catch (err) {
        router.push("/profile")
      }
    }; // end of fetchTicketData
    fetchTicketData();
    router.push("/profile")
  }, []);
  return null;
}
