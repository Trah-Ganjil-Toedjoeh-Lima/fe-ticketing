import React from "react";
import { useRouter } from "next/router";
import { axiosInstance } from "@/atoms/config";


export async function getServerSideProps({ params }) {
  const { Link } = params;

  try {
    const res = await axiosInstance.get(
      `http://localhost:3000/api/v1/seat/${Link}`
    );
    // const res = await axiosInstance.get(
    //   "/api/v1/seat/6c46de49-d51d-4ace-a996-d657dcb8917a"
    // );
    console.log(res.data);
    const ticket = res.data;

    return { props: { ticket } };
  } catch (err) {
    console.error(err);
    return { props: { ticket: null } };
  }


}

export default function Ticket() {
  const router = useRouter();
  const { Link } = router.query;

  return (
    <section className="block min-h-screen items-center justify-center bg-slate-950 p-4 md:flex">
      <img
        src="/E-Ticket.svg"
        className=" object-cover grid grid-cols-6 "
      >
        <div className="col-span-2">

          <img src="" alt="" />
        </div>

      </img>
    </section>
  );
}

