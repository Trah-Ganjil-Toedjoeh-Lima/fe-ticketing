import Link from "next/link";
import { HiOutlineChevronRight } from "react-icons/hi";

export default function FooterBar() {
  return (
    <footer className="bg-gmco-grey text-gmco-white pt-10 pb-6 px-4 md:px-8 lg:px-48">
      <div className="grid grid-cols-2 gap-8 md:grid-cols-5 lg:grid-cols-7 md:gap-2">
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
        <div>
          <div className="text-xl font-bold mb-4">About</div>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="hover:text-white">
                Flowbite
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white">
                Tailwind CSS
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <div className="text-xl font-bold mb-4">Follow us</div>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="hover:text-white">
                Github
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white">
                Discord
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <div className="text-xl font-bold mb-4">Legal</div>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="hover:text-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white">
                Terms &amp; Conditions
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-300 my-6 "></div>

      {/* Bawah */}
      <div className="inline md:flex justify-between items-center">
        <div className="text-sm text-gray-500">
          &copy; GMCO UGM courtesy by Trah Ganjil 75 {new Date().getFullYear()}
        </div>
        <div className="flex space-x-4 mt-2 md:m-0">
          <Link href="#" className="hover:text-white">
            <HiOutlineChevronRight className="h-6 w-6" />
          </Link>
          <Link href="#" className="hover:text-white">
            <HiOutlineChevronRight className="h-6 w-6" />
          </Link>
          <Link href="#" className="hover:text-white">
            <HiOutlineChevronRight className="h-6 w-6" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
