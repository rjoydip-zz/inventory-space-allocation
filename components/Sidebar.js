import Link from "next/link";
import { CgList } from "react-icons/cg";
import { BsHddRack } from "react-icons/bs";
import { MdOutlineDashboard } from "react-icons/md";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";

export default function Sidebar() {
  const navList = [
    {
      href: "/",
      title: "Dashboard",
      icon: <MdOutlineDashboard />
    },
    {
      href: "/rack",
      title: "Rack",
      icon: <BsHddRack />
    },
    {
      href: "/sku",
      title: "SKU",
      icon: <CgList />
    },
    {
      href: "/inbound",
      title: "Inbound",
      icon: <AiOutlineFundProjectionScreen />
    }
  ];

  return (
    <aside className="w-64" aria-label="Sidebar">
      <div className="overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-800">
        <ul className="space-y-2">
          {navList.map((item, index) => (
            <li key={index}>
              <div className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <span className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">{item.icon}</span>
                <Link href={item.href} className="ml-3">
                  {item.title}
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
