import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function FooterBar() {
  const menus = [
    {
      title: "About",
      submenu: [
        { name: "FLowbite", route: "/" },
        { name: "Tailwind CSS", route: "/" },
      ],
    },
    {
      title: "Follow us",
      submenu: [
        { name: "Github", route: "/" },
        { name: "Discord", route: "/" },
      ],
    },
    {
      title: "Legal",
      submenu: [
        { name: "Privacy Policy", route: "/" },
        { name: "Terms & Conditions", route: "/" },
      ],
    },
  ];

  return (
    <footer className="bg-gmco-grey text-gmco-white pt-10 pb-6 px-8 md:px-8 lg:px-48">
      <div className="grid grid-cols-2 gap-8 mb-4 md:mb-24 md:grid-cols-5 lg:grid-cols-7 md:gap-2">
        <div className="col-span-2 lg:col-span-4 md:mr-24">
          <div className="flex items-center">
            <img
              src="https://www.svgrepo.com/show/361653/vercel-logo.svg"
              className="mr-3 h-6 sm:h-9"
              alt="GMCO Event Logo"
            />
            <span href="#" className="text-xl font-bold">
              My App
            </span>
          </div>
        </div>
        {menus.map((menu) => (
          <div>
            <div className="text-xl font-bold mb-4">{menu.title}</div>
            <ul className="space-y-2">
              {menu.submenu.map((submenu) => (
                <li>
                  <Link href={submenu.route} className="hover:text-white">
                    {submenu.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-gray-300 my-6 "></div>

      {/* Bawah */}
      <div className="inline md:flex justify-between items-center">
        <div className="text-sm text-gray-500">
          &copy; GMCO UGM courtesy by Trah Ganjil 75 {new Date().getFullYear()}
        </div>

        {/* to do : cari icon */}
        <div className="flex space-x-4 mt-2 md:m-0">
          <Link href="#" className="hover:text-white">
            <QuestionMarkCircleIcon className="h-6 w-6" />
          </Link>
          <Link href="#" className="hover:text-white">
            <QuestionMarkCircleIcon className="h-6 w-6" />
          </Link>
          <Link href="#" className="hover:text-white">
            <QuestionMarkCircleIcon className="h-6 w-6" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
