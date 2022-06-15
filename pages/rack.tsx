import dayjs from "dayjs";
import { useEffect, useState } from "react";
import humanizeString from "humanize-string";

import Layout from "../components/Layout";
import notify from "../components/Toster";
import { constant, fetcher } from "../utils";

export default function Rack() {
  const endpoint = "/api/rack";
  const [racks, setRacks] = useState([]);
  const fetchData = () => {
    fetcher(endpoint)
      .then((res) => res.json())
      .then((data) => setRacks(data));
    notify("Rack Data Synced");
  };

  useEffect(() => fetchData(), []);

  /* useEffect(() => {
    racks.map((item) => item.rackNameRef && item.rackNameRef.focus());
  }, [racks]); */

  /* const onSubmit = async (data, e) => {
    e.target.reset();
    data.rackCapacity = parseFloat(data.rackCapacity);
    defaultRackData.id = generateUID();
    defaultRackData.order = racks.length + 1;
    defaultRackData.updatedAt = defaultRackData.createdAt = dayjs().format();
    const newData = { ...defaultRackData, ...data };
    await (
      await fetch(`${endpoint}/${newData.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData),
      })
    ).json();
    setRacks([...racks, newData]);
    notify("Rack Item Submitted Successfully");
  }; */

  const updateData = async () => {
    await (
      await fetch(`${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(racks),
      })
    ).json();
    notify("Rack Item Submitted Successfully");
  };

  return (
    <div className="container px-4 sm:px-8 w-full">
      <div className="py-8">
        <div className="flex flex-row mb-1 sm:mb-0 justify-between w-full">
          <h2 className="text-2xl leading-tight">
            Racks
          </h2>
          <div className="text-end">
            <form
              className="flex flex-col md:flex-row w-3/4 md:w-full max-w-sm md:space-x-3 space-y-3 md:space-y-0 justify-center"
            >
              <div className=" relative ">
                <input
                  type="text"
                  id="&quot;form-subscribe-Filter"
                  className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Name"
                />
              </div>
              <button
                className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-200"
                type="submit"
              >
                Filter
              </button>
              <button
                type="button"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                className="inline-block p-2 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out disabled:opacity-100 rounded-full"
                onClick={() => fetchData()}
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
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div
            className="inline-block min-w-full shadow rounded-lg overflow-hidden"
          >
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  {[
                    "rackName",
                    "rackCapacity",
                    "capacityWiseRank",
                    "measurement",
                    "order",
                    "createdAt",
                    "updatedAt",
                  ].map((item, index) =>
                    <th
                      key={index}
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-bold"
                    >
                      {humanizeString(item)}
                    </th>
                  )}
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-bold"
                    colSpan={2}
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {racks && racks.map((item, index) => (<tr key={index}>
                  <td
                    className="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                  >
                    <div className="flex items-center">
                      <div className="ml-3">
                        <div
                          className="text-gray-900 whitespace-no-wrap text-center"
                        >
                          <div className=" relative ">
                            {/* <label htmlFor={`rackName-${index}`} className="text-gray-700">
                            Rack Name
                              <span className="text-red-500 required-dot">
                                *
                              </span>
                            </label> */}
                            <input
                              type="text"
                              id={`rackName-${index}`}
                              className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                              name={`rackName-${index}`}
                              placeholder="Rack Name"
                              value={item.rackName}
                              disabled={!item.shouldEnable}
                              ref={(e) => {
                                item.rackNameRef = e;
                              }}
                              onChange={() => void (0)}
                            />
                            {/* <div className="mt-2 text-green-500">
                              Rack Name Required
                            </div> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td
                    className="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                  >
                    <div
                      className="text-gray-900 whitespace-no-wrap text-center"
                    >
                      {/* <label htmlFor={`rackCapacity-${index}`} className="text-gray-700">
                            Rack Capacity
                              <span className="text-red-500 required-dot">
                                *
                              </span>
                            </label> */}
                      <input
                        type="text"
                        id={`rackCapacity-${index}`}
                        className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        name={`rackCapacity-${index}`}
                        placeholder="Rack Capacit"
                        value={item.rackCapacity}
                        disabled={!item.shouldEnable}
                        ref={(e) => item.rackCapacityRef = e}
                        onChange={() => void (0)}
                      />
                      {/* <div className="mt-2 text-green-500">
                              Rack Capacity value Required
                            </div> */}
                    </div>
                  </td>
                  <td
                    className="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                  >
                    <p className="text-gray-900 whitespace-no-wrap text-center">
                      {/* <label htmlFor={`capacityWiseRank-${index}`} className="text-gray-700">
                            Capacity Wise Rank
                              <span className="text-red-500 required-dot">
                                *
                              </span>
                            </label> */}
                      <input
                        type="number"
                        id={`capacityWiseRank-${index}`}
                        className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        name={`capacityWiseRank-${index}`}
                        placeholder="Capacit Wise Rank"
                        value={item.capacityWiseRank}
                        disabled={!item.shouldEnable}
                        ref={(e) => item.capacityWiseRankRef = e}
                        onChange={() => void (0)}
                      />
                      {/* <div className="mt-2 text-green-500">
                              Capacity Wise Rank value Required
                            </div> */}
                    </p>
                  </td>
                  <td
                    className="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                  >
                    <div
                      className="text-gray-900 whitespace-no-wrap text-center"
                    >
                      {item.measurement}
                    </div>
                  </td>
                  <td
                    className="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                  >
                    <div
                      className="text-gray-900 whitespace-no-wrap text-center"
                    >
                      {item.order}
                    </div>
                  </td>
                  <td
                    className="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                  >
                    <div
                      className="text-gray-900 whitespace-no-wrap text-center"
                    >
                      {dayjs(item.createdAt).format(constant.DATE_TIME_FORMAT)}
                    </div>
                  </td>
                  <td
                    className="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                  >
                    <div
                      className="text-gray-900 whitespace-no-wrap text-center"
                    >
                      {dayjs(item.updatedAt).format(constant.DATE_TIME_FORMAT)}
                    </div>
                  </td>
                  <td
                    className="px-2 py-2 border-b border-gray-200 bg-white text-sm text-center"
                  >
                    <button
                      type="button"
                      className="py-2 px-2 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                      onClick={() => {
                        const newModifiedRackItem = racks[index];
                        newModifiedRackItem["shouldEnable"] = true;
                        setRacks([...racks, newModifiedRackItem]);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"
                        />
                        <path
                          fillRule="evenodd"
                          d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </td>
                  <td
                    className="px-2 py-2 border-b border-gray-200 bg-white text-sm text-center"
                  >
                    <button
                      type="button"
                      className="py-2 px-2 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                      onClick={() => void (0)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>))}
              </tbody>
            </table>
            {/* Pagination */}
            <div
              className="px-5 bg-white py-5 flex flex-col xs:flex-row items-center xs:justify-between"
            >
              {racks && (<div className="flex items-center">
                <button
                  type="button"
                  className="w-full p-4 border text-base rounded-l-xl text-gray-600 bg-white hover:bg-gray-100"
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
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  className="w-full px-4 py-2 border-t border-b text-base text-indigo-500 bg-white hover:bg-gray-100 "
                >
                  1
                </button>
                <button
                  type="button"
                  className="w-full p-4 border-t border-b border-r text-base  rounded-r-xl text-gray-600 bg-white hover:bg-gray-100"
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
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Rack.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};
