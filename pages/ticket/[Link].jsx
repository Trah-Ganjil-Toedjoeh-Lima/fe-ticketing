import React from "react";
import { useRouter } from "next/router";
import { axiosInstance } from "@/atoms/config";

export default function Ticket() {
  const router = useRouter();
  const { Link } = router.query;

  return <p>Ticket: {Link} </p>;
}

export async function getServerSideProps({ params }) {
  const { Link } = params;

  try {
    const res = await axiosInstance.get(`http://localhost:3000/api/v1/seat/${Link}`);
    console.log(res.data);
    const ticket = res.data;

    return { props: { ticket } };
  } catch (err) {
    console.error(err);
    return { props: { ticket: null } };
  }
}
