import { useState, useEffect } from "react";
import { useRouter } from "next/router";

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
  const [update, setUpdate] = useState();
  const [seatBoughts, setSeatBoughts] = useState({
    seats: [],
    user_email: "user.email",
    user_name: "user_name",
    user_phone: "user_phone",
  });

  function rerender() {
    setUpdate(`update ${Math.random()}`);
  }

  useEffect(() => {
    (async () => {
      try {
        const [res] = await Promise.all([
          axiosInstance.get("/api/v1/checkout"),
        ]);
        setSeatBoughts(res.data.data);
        midtransSetup(res.data.midtrans_client_key);
      } catch (err) {
        notifyError(err);
      }
    })();
  }, [update]);

  useEffect(() => {
    if (typeof window !== "undefined" && !localStorage.getItem("auth_token")) {
      router.push("/auth");
    } else {
      midtransSetup();
    }
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
      onSuccess: function (result) {
        /* You may add your own implementation here */
        notifySucces("payment success!");
        rerender();
      },
      onPending: function (result) {
        /* You may add your own implementation here */
        notifyInfo("wating your payment!");
      },
      onError: function (result) {
        /* You may add your own implementation here */
        notifyErrorMessage("payment failed!");
      },
      onClose: function () {
        /* You may add your own implementation here */
        notifyWarning("you closed the popup without finishing the payment");
      },
    });
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
        <div className="h-max bg-[url('/gmco-cart.webp')] bg-cover bg-center backdrop-blur">
          <div className="backdrop-blur-sm">
            <div className="container m-auto px-6 pb-8 pt-24 md:px-1">
              <h2 className="w-max border-b-2 text-2xl font-bold text-gmco-white">
                Keranjang - ({seatBoughts.seats.length} item)
              </h2>
            </div>
          </div>
        </div>

        <div className="container m-auto px-6 pb-8 md:px-1">
          <div className="grid gap-10 overflow-hidden py-6 md:grid-cols-5">
            <div className="h-max md:col-span-3 ">
              {/* Display List */}
              <table className="w-full table-auto border-separate border-spacing-y-4 divide-gray-200 text-gmco-white">
                {/* Item - nanti di map */}
                <thead>
                  <tr className="text-center font-semibold md:text-xl">
                    <td className="md:text-start">No. Kursi</td>
                    <td>Kategori</td>
                    <td>Jumlah</td>
                    <td>Harga</td>
                  </tr>
                </thead>
                <tbody>
                  {seatBoughts.seats.map((seatBought, index) => (
                    <tr key={index}>
                      <td>
                        <div className="flex items-center">
                          <div className="hidden h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 md:inline">
                            {seatBought.price > 100000 ? (
                              <img
                                src="/chair.webp"
                                alt="Kursi Bagus Enak Diduduki"
                                className="h-full w-full object-cover object-center"
                              />
                            ) : (
                              <img
                                src="/chair-hijau.webp"
                                alt="Kursi Hijau Sangat Kuat"
                                className="h-full w-full object-cover object-center"
                              />
                            )}
                          </div>
                          <h3 className="ml-4 text-xl font-extrabold">
                            {seatBought.name}
                          </h3>
                        </div>
                      </td>

                      <td>
                        <div className="flex flex-col items-center justify-center gap-1 text-xs text-gmco-grey md:flex-row md:gap-3 md:text-sm">
                          <p className="w-max rounded-md bg-gmco-yellow p-1 md:p-2 ">
                            Kategori
                          </p>
                          <p className="w-max rounded-md bg-gmco-yellow p-1 md:p-2 ">
                            Lantai {seatBought.name[0] > "S" ? 2 : 1}
                          </p>
                        </div>
                      </td>
                      <td>
                        <div className="flex justify-center">
                          <p className="w-max rounded-md bg-gmco-white px-3 py-1 text-gmco-grey">
                            1
                          </p>
                        </div>
                      </td>
                      <td>
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
            <div className="h-min rounded-2xl bg-gmco-white/70 p-6 md:col-span-2">
              <div className="flex justify-between text-base font-medium text-gmco-grey">
                <p>Subtotal</p>
                <p>{formatNumber(orderTotal)}</p>
              </div>
              <p className="mt-0.5 text-sm text-gmco-grey/70">
                Pajak sudah termasuk<span className="text-red-500">*</span>
              </p>
              <div className="mt-6 flex justify-center md:justify-start">
                <button
                  onClick={() => handleCheckout()}
                  className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterBar />
    </>
  );
}
