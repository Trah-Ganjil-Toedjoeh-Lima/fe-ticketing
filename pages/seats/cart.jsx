import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import Swal from "sweetalert2";
import { TrashIcon } from "@heroicons/react/24/solid";

import FooterBar from "@/components/footer";
import NavigationBar from "@/components/navbar";
import { axiosInstance, midtransSetup } from "@/atoms/config";
import {
  notifyError,
  notifySucces,
  notifyErrorMessage,
  notifyInfo,
  notifyWarning,
} from "@/components/notify";

export default function Cart() {
  const [orderTotal, setOrderTotal] = useState(0);
  const router = useRouter();
  const [seatBoughts, setSeatBoughts] = useState({
    seats: [],
    user_email: "user.email",
    user_name: "user_name",
    user_phone: "user_phone",
  });

  useEffect(() => {
    (async () => {
      try {
        if (
          typeof window !== "undefined" &&
          !localStorage.getItem("auth_token")
        ) {
          router.push("/auth");
        }
        const [res] = await Promise.all([
          axiosInstance.get("/api/v1/checkout"),
        ]);
        setSeatBoughts(res.data.data);
        midtransSetup(res.data.midtrans_client_key);
      } catch (err) {
        notifyError(err);
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
    try {
      const res = await axiosInstance.post("/api/v1/checkout");
      openMidtransWindow(res.data.snap_response.token);
    } catch (err) {
      notifyError(err);
    }
  }

  function openMidtransWindow(token) {
    window.snap.pay(token, {
      onSuccess: function () {
        /* You may add your own implementation here */
        notifySucces("payment success!");
        setSeatBoughts({
          seats: [],
          user_email: "user.email",
          user_name: "user_name",
          user_phone: "user_phone",
        });
      },
      onPending: function () {
        /* You may add your own implementation here */
        notifyInfo("wating your payment!");
      },
      onError: function () {
        /* You may add your own implementation here */
        notifyErrorMessage("payment failed!");
      },
      onClose: function () {
        /* You may add your own implementation here */
        notifyWarning("you closed the popup without finishing the payment");
      },
    });
  }

  function canselCheck() {
    Swal.fire({
      html: `Anda yakin ingin menghapus transaksi?`,
      toast: true,
      icon: "warning",
      iconColor: "#991b1b",
      showCancelButton: true,
      cancelButtonText: "Tidak",
      cancelButtonColor: "#991b1b",
      confirmButtonText: "Ya",
      confirmButtonColor: "#16a34a",
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
      await axiosInstance.delete("/api/v1/checkout").then(() =>
        setSeatBoughts({
          seats: [],
          user_email: "user.email",
          user_name: "user_name",
          user_phone: "user_phone",
        })
      );
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
      <NavigationBar />
      <div className="h-max bg-gmco-blue-main md:min-h-screen">
        <div className="relative h-max">
          <div className="absolute w-full bg-gmco-grey ">
            <Image
              src="/gmco-cart.webp"
              alt="bg gmco concert"
              className="h-40 object-cover opacity-50"
              width={2000}
              height={2000}
            />
          </div>
          <div className="container relative z-10 m-auto px-6 pb-8 pt-24 md:px-1">
            <h2 className="w-max border-b-2 text-2xl font-bold text-gmco-white">
              Keranjang - ({seatBoughts.seats.length} item)
            </h2>
          </div>
        </div>

        <div className="container relative m-auto px-6 pb-8 md:px-1">
          <div className="grid gap-10 overflow-hidden py-6 md:grid-cols-5">
            <div className="h-max md:col-span-3 ">
              {/* Display List */}
              <table className="w-full table-auto border-separate border-spacing-y-4 divide-gray-200 text-gmco-white">
                {/* Item - nanti di map */}
                <thead>
                  <tr className="text-center text-lg font-semibold md:text-xl">
                    <td className="text-start">No. Kursi</td>
                    <td>Kategori</td>
                    <td>Jumlah</td>
                    <td>Harga</td>
                  </tr>
                </thead>
                <tbody>
                  {seatBoughts.seats.map((seatBought, index) => (
                    <tr key={index} className="divide-y">
                      <td className="border-t pt-4">
                        <div className="flex items-center">
                          {/* <div className="hidden h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 md:inline">
                            {seatBought.price > 100000 ? (
                              <Image
                                src="/chair.webp"
                                alt="Kursi Bagus Enak Diduduki"
                                className="h-full w-full object-cover object-center"
                                width={1000}
                                height={1000}
                              />
                            ) : (
                              <Image
                                src="/chair-hijau.webp"
                                alt="Kursi Hijau Sangat Kuat"
                                className="h-full w-full object-cover object-center"
                                width={1000}
                                height={1000}
                              />
                            )}
                          </div> */}
                          <h3 className="text-md font-extrabold md:text-xl">
                            Kursi {seatBought.name}
                          </h3>
                        </div>
                      </td>

                      <td className="pt-4">
                        <div className="flex flex-col items-center justify-center gap-1 text-xs text-gmco-grey md:flex-row md:gap-3 md:text-sm">
                          <p className="w-max rounded-md bg-gmco-yellow p-1 md:p-2 ">
                            Kategori
                          </p>
                          <p className="w-max rounded-md bg-gmco-yellow p-1 md:p-2 ">
                            Lantai {seatBought.name[0] > "S" ? 2 : 1}
                          </p>
                        </div>
                      </td>
                      <td className="pt-4">
                        <div className="flex justify-center">
                          <p className="w-max rounded-md bg-gmco-white px-3 py-1 text-gmco-grey">
                            1
                          </p>
                        </div>
                      </td>
                      <td className="pt-4">
                        <div className="flex justify-center">
                          {formatNumber(seatBought.price)}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Bagian Checkout */}
            <div className="md:col-span-2">
              {/* Batalkan Transaksi */}
              <div className="h-min rounded-2xl bg-gmco-white/75 p-6 ">
                <div className="flex items-center justify-between">
                  <p className="text-lg">Batalkan Transaksi</p>
                  <button
                    onClick={() => canselCheck()}
                    className="flex items-center justify-center rounded-md border border-transparent bg-red-600 px-6 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 hover:text-gmco-grey"
                  >
                    <TrashIcon className="w- h-5" />
                  </button>
                </div>
              </div>

              {/* Checkout */}
              <div className="mt-2 h-min rounded-2xl bg-gmco-white/75 p-6">
                <div className="flex justify-between text-base font-medium text-gmco-grey">
                  <p className="text-xl">Subtotal</p>
                  <p>{formatNumber(orderTotal)}</p>
                </div>
                <p className="mt-0.5 text-sm text-gmco-grey/70">
                  Pajak sudah termasuk<span className="text-red-500">*</span>
                </p>
                <div className="mt-6 flex items-center justify-center md:justify-end">
                  <button
                    onClick={() => handleCheckout()}
                    className="flex items-center justify-center rounded-md border border-transparent bg-gmco-orange-secondarylight px-6 py-2 text-base font-medium text-white shadow-sm hover:bg-gmco-orange-secondarydark"
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
