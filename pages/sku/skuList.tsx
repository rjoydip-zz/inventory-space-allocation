export default function SkuList(
  { data = [] }: {
    data: { skuName: string; measurement: string; skuCapacity: number }[];
  },
): JSX.Element {
  return (
    <div className="bg-white">
      <div
        className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8"
      >
        <div
          className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"
        >
          {data.map((item, index) => (
            <div
              key={index}
              className="group relative border-solid border-2 border-blue-600 rounded-2xl p-2"
            >
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="uppercase text-2xl text-gray-700">
                    {item.skuName}
                  </h3>
                  <p className="uppercase mt-1 text-md text-gray-500">
                    {item.measurement}
                  </p>
                </div>
                <p className="text-lg font-medium text-gray-900">
                  {item.skuCapacity}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
