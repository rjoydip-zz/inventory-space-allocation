import toast from "react-hot-toast";
import { MdOutlineClose } from "react-icons/md";
import { HiLightningBolt } from "react-icons/hi";

export default function notify(data) {
  toast.custom(
    (t) => (
      <div
        className={`flex flex-row items-center justify-left bg-blue-700 w-96 bg-gray-900 px-4 py-6 text-white shadow-2xl hover:shadow-none transform-gpu translate-y-0 hover:translate-y-1 rounded-xl relative transition-all duration-500 ease-in-out ${
          t.visible ? "top-0" : "-top-96"
        }`}
      >
        <div className="text-xl">
          <HiLightningBolt />
        </div>
        <div className="flex flex-row items-start justify-center ml-4 cursor-default">
          <p className="text-base text-gray-200 font-semibold leading-none tracking-wider">{data}</p>
        </div>
        <div
          className="absolute top-2 right-2 cursor-pointer text-lg"
          onClick={() => toast.dismiss(t.id)}
        >
          <MdOutlineClose />
        </div>
      </div>
    ),
    { id: "t-notification", position: "top-center" }
  );
}
