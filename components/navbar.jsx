import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import Swal from "sweetalert2";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import { Dropdown, Avatar } from "flowbite-react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

import { axiosInstance } from "@/utils/config";
import { notifySucces } from "./notify";

export default function NavigationBar({ doUpdate }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [checkout, setCheckout] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isLogedIn, setLogedIn] = useState(false)
  const [logedUser, setLogedUser] = useState({
    Email: "",
    Name: "",
    Phone: "",
    UserId: 0,
  });
  const routes = [
    { name: "Home", route: "/" },
    { name: "About", route: "/#about" },
    { name: "FAQ", route: "/#FAQ" },
    { name: "Seat", route: "/seats" },
  ];

  useEffect(() => {
    // get user profile
    (async () => {
      try {
        const res = await axiosInstance.get("/api/v1/user/profile")
        console.log(res.data)
        setLogedUser(res.data.data);
        setLogedIn(true)
      } catch {
        setLogedIn(false)
      }
    })();

    // should always run
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // only run if get user proflie succes
    // get user checkout
    (async () => {
      try {
        const res = await axiosInstance.get("/api/v1/checkout")
        setCheckout(res.data.data.seats.length);
      } catch (err) {
        setCheckout(0);
      }
    })();
  }, [doUpdate])

  function logoutCheck() {
    Swal.fire({
      html: `Anda yakin ingin keluar?`,
      toast: false,
      icon: "warning",
      iconColor: "#f6f7f1",
      background: "#2d2d2f",
      color: "#f6f7f1",
      showCancelButton: true,
      cancelButtonText: "Tidak",
      cancelButtonColor: "#c76734",
      confirmButtonText: "Ya",
      confirmButtonColor: "#287d92",
      showClass: {
        popup: "",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        logoutSubmit();
      }
    });
  }

  async function logoutSubmit() {
    await axiosInstance.post("/api/v1/user/logout").then((res) => {
      if (res.data.message == "success" || res.status == 400) {
        localStorage.removeItem("auth_token");
        Swal.fire({
          html: `<b>${res.data.message}</b> tunggu...`,
          toast: true,
          width: 350,
          icon: "success",
          color: "#f6f7f1",
          background: "#2d2d2f",
          iconColor: "#287d92",
          showConfirmButton: false,
          timer: 1500,
          showClass: {
            popup: "",
          },
        }).then(() => {
          notifySucces("Berhasil keluar");
          if (router.pathname == "/") {
            router.reload();
          } else {
            router.push("/");
          }
        });
      }
    });
  }

  return (
    <nav
      className={`fixed z-50 w-full transition duration-300 ease-in-out ${
        scrollPosition > 0 || isOpen
          ? "bg-gmco-white text-black"
          : "bg-gradient-to-b from-gmco-grey-secondary/30 to-transparent text-white"
      }`}
    >
      <div className="flex h-auto mx-auto justify-between py-4 md:px-8 md:py-0 container">
        {/* Logo & Routes Link */}
        <div className="flex h-auto items-center">
          <Link href="/" className="flex mx-6 text-2xl font-bold">
            GC #10
          </Link>
          {/* Route when MD*/}
          <div className="ml-6 hidden h-full text-lg md:flex md:w-auto md:items-center">
            {routes.map((route, index) => (
              <Link
                key={index}
                href={route.route}
                className={`flex h-full items-center border-b-2 border-transparent px-6 py-5 font-semibold transition duration-150 ease-in-out ${
                  scrollPosition > 0
                    ? "hover:border-gmco-grey hover:bg-gray-700/10"
                    : "hover:border-gmco-white hover:bg-gmco-white/10"
                }`}
              >
                {route.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Cart dan User Profile */}
        <div className="flex h-auto items-center">

          {/* cart */}
          <Link
            href="/seats/cart"
            className="relative mr-4 flex h-max md:mr-6"
          >
            <FaShoppingCart className="h-6 w-auto scale-x-[-1]" />
            <p
              className={`absolute right-0 top-0 rounded-sm bg-red-500 px-1 text-xs ${
                checkout === 0 ? "hidden" : "inline"
              }`}
            >
              {checkout}
            </p>
          </Link>

          {/* Profile */}
          {!isLogedIn ? (
            <Link
              href="/auth"
              className={`flex self-center rounded-xl border-2 border-gmco-yellow-secondary bg-gmco-yellow-secondary px-3 py-1 text-xl font-bold text-gmco-white duration-150 ease-in-out hover:border-gmco-white hover:bg-gmco-orange-secondarydark ${
                isLogedIn ? "hidden" : "inline"
              }`}
            >
              Login
            </Link>
          ) : (
            <Dropdown
              // className="flex self-center"
              arrowIcon={false}
              inline={true}
              label={
                <Avatar
                  rounded={true}
                  alt="User settings"
                  img="/navbar/violin-picture.webp"
                >
                  <p className="hidden font-semibold lg:inline">
                    {logedUser.Email}
                  </p>
                </Avatar>
              }
            >
              <Dropdown.Header className="lg:hidden">
                {logedUser.Email}
              </Dropdown.Header>
              <Link href="/profile">
                <Dropdown.Item className="flex items-center gap-2">
                  <FaUser />
                  <span>Profile</span>
                </Dropdown.Item>
              </Link>
              <Dropdown.Item
                onClick={logoutCheck}
                className="flex items-center gap-2"
              >
                <AiOutlineLogout />
                <span>Log Out</span>
              </Dropdown.Item>
            </Dropdown>
          )}

          {/* Hamburger Button */}
          <div className="ml-2 flex items-center md:m-0 md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-800 transition duration-300 ease-in-out hover:text-gray-900 focus:text-gray-900 focus:outline-none"
              aria-label="Toggle navigation"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon
                  className={`${
                    scrollPosition > 0 ? "text-gmco-grey" : " text-gmco-white"
                  } h-6 w-6`}
                />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Route for Mobile*/}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } transition duration-300 ease-in-out`}
      >
        <div className="px-2 pt-2">
          {routes.map((route, index) => (
            <div
              key={index}
              className="w-full rounded-md p-2 font-semibold transition duration-150 ease-in-out hover:bg-gray-700/10"
            >
              <Link href={route.route}>{route.name}</Link>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}
