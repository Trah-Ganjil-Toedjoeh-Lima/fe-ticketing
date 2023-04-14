import Link from "next/link";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";

export default function FooterBar() {
  // Menu Lg 1 x (x) SM 1 x 2
  const menus = [
    {
      title: "About",
      submenu: [
        { name: "GMCO Event", route: "/" },
        { name: "GMCO UGM", route: "/" },
        { name: "UGM", route: "/" },
      ],
    },
    {
      title: "Follow us",
      submenu: [
        { name: "Instagram", route: "/" },
        { name: "Twitter", route: "/" },
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

  // Social Media Icon
  const socials = [
    { name: <FaGithub className="h-5 w-5" />, route: "/" },
    { name: <FaWhatsapp className="h-5 w-5" />, route: "/" },
    { name: <FaInstagram className="h-5 w-5" />, route: "/" },
    { name: <FaTwitter className="h-5 w-5" />, route: "/" },
    { name: <FaFacebook className="h-5 w-5" />, route: "/" },
  ];

  return (
    <footer className="bg-gmco-grey text-gmco-white pt-10 pb-6 px-8 md:px-8 lg:px-48">
      <div className="grid grid-cols-2 gap-8 mb-4 md:mb-16 md:grid-cols-5 lg:grid-cols-7 md:gap-2">
        <div className="col-span-2 lg:col-span-4 md:mr-24">
          <div className="flex items-center">
            <img
              src="/logo_gmco.webp"
              className="mr-3 h-6 sm:h-9"
              alt="GMCO Event Logo"
            />
            <span href="#" className="text-xl font-bold">
              GMCO Event
            </span>
          </div>
        </div>
        {menus.map((menu, index) => (
          <div key={index}>
            <div className="text-xl font-bold mb-4">{menu.title}</div>
            <ul className="space-y-2 text-gmco-white/60">
              {menu.submenu.map((submenu, index) => (
                <li key={index}>
                  <Link href={submenu.route} className="hover:text-gmco-white">
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
          &copy;
          <Link href="" className="hover:text-gmco-white font-bold">
            GMCO UGM{" "}
          </Link>
          courtesy by
          <Link href="" className="hover:text-gmco-white font-bold">
            {" "}
            Trah Ganjil 75{" "}
          </Link>
          {new Date().getFullYear()}
        </div>

        {/* to do : cari icon */}
        <div className="flex space-x-4 mt-2 md:m-0">
          {socials.map((social, index) => (
            <Link
              key={index}
              href="#"
              className="text-gmco-white/50 hover:text-gmco-white"
            >
              {social.name}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
