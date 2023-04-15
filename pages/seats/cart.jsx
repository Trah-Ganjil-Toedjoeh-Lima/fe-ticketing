import { useState, useEffect } from "react";
import FooterBar from "@/components/footer";
import NavigationBar from "@/components/navbar";
import { axiosInstance, midtransSetup } from "@/atoms/config";
import withAuth from "@/atoms/authpage";

export default function Cart() {
  const [seatBoughts, setSeatBoughts] = useState({
    seats: [],
    user_email: "user.email",
    user_name: "user_name",
    user_phone: "user_phone",
  });
  const [orderTotal, setOrderTotal] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const [res] = await Promise.all([
          axiosInstance.get("/api/v1/checkout"),
        ]);
        setSeatBoughts(res.data.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  useEffect(() => {
    midtransSetup();
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
      const res = await axiosInstance.get("/transactionResponse");
      openMidtransWindow(res.data.snap_response.token);
    } catch (err) {
      console.log(err);
    }
  }

  function openMidtransWindow(token) {
    window.snap.pay(token, {
      onSuccess: function (result) {
        /* You may add your own implementation here */
        alert("payment success!");
        console.log(result);
      },
      onPending: function (result) {
        /* You may add your own implementation here */
        alert("wating your payment!");
        console.log(result);
      },
      onError: function (result) {
        /* You may add your own implementation here */
        alert("payment failed!");
        console.log(result);
      },
      onClose: function () {
        /* You may add your own implementation here */
        alert("you closed the popup without finishing the payment");
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
        <div className="h-max bg-[url('/gmco-cart.JPG')] bg-cover backdrop-blur">
          <div className="backdrop-blur">
            <div className="container m-auto px-6 pb-8 pt-24">
              <h2 className="text-2xl font-bold text-gmco-white">
                Keranjang - ({seatBoughts.seats.length} item)
              </h2>
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
                                    src="/chair.jpg"
                                    alt="Kursi Bagus Enak Diduduki"
                                    className="h-full w-full object-cover object-center"
                                  />
                                ) : (
                                  <img
                                    src="/chair-hijau.jpg"
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
                <div className="h-min rounded-2xl border-2 border-gray-200 p-6 md:col-span-2">
                  <div className="flex justify-between text-base font-medium text-gmco-white">
                    <p>Subtotal</p>
                    <p>{formatNumber(orderTotal)}</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">
                    Pajak sudah termasuk
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
        </div>
      </div>
      <FooterBar />
    </>
  );
}