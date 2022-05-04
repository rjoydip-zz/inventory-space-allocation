export default function Listview({ children }) {
  return (
    <div className="flex flex-col container max-w-md mt-10 w-full items-center justify-center bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="flex flex-col divide-y w-full">
        <div className="flex flex-row">{children}</div>
      </div>
    </div>
  );
}
