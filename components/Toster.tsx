import toast from "react-hot-toast";

export default function notify(data) {
  toast.custom(
    (t) => (
      <div
        className={`flex flex-row items-center justify-left bg-blue-700 w-96 bg-gray-900 px-4 py-6 text-white shadow-2xl hover:shadow-none transform-gpu translate-y-0 hover:translate-y-1 rounded-xl relative transition-all duration-500 ease-in-out ${
          t.visible ? "top-0" : "-top-96"
        }`}
      >
        <div className="text-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        </div>
        <div
          className="flex flex-row items-start justify-center ml-4 cursor-default"
        >
          <p
            className="text-base text-gray-200 font-semibold leading-none tracking-wider"
          >
            {data}
          </p>
        </div>
        <div
          className="absolute top-2 right-2 cursor-pointer text-lg"
          onClick={() => toast.dismiss(t.id)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </div>
    ),
    { id: "t-notification", position: "top-center" },
  );
}
