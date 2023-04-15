import { useState, useEffect } from "react";
import Head from "next/head";
import FooterBar from "@/components/footer";
import NavigationBar from "@/components/navbar";
import { axiosInstance, midtransSetup } from "@/atoms/config";
import withAuth from "@/atoms/authpage";

function Cart() {
  const [seatBoughts, setSeatBoughts] = useState({
    seats: [
      {
        name: "A10",
        price: 165000,
      },
      {
        name: "A11",
        price: 165000,
      },
      {
        name: "G41",
        price: 15000,
      },
    ],
    user_email: "nismara.chandra@gmail.com",
    user_name: "user1",
    user_phone: "123456789",
  });
  const [orderTotal, setOrderTotal] = useState(0);

  // seats: [],
  // user_email: "user.email",
  // user_name: "user_name",
  // user_phone: "user_phone",

  // useEffect(() => {
  //   (async () => {
  //     const [res] = await Promise.all([
  //       axiosInstance.get("/api/v1/checkout")
  //     ]);

  //     setSeatBoughts(res.data.data);
  //   })();
  // }, []);

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
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <NavigationBar />
      <div className="bg-[url('/gmco-cart.JPG')] bg-cover backdrop-blur">
        <div className="backdrop-blur">
          <div className="container m-auto px-6 pt-24 pb-8 md:min-h-screen">
            <h2 className="text-xl font-bold text-gmco-white">Keranjang - ({seatBoughts.seats.length} item)</h2>
            <div className="grid gap-10 overflow-hidden md:grid-cols-5 md:py-6">
              <div className="md:col-span-3">
                {/* Display List */}
                <ul role="list" className="divide-y divide-gray-200 md:-my-6">
                  {/* Item - nanti di map */}
                  {seatBoughts.seats.map((seatBought, index) => (
                    <li key={index} className="flex w-full py-6">
                      <div className="hidden md:inline h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
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

                      <div className="ml-4 flex w-full items-center justify-between text-gmco-white">
                        <h3 className="text-xl font-extrabold">
                          {seatBought.name}
                        </h3>
                        <p className="bg-gmco-yellow rounded-md p-2 text-gmco-grey">
                          Kategori - Lantai {seatBought.name[0] > "S" ? 2 : 1}
                        </p>
                        <p className="bg-gmco-white rounded-md py-1 px-3 text-gmco-grey">1</p>
                        <p>{formatNumber(seatBought.price)}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bagian Checkout */}
              <div className="border-2 rounded-2xl p-6 border-gray-200 md:col-span-2">
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
      <FooterBar />
    </>
  );
}

export default withAuth(Cart);
