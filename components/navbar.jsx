import Link from "next/link";
import { useState, useEffect } from "react";

import { Dropdown, Avatar } from "flowbite-react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { FaShoppingCart } from "react-icons/fa";

export default function NavigationBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const routes = [
    { name: "Home", route: "/" },
    { name: "About", route: "/#about" },
    { name: "Seat", route: "/seats" },
    { name: <FaShoppingCart className="scale-x-[-1] h-6 w-6"/>, route: "/seats/cart" },
  ];

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

  return (
    <nav
      className={`fixed z-10 w-full py-3 transition duration-300 ease-in-out ${
        scrollPosition > 0 || isOpen
          ? "bg-gmco-white text-black"
          : "bg-gradient-to-b from-gmco-grey-secondary/30 to-transparent text-white"
      }`}
    >
      <div className="flex justify-between px-4 md:px-8 lg:px-48">
        {/* Logo & Nama */}
        <Link href="/" className="flex items-center">
          <img
            src="/logo_gmco.webp"
            className="mr-3 h-6 sm:h-9"
            alt="GMCO Event Logo"
          />
          <span href="#" className="text-lg font-bold">
            GMCO Event
          </span>
        </Link>
        <div className="flex w-max">
          {/* Route when MD*/}
          <div className="mr-2 hidden md:flex md:w-auto md:items-center">
            <div className="flex items-center space-x-2 text-lg">
              {routes.map((route, index) => (
                <Link
                  key={index}
                  href={route.route}
                  className="rounded-md p-2 px-6 font-semibold transition duration-150 ease-in-out hover:bg-gray-700/10"
                >
                  {route.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Profile */}
          <Dropdown
            arrowIcon={false}
            inline={true}
            label={
              <Avatar
                rounded={true}
                alt="User settings"
                img="https://cdn-icons-png.flaticon.com/512/4313/4313258.png"
              />
            }
          >
            <Dropdown.Header>
              <p className="block truncate text-sm font-medium">
                name@flowbite.com
              </p>
            </Dropdown.Header>
            <Dropdown.Item>Profile</Dropdown.Item>
            <Dropdown.Item>Sign out</Dropdown.Item>
          </Dropdown>

          {/* Hamburger Button */}
          <div className="ml-2 flex items-center md:m-0 md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-800 transition duration-300 ease-in-out hover:text-gray-900 focus:text-gray-900 focus:outline-none"
              aria-label="Toggle navigation"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <XMarkIcon className="h-5 w-5" />
              ) : (
                <Bars3Icon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Route when Mobile*/}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } transition duration-300 ease-in-out md:hidden`}
      >
        <div className="px-2 pt-2">
          {routes.map((route, index) => (
            <Link
              key={index}
              href={route.route}
              className="rounded-md p-2 px-6 font-semibold transition duration-150 ease-in-out hover:bg-gray-700/10"
            >
              <li>{route.name}</li>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
