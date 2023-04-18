import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { axiosInstance } from "@/atoms/config";

export async function getServerSideProps({ params }) {
  const { Link } = params;

  try {
    const res = await axiosInstance.get(
      `http://localhost:3000/v1/seat/${Link}`
    );
    // const res = await axiosInstance.get(
    //   "/v1/seat/6c46de49-d51d-4ace-a996-d657dcb8917a"
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
    <section className='min-h-screen items-center justify-center bg-slate-950 p-4'>
      <div className="grid h-[50vh] grid-cols-8 justify-center bg-[url('/E-ticket.svg')] bg-contain bg-no-repeat p-4 md:h-screen">
        <div className='col-span-2'>
          <Image
            src='/logo-anjangsana.webp'
            className='h-[30vw] w-auto pl-2 md:ml-10 md:h-[30vh] xl:-ml-20 xl:h-[55vh]'
            width={1000}
            height={1000}
          />
        </div>
        <div className='col-span-4'>
          <div className='row-span-1'>
            <h1 className='mb-3 text-4xl font-bold md:text-5xl'>
              {" "}
              Grand Concert{" "}
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
