import { useState, useEffect } from "react";
import Head from 'next/head'
import FooterBar from "@/components/footer";
import NavigationBar from "@/components/navbar";
import { axiosInstance, midtransSetup } from "@/atoms/config";
import withAuth from "@/atoms/authpage";

function cart() {
  const [seatBoughts, setSeatBoughts] = useState({
    seats: [],
    user_email: "user.email",
    user_name: "user_name",
    user_phone: "user_phone",
  });
  const [orderTotal, setOrderTotal] = useState(0);

  useEffect(() => {
    (async () => {
      const [res] = await Promise.all([
        axiosInstance.get("/transactionDetail"),
      ]);

      setSeatBoughts(res.data.data);
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
      console.log(res.data.snap_response.token);
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

  useEffect(() => {
    const snapSrcUrl = "https://app.midtrans.com/snap/snap.js";
    // const myMidtransClientKey = "SB-Mid-client-pKhjdsW23b2bUqjV"
    const myMidtransClientKey = "Mid-client-FwFVpZnrPBHcdiMY";

    const script = document.createElement("script");
    script.src = snapSrcUrl;
    script.setAttribute("data-client-key", myMidtransClientKey);
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  });

  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <NavigationBar />
      <div className="bg-gmco-blue-main h-16" />
      <div className="container m-auto py-8">
        <h2 className="text-xl font-bold text-gray-900">Kursi Dipesan</h2>
        <div className="grid grid-cols-4 gap-10 min-h-screen overflow-hidden py-6">
          <div className="col-span-3 overflow-y-auto">
            {/* Display List */}
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {/* Item - nanti di map */}
              {seatBoughts.seats.map((seatBought, index) => (
                <li key={index} className="flex py-6 w-full">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
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

                  <div className="ml-4 w-full flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          Kursi <b>{seatBought.name}</b>
                        </h3>
                        <p>{formatNumber(seatBought.price)}</p>
                      </div>
                      <p></p>
                      <p className="mt-1 text-sm text-gray-500">
                        Kategori - Lantai {seatBought.name[0] > "S" ? 2 : 1}
                      </p>
                    </div>
                    <p className="text-gray-500">Jumlah 1</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Bagian Checkout */}
          <div className="col-span-1 border-gray-200">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>{formatNumber(orderTotal)}</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">Pajak sudah termasuk</p>
            <div className="mt-6">
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
      <FooterBar />
    </>
  );
}

export default withAuth(cart);