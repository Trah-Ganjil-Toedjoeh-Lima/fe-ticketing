import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Dropdown, Avatar } from "flowbite-react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { FaShoppingCart } from "react-icons/fa";
import { axiosInstance } from "@/atoms/config";
import Swal from "sweetalert2";

export default function NavBarAdmin() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [logedUser, setLogedUser] = useState({
    Email: "",
    Name: "",
    Phone: "",
    UserId: 0,
  });
  const routes = [
    { name: "Home", route: "/" },
    { name: "About", route: "/#about" },
    { name: "Seat", route: "/seats" },
    {
      name: (
        <>
          <FaShoppingCart className='hidden scale-x-[-1] md:inline md:h-6 md:w-6' />
          <p className='md:hidden'>Shopping Cart</p>
        </>
      ),
      route: "/seats/cart",
    },
  ];

  useEffect(() => {
    (async () => {
      try {
        const [res] = await Promise.all([
          axiosInstance.get("/api/v1/user/profile"),
        ]);
        setLogedUser(res.data.data);
      } catch {}
    })();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function logoutCheck(e) {
    Swal.fire({
      html: `Anda yakin ingin keluar?`,
      toast: false,
      icon: "warning",
      iconColor: "#000000",
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
        logoutSubmit(e);
      }
    });
  }

  async function logoutSubmit(e) {
    e.preventDefault();

    await axiosInstance.post("/api/v1/user/logout").then((res) => {
      if (res.data.message == "success") {
        localStorage.removeItem("auth_token");
        Swal.fire({
          html: `<b>${res.data.message}</b> tunggu...`,
          toast: true,
          width: 350,
          icon: "success",
          iconColor: "#16a34a",
          showConfirmButton: false,
          timer: 1500,
          showClass: {
            popup: "",
          },
        }).then(() => {
          router.push("/admin/login");
        });
      }
    });
  }

  return (
    <nav
      className={`fixed z-50 w-full py-3 transition duration-300 ease-in-out ${
        scrollPosition > 0 || isOpen
          ? "bg-gmco-white text-black"
          : "bg-gradient-to-b from-gmco-grey-secondary/30 to-transparent text-white"
      }`}
    >
      <div className='flex justify-between px-4 md:px-8 lg:px-48'>
        {/* Logo & Nama */}
        <Link href='/' className='flex items-center text-2xl font-bold'>
          GC #10
        </Link>
        <div className='flex w-max'>
          {/* Route when MD*/}
          <div className='mr-2 hidden md:flex md:w-auto md:items-center'>
            <div className='flex items-center space-x-2 text-lg'>
              {routes.map((route, index) => (
                <Link
                  key={index}
                  href={route.route}
                  className={`rounded-md p-2 px-6 font-semibold transition duration-150 ease-in-out ${
                    scrollPosition > 0
                      ? "hover:bg-gray-700/10 "
                      : "hover:bg-gmco-white/10"
                  }`}
                >
                  {route.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Profile */}
          {logedUser.Email === "" ? (
            <Link
              href='/auth'
              className={`flex items-center rounded-md px-4 py-2 text-xl font-bold duration-150 ease-in-out hover:bg-gray-700/10 ${
                scrollPosition > 0
                  ? "hover:bg-gray-700/10 "
                  : "hover:bg-gmco-white/10"
              }`}
            >
              Login
            </Link>
          ) : (
            <Dropdown
              arrowIcon={false}
              inline={true}
              label={
                <Avatar
                  rounded={true}
                  alt='User settings'
                  img='/violin-picture.webp'
                />
              }
            >
              <Dropdown.Header>
                <p className='block truncate text-sm font-medium'>
                  {logedUser.Email}
                </p>
              </Dropdown.Header>
              <Dropdown.Item>
                <Link href='/profile'>Profile</Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <a onClick={logoutCheck}>Log Out</a>
              </Dropdown.Item>
            </Dropdown>
          )}

          {/* Hamburger Button */}
          <div className='ml-2 flex items-center md:m-0 md:hidden'>
            <button
              type='button'
              className='inline-flex items-center justify-center rounded-md p-2 text-gray-800 transition duration-300 ease-in-out hover:text-gray-900 focus:text-gray-900 focus:outline-none'
              aria-label='Toggle navigation'
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <XMarkIcon className='h-6 w-6' />
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

      {/* Route when Mobile*/}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } transition duration-300 ease-in-out`}
      >
        <div className='px-2 pt-2'>
          {routes.map((route, index) => (
            <div
              key={index}
              className='w-full rounded-md p-2 font-semibold transition duration-150 ease-in-out hover:bg-gray-700/10'
            >
              <Link href={route.route}>{route.name}</Link>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}