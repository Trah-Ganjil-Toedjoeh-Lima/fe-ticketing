import Link from "next/link";
import Image from "next/image";

import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaTwitter,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";

export default function FooterBar() {
  // Menu Lg 1 x (x) SM 1 x 2
  const menus = [
    {
      title: "About",
      submenu: [
        { name: "Grand Concert #10", route: "/" },
        { name: "GMCO UGM", route: "https://gmco.ukm.ugm.ac.id/" },
        { name: "UGM", route: "https://www.ugm.ac.id/" },
      ],
    },
    {
      title: "Follow us",
      submenu: [
        { name: "Instagram", route: "https://www.instagram.com/gmco_ugm/" },
        { name: "Twitter", route: "https://twitter.com/GMCO_UGM?s=08" },
        {
          name: "YouTube",
          route: "https://www.youtube.com/channel/UC0VSyJsls-u84buKVgWsBUA",
        },
      ],
    },
    {
      title: "Legal",
      submenu: [{ name: "Terms & Conditions", route: "/terms-and-conditions" }],
    },
  ];

  // Social Media Icon
  const socials = [
    { name: <FaTiktok className='h-5 w-5' />, route: "/" },
    { name: <FaWhatsapp className='h-5 w-5' />, route: "/" },
    {
      name: <FaInstagram className='h-5 w-5' />,
      route: "https://www.instagram.com/gmco_ugm/",
    },
    {
      name: <FaTwitter className='h-5 w-5' />,
      route: "https://twitter.com/GMCO_UGM?s=08",
    },
    {
      name: <FaFacebook className='h-5 w-5' />,
      route:
        "https://www.facebook.com/people/Gadjah-Mada-Chamber-Orchestra/100067509763569/",
    },
    {
      name: <FaYoutube className='h-5 w-5' />,
      route: "https://www.youtube.com/channel/UC0VSyJsls-u84buKVgWsBUA",
    },
  ];

  return (
    <footer className='bg-gmco-grey px-8 pb-6 pt-10 text-gmco-white md:px-8 lg:px-48'>
      <div className='mb-4 grid grid-cols-2 gap-8 md:mb-16 md:grid-cols-5 md:gap-2 lg:grid-cols-7'>
        <div className='col-span-2 md:mr-24 lg:col-span-4'>
          <div className='flex items-center'>
            <Image
              src='/logo-anjangsana.webp'
              alt='logo gmco'
              className='mr-3 h-12 w-max md:h-20'
              width={1000}
              height={1000}
            />
            <span href='#' className='text-xl font-bold'>
              Grand Concert #10 <br />{" "}
              <span className='text-base font-medium'>Anjangsana Simfoni</span>
            </span>
          </div>
        </div>
        {menus.map((menu, index) => (
          <div key={index}>
            <div className='mb-4 text-xl font-bold'>{menu.title}</div>
            <ul className='space-y-2 text-gmco-white/60'>
              {menu.submenu.map((submenu, index) => (
                <li key={index}>
                  <Link href={submenu.route} className='hover:text-gmco-white'>
                    {submenu.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className='my-6 border-t border-gray-300 '></div>

      {/* Bawah */}
      <div className='inline items-center justify-between md:flex'>
        <div className='text-sm text-gray-500'>
          &copy;
          <Link href='' className='font-bold hover:text-gmco-white'>
            GMCO UGM{" "}
          </Link>
          courtesy of
          <Link href='' className='font-bold hover:text-gmco-white'>
            {" "}
            Trah Ganjil 75{" "}
          </Link>
          {new Date().getFullYear()}
        </div>

        {/* to do : cari icon */}
        <div className='mt-2 flex space-x-4 md:m-0'>
          {socials.map((social, index) => (
            <Link
              key={index}
              href={social.route}
              className='text-gmco-white/50 hover:text-gmco-white'
            >
              {social.name}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
