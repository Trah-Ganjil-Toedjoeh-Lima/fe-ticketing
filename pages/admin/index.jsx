import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { axiosInstance } from "@/atoms/config";
import NavigationBar from "@/components/navbar";

export default function Admin() {
  const [adminData, setAdminData] = useState([]);
  const [appConfig, setAppConfig] = useState(false);
  const [qrScanMode, setQrScanMode] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  async function handleGate() {
    const postURL = appConfig
      ? "/api/v1/admin/close_the_gate"
      : "/api/v1/admin/open_the_gate";

    try {
      const res = await axiosInstance.post(postURL);
      setAppConfig(!appConfig);
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    const checkAdminLogin = async () => {
      try {
        const checkRes = await axiosInstance.get("/api/v1/admin/seats");
      } catch (err) {
        if (err.response.status === 400 || 401) {
          router.push("/admin/login");
        } else {
          console.error(err);
        }
      }
      setIsAdmin(true);
    };

    // Check if admin is logged in
    if (typeof window !== "undefined") {
      // If not, redirect to /admin/login
      if (!localStorage.getItem("auth_token")) {
        router.push("/admin/login");
      } else {
        checkAdminLogin();
      }
    }
  }, [router]);

  useEffect(() => {
    async function getAdminData() {
      //Try-catch block on promised GET requests to back-end
      try {
        const [seatsRes, configRes] = await Promise.all([
          axiosInstance.get("/api/v1/admin/seats"),
          axiosInstance.get("/api/v1/admin/get_app_config"),
        ]);

        setAdminData(seatsRes.data.data);
        setAppConfig(configRes.data.app_config.IsOpenGate);
        setQrScanMode(configRes.data.app_config.QrScanBehaviour);

        console.log(qrScanMode);
      } catch (error) {
        console.error(error);
      }
    }

    getAdminData();
  }, [axiosInstance, appConfig, qrScanMode]);

  async function updateQrScanState(newState) {
    const patchURL = "/api/v1/admin/qr_scan_behaviour";
    try {
      const res = await axiosInstance.patch(patchURL, {
        qr_scan_behaviour: newState,
      });
      setQrScanMode(newState);
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <NavigationBar />
      {/* OUTERMOST div */}
      <div className='h-max bg-gmco-white md:min-h-screen '>
        {/* HEADER div */}
        <div className='relative h-max w-full bg-gmco-blue-main'>
          <div className='container relative z-10 m-auto px-6 pb-8 pt-24 md:px-1'>
            <h2 className='w-max border-b-2 text-2xl font-bold text-gmco-white'>
              Admin
            </h2>
          </div>
        </div>

        <div className='container relative m-auto space-y-8 px-6 pb-8 md:px-1'>
          <div className='relative'>
            <h3 className='mb-5 text-lg font-medium text-gray-900 dark:text-white'>
              Open Gate:
            </h3>
            <label className='relative inline-flex cursor-pointer items-center'>
              <input
                type='checkbox'
                onChange={() => handleGate()}
                checked={appConfig}
                value=''
                className='peer sr-only'
              />
              <div className="peer h-7 w-14 rounded-full bg-gray-200 after:absolute after:left-[4px] after:top-0.5 after:h-6 after:w-6 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
              {appConfig ? (
                <span className='ml-3 text-sm font-medium text-gray-900 dark:text-gray-300'>
                  Gate is open
                </span>
              ) : (
                <span className='ml-3 text-sm font-medium text-gray-900 dark:text-gray-300'>
                  Gate is closed.
                </span>
              )}
            </label>
          </div>

          <h3 className='mb-5 text-lg font-medium text-gray-900 dark:text-white'>
            Pilih Mode Scan QR:
          </h3>

          <ul className='grid w-full gap-6 md:grid-cols-3'>
            <li>
              <input
                type='checkbox'
                onChange={(e) =>
                  updateQrScanState(e.target.checked ? "default" : "")
                }
                checked={qrScanMode === "default"}
                id='default-option'
                value=''
                className='peer hidden'
                required=''
              />
              <label
                htmlFor='default-option'
                className='inline-flex w-full cursor-pointer items-center justify-between rounded-lg border-2 border-gray-200 bg-white p-5 text-gray-500 hover:bg-gray-50 hover:text-gray-600 peer-checked:border-blue-600 peer-checked:text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:peer-checked:text-gray-300'
              >
                <div className='block'>
                  <div className='w-full text-lg font-semibold'>Default</div>
                  <div className='w-full text-sm'>
                    Mode default scan QR, sebelum dilakukan penukaran tiket.
                  </div>
                </div>
              </label>
            </li>
            <li>
              <input
                type='checkbox'
                onChange={(e) =>
                  updateQrScanState(e.target.checked ? "Penukaran" : "")
                }
                checked={qrScanMode === "Penukaran"}
                id='penukaran-option'
                value=''
                className='peer hidden'
              />
              <label
                htmlFor='penukaran-option'
                className='inline-flex w-full cursor-pointer items-center justify-between rounded-lg border-2 border-gray-200 bg-white p-5 text-gray-500 hover:bg-gray-50 hover:text-gray-600 peer-checked:border-blue-600 peer-checked:text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:peer-checked:text-gray-300'
              >
                <div className='block'>
                  <div className='w-full text-lg font-semibold'>
                    Penukaran Tiket
                  </div>
                  <div className='w-full text-sm'>
                    Mode penukaran digunakan saat masa penukaran tiket.
                  </div>
                </div>
              </label>
            </li>
            <li>
              <input
                type='checkbox'
                onChange={(e) =>
                  updateQrScanState(e.target.checked ? "Datang" : "")
                }
                checked={qrScanMode === "Datang"}
                id='datang-option'
                value=''
                className='peer hidden'
              />
              <label
                htmlFor='datang-option'
                className='inline-flex w-full cursor-pointer items-center justify-between rounded-lg border-2 border-gray-200 bg-white p-5 text-gray-500 hover:bg-gray-50 hover:text-gray-600 peer-checked:border-blue-600 peer-checked:text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:peer-checked:text-gray-300'
              >
                <div className='block'>
                  <div className='w-full text-lg font-semibold'>
                    Presensi Kedatangan
                  </div>
                  <div className='w-full text-sm'>
                    Mode presensi digunakan untuk mengecek kedatangan penonton.
                  </div>
                </div>
              </label>
            </li>
          </ul>

          <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
            <table className='w-full text-left text-sm text-gray-500'>
              <caption className='bg-white p-5 text-left text-lg font-semibold text-gray-900 dark:bg-gray-800 dark:text-white'>
                Data Transaksi Kursi
              </caption>
              <thead className='bg-gray-50 text-xs uppercase text-gray-700'>
                <tr className='border-b bg-white hover:bg-gray-50'>
                  <th scope='col' className='px-6 py-3'>
                    ID
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Seat
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Category
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Price
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Link
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Name
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Email
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Phone
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Transaction
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {adminData.map((item, index) => (
                  <tr
                    key={index}
                    className='border-b bg-white hover:bg-gray-50'
                  >
                    <td className='whitespace-nowrap py-4 pl-8 pr-4 font-medium text-gray-900'>
                      {item.TransactionId}
                    </td>
                    <th
                      scope='row'
                      className='whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white'
                    >
                      {item.Seat.Name}
                    </th>
                    <td className='px-6 py-4'>{item.Seat.Category}</td>
                    <td className='px-6 py-4'>{item.Seat.Price}</td>
                    <td className='px-6 py-4'>{item.Seat.Link}</td>
                    <td className='px-6 py-4'>{item.User.Name}</td>
                    <td className='px-6 py-4'>{item.User.Email}</td>
                    <td className='px-6 py-4'>{item.User.Phone}</td>
                    <td className='px-6 py-4'>{item.Seat.Status}</td>
                    <td className='px-6 py-4'>{item.Seat.PostSaleStatus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const { req } = ctx;
  let baseURL = "";
  if (`https://${req.headers.host}/` === process.env.NEXT_PUBLIC_BASE_URL) {
    baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  }
  return { props: {} };
}
