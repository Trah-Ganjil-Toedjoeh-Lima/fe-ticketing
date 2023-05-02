import Image from "next/image";
import { useState, useEffect } from "react";

import Swal from "sweetalert2";
import { TrashIcon } from "@heroicons/react/24/solid";

import FooterBar from "@/components/footer";
import NavigationBar from "@/components/navbar";
import { axiosInstance, midtransSetup } from "@/utils/config";
import {
  notifyError,
  notifySucces,
  notifyErrorMessage,
  notifyInfo,
  notifyWarning,
} from "@/components/notify";
import { Loading } from "@/utils/spinner";

export default function Cart() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [orderTotal, setOrderTotal] = useState(0);
  const [update, setUpdate] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [verboseMsg, setVerboseMsg] = useState("Loading...");
  const [seatBoughts, setSeatBoughts] = useState({
    seats: [],
    user_email: "user.email",
    user_name: "user_name",
    user_phone: "user_phone",
  });
  const category = {
    gita: "bg-[#A3A3A3]",
    sekar: "bg-[#D8B830]",
    tala: "bg-[#2196F3]",
    irama: "bg-[#00CED1]",
    serenada: "bg-[#FF5A5F]",
    harmony: "bg-[#FFA500]",
  };

  function rerender() {
    setUpdate(`update ${Math.random()}`);
  }

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        setVerboseMsg("Loading Cart...");
        const [adminRes] = await Promise.all([
          axiosInstance.get("/api/v1/admin/healthAdmin"),
        ]);
        // console.log(adminRes)
        if (adminRes.status === 200) {
          setIsAdmin(true);
          notifyInfo("Anda login sebagai admin. Checkout tidak tersedia.");
          return;
        }
      } catch (err) {
        setIsAdmin(false);
        if (typeof window !== "undefined" && !localStorage.getItem("auth_token")) {
          notifyErrorMessage("Anda belum login.");
        } else {
          (async () => {
            try {
              const [res] = await Promise.all([
                axiosInstance.get("/api/v1/checkout"),
              ]);
              setSeatBoughts(res.data.data);
              midtransSetup(res.data.data.midtrans_client_key);
            } catch (err) {
              notifyErrorMessage("Anda belum melakukan transaksi.");
            }
            setIsLoading(false);
          })();
        }
      }
    })();
  }, []);

  useEffect(() => {
    const seats = seatBoughts.seats;
    let priceSum = 0;
    for (let i = 0; i < seats.length; i++) {
      priceSum += seats[i].price;
    }
    setOrderTotal(priceSum);
  }, [seatBoughts]);

  async function handleCheckout() {
    if(!isAdmin){
      try {
        const res = await axiosInstance.post("/api/v1/checkout");
        openMidtransWindow(res.data.snap_response.token);
        console.log(res.data.snap_response.token)
      } catch (err) {
        notifyError(err);
      }
    } else {
      notifyErrorMessage("Admin tidak bisa membeli tiket");
    }
  }

  function openMidtransWindow(token) {
    window.snap.pay(token, {
      onSuccess: function () {
        /* You may add your own implementation here */
        notifySucces("Payment successful!");
        rerender()
        setSeatBoughts({
          seats: [],
          user_email: "user.email",
          user_name: "user_name",
          user_phone: "user_phone",
        });
      },
      onPending: function () {
        /* You may add your own implementation here */
        notifyInfo("Waiting for your payment...");
      },
      onError: function () {
        /* You may add your own implementation here */
        notifyErrorMessage("Payment failed!");
      },
      onClose: function () {
        /* You may add your own implementation here */
        notifyWarning("You closed the pop-up without finishing the payment.");
      },
    });
  }

  function cancelCheck() {
    Swal.fire({
      html: `Anda yakin ingin menghapus transaksi?`,
      toast: true,
      icon: "warning",
      background: "#2d2d2f",
      iconColor: "#287d92",
      showCancelButton: true,
      cancelButtonText: "Tidak",
      cancelButtonColor: "#c76734",
      confirmButtonText: "Ya",
      confirmButtonColor: "#287d92",
      color: "#f6f7f1",
      showClass: {
        popup: "",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        handleCancel();
      }
    });
  }

  async function handleCancel() {
    try {
      await axiosInstance.delete("/api/v1/checkout").then(() => {
        setSeatBoughts({
          seats: [],
          user_email: "user.email",
          user_name: "user_name",
          user_phone: "user_phone",
        });
        notifySucces("Pesanan Dihapus");
        rerender()
        localStorage.removeItem("user_seats_pick");
      });
    } catch (err) {
      notifyError(err);
    }
  }

  function formatNumber(number) {
    const idrMoney = number.toLocaleString("id-ID", {
      style: "decimal",
      minimumFractionDigits: 2,
    });
    return `Rp${idrMoney}`;
  }

  return (
    <>
    <Loading isLoading={isLoading} verboseMsg={verboseMsg} />
      <NavigationBar doUpdate={update} />
      <div className="realtive max-w-screen overflow-hidden bg-gmco-blue-main md:min-h-screen">
        <div className="absolute h-48 w-full overflow-hidden bg-gmco-grey">
          <Image
            src='/seatmap/GMCO-11_crop.webp'
            className='h-full w-full object-cover opacity-40 md:object-top lg:object-left-bottom'
            alt='gmco concert'
            width={1920}
            height={1281}
          />
        </div>

        <div className='container relative m-auto px-6 pb-12 pt-28 md:px-1 '>
          <h2 className='w-max border-b-2 text-2xl font-bold text-gmco-white'>
            Keranjang - ({seatBoughts.seats.length} item)
          </h2>
        </div>

        <div className='container m-auto px-6 pb-8 md:px-1'>
          <div className='grid gap-10 overflow-hidden py-6 md:grid-cols-5'>
            <div className='h-max md:col-span-3 '>
              {/* Display List */}
              <table className='w-full table-auto border-separate border-spacing-y-4 divide-gray-200 text-gmco-white'>
                {/* Item - nanti di map */}
                <thead>
                  <tr className='text-center text-lg font-semibold md:text-xl'>
                    <td className='text-start'>No. Kursi</td>
                    <td>Kategori</td>
                    <td>Jumlah</td>
                    <td>Harga</td>
                  </tr>
                </thead>
                <tbody>
                  {seatBoughts.seats.map((seatBought, index) => (
                    <tr key={index} className='divide-y'>
                      <td className='border-t pt-4'>
                        <div className='flex items-center'>
                          <h3 className='text-md font-extrabold md:text-xl'>
                            Kursi {seatBought.name}
                          </h3>
                        </div>
                      </td>

                      <td className='pt-4'>
                        <div className='flex flex-col items-center justify-center gap-1 text-xs text-gmco-grey md:flex-row md:gap-3 md:text-sm'>
                          <p
                            className={`w-24 rounded-md p-1 text-center font-semibold capitalize md:p-2 ${
                              category[seatBought.category]
                            }`}
                          >
                            {seatBought.category}
                          </p>
                          <p
                            className={`w-24 rounded-md p-1 text-center font-semibold md:p-2 ${
                              seatBought.name[0] > "S"
                                ? "bg-gmco-orange-secondarydark"
                                : "bg-gmco-orange-secondarylight"
                            }`}
                          >
                            Lantai {seatBought.name[0] > "S" ? 2 : 1}
                          </p>
                        </div>
                      </td>
                      <td className='pt-4'>
                        <div className='flex justify-center'>
                          <p className='w-max rounded-md bg-gmco-white px-3 py-1 text-gmco-grey'>
                            1
                          </p>
                        </div>
                      </td>
                      <td className='pt-4'>
                        <div className='flex justify-center'>
                          {formatNumber(seatBought.price)}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Bagian Checkout */}
            <div className='md:col-span-2'>
              {/* Batalkan Transaksi */}
              <div className='h-min rounded-2xl bg-gmco-white/75 p-6 '>
                <div className='flex items-center justify-between'>
                  <p className='text-lg font-bold'>Batalkan Transaksi</p>
                  <button
                    onClick={() => cancelCheck()}
                    className='flex items-center justify-center rounded-md border border-transparent bg-red-600 px-6 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 hover:text-gmco-grey'
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Checkout */}
              <div className='mt-2 h-min rounded-2xl bg-gmco-white/75 p-6'>
                <div className='flex justify-between text-base font-medium text-gmco-grey'>
                  <p className='text-xl'>Subtotal</p>
                  <p>{formatNumber(orderTotal)}</p>
                </div>
                <p className='mt-0.5 text-sm text-gmco-grey/70'>
                  Sudah termasuk pajak<span className='text-red-500'>*</span>
                </p>
                <div className='mt-6 flex items-center justify-center md:justify-end'>
                  <button
                    onClick={() => handleCheckout()}
                    className='flex items-center justify-center rounded-md border border-transparent bg-gmco-orange-secondarylight px-6 py-2 text-base font-medium text-white shadow-sm hover:bg-gmco-orange-secondarydark'
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterBar />
    </>
  );
}
