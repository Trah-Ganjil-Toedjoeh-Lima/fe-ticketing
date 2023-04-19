import React, { useEffect, useState } from "react";
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
  const [ticketData, setTicketData] = useState({
    seat_category:"seat_category",
    seat_name:"seat_name", 
    user_email:"user_email", 
    user_name:"user_name", 
    user_phone:"user_phone" 

  });

  useEffect(() => {
    const fetchTicketData = async () => {
      try {
        const res = await axiosInstance.get(`/api/v1/seat/${Link}`);
        if(res.da)
        console.log(res.data.data);
        setTicketData(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTicketData();
  }, [Link]);
  
  console.log(ticketData,"ini dah diset")

  return (
    <section className="flex min-h-screen w-full items-center justify-center bg-slate-950 p-3">
      <div className="grid max-w-6xl grid-cols-8 justify-center bg-[url('/E-ticket.svg')] bg-contain bg-center bg-no-repeat p-4 md:bg-cover md:py-8 lg:bg-contain lg:py-32">
        <div className="col-span-2 flex flex-col items-center xl:-mt-8">
          <img
            src="/logo-anjangsana.webp"
            alt=""
            className="mt-1 w-20 self-end md:w-52 xl:ml-10 xl:w-72"
          />
          <span className="text-[5px] text-gmco-yellow md:text-base  ">
            {ticketData.user_name}
          </span>
        </div>

        <div className="col-span-4 mt-2 md:-mt-3">
          <div className=" ml-3 flex flex-col md:mt-8 xl:mt-2">
            <p className="text-[5.5px] font-extralight text-gmco-white md:text-base lg:text-lg xl:text-2xl">
              GADJAH MADA CHAMBER ORCHESTRA
            </p>
            <h1 className="mb-2.5 text-xs font-extrabold text-gmco-white md:text-3xl lg:mb-5 lg:text-4xl xl:text-6xl ">
              {" "}
              GRAND CONCERT <br />
              Vol. 10
            </h1>
            <div className="flex flex-row xl:pt-5">
              <div className="basis-2/6 rounded-sm bg-gmco-orange-secondarylight p-0.5 pl-1 pt-1 md:rounded-lg md:p-1 md:pl-2 lg:p-2 ">
                <div className="text-[7px] text-gmco-white md:text-base ">
                  <p className="text-[5px] md:text-xs lg:text-base">
                    OPEN GATE
                  </p>
                  <p className="font-bold">17.00</p>
                  <p className="text-[5px] md:text-xs lg:text-base">
                    START SHOW
                  </p>
                  <p className="font-bold"> 18.00</p>
                </div>
              </div>
              <div className="flex basis-4/6 flex-col justify-between px-1 text-[7px] text-gmco-white md:text-base lg:text-lg ">
                <div className=" -mb-0.5 rounded-[3px] bg-gmco-blue-main p-1 text-center md:rounded-lg md:p-2 lg:p-3">
                  <span>
                    {" "}
                    SABTU <b>27 MEI</b> 2023
                  </span>
                </div>
                <div className="mt-2 rounded-[3px] bg-gmco-blue-main p-1 text-center md:rounded-lg md:p-2 lg:p-3">
                  Auditorium Driyarkara
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2 pt-5 md:pt-10">
          <div className="relative flex flex-col items-center ">
            <span className="text-5xl font-bold text-gmco-yellow md:text-8xl lg:text-9xl ">
              {ticketData.seat_name}
            </span>
            <div className="flex flex-row rounded-lg justify-center bg-gmco-orange-secondarylight px-2 py-0.5 w-1/2 lg:rounded-2xl lg:py-2">
              <span className="text-[7px] uppercase text-gmco-white md:text-base lg:text-lg ">
                {ticketData.seat_category}
              </span>
            </div>
            <img
              src="/logo_gmco.webp"
              alt=""
              className="mt-1.5 w-12 self-end md:mr-5 md:mt-6 md:w-1/2 xl:mr-10"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
