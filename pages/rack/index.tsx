import dayjs from "dayjs";
import { useState, useEffect } from "react";
import humanizeString from 'humanize-string';
import { MdDelete, MdEdit } from "react-icons/md";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Layout from "../../components/Layout";
import Sidebar from "../../components/Sidebar";
import notify from "../../components/Toster";
import { constant } from "../../utils";

export default function Rack() {
  const endpoint = "/api/rack";
  const [racks, setRacks] = useState([]);

  const fetchData = () => {
    fetch(endpoint)
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
            <form className="flex flex-col md:flex-row w-3/4 md:w-full max-w-sm md:space-x-3 space-y-3 md:space-y-0 justify-center">
              <div className=" relative ">
                <input type="text" id="&quot;form-subscribe-Filter" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Name" />
              </div>
              <button className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200" type="submit">
                Filter
              </button>
            </form>
          </div>
        </div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  {["rackName", "rackCapacity", "capacityWiseRank", "measurement", "order", "createdAt", "updatedAt"].map((item, index) => <th key={index} scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-bold">
                    {humanizeString(item)}
                  </th>)}
                  <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-bold" colSpan={2}>Action</th>
                </tr>
              </thead>
              <tbody>
                {racks && racks.map((item, index) => (<tr key={index}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="flex items-center">
                      <div className="ml-3">
                        <div className="text-gray-900 whitespace-no-wrap text-center">
                          <div className=" relative ">
                            {/* <label htmlFor={`rackName-${index}`} className="text-gray-700">
                            Rack Name
                              <span className="text-red-500 required-dot">
                                *
                              </span>
                            </label> */}
                            <input type="text" id={`rackName-${index}`} className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name={`rackName-${index}`} placeholder="Rack Name" value={item.rackName} disabled={!item.shouldEnable}
                              ref={e => {
                                item.rackNameRef = e;
                              }} onChange={() => void (0)} />
                            {/* <div className="mt-2 text-green-500">
                              Rack Name Required
                            </div> */}
                          </div>

                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="text-gray-900 whitespace-no-wrap text-center">
                      {/* <label htmlFor={`rackCapacity-${index}`} className="text-gray-700">
                            Rack Capacity
                              <span className="text-red-500 required-dot">
                                *
                              </span>
                            </label> */}
                      <input type="text" id={`rackCapacity-${index}`} className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name={`rackCapacity-${index}`} placeholder="Rack Capacit" value={item.rackCapacity} disabled={!item.shouldEnable}
                        ref={e => item.rackCapacityRef = e} onChange={() => void (0)} />
                      {/* <div className="mt-2 text-green-500">
                              Rack Capacity value Required
                            </div> */}
                    </div>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap text-center">
                      {/* <label htmlFor={`capacityWiseRank-${index}`} className="text-gray-700">
                            Capacity Wise Rank
                              <span className="text-red-500 required-dot">
                                *
                              </span>
                            </label> */}
                      <input type="number" id={`capacityWiseRank-${index}`} className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name={`capacityWiseRank-${index}`} placeholder="Capacit Wise Rank" value={item.capacityWiseRank} disabled={!item.shouldEnable}
                        ref={e => item.capacityWiseRankRef = e} onChange={() => void (0)} />
                      {/* <div className="mt-2 text-green-500">
                              Capacity Wise Rank value Required
                            </div> */}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="text-gray-900 whitespace-no-wrap text-center">
                      {item.measurement}
                    </div>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="text-gray-900 whitespace-no-wrap text-center">
                      {item.order}
                    </div>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="text-gray-900 whitespace-no-wrap text-center">
                      {dayjs(item.createdAt).format(constant.DATE_TIME_FORMAT)}
                    </div>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="text-gray-900 whitespace-no-wrap text-center">
                      {dayjs(item.updatedAt).format(constant.DATE_TIME_FORMAT)}
                    </div>
                  </td>
                  <td className="px-2 py-2 border-b border-gray-200 bg-white text-sm text-center">
                    <button type="button" className="py-2 px-2 bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg" onClick={() => {
                      const newModifiedRackItem = racks[index];
                      newModifiedRackItem['shouldEnable'] = true;
                      setRacks([...racks, newModifiedRackItem])
                    }}>
                      <MdEdit />
                    </button>
                  </td>
                  <td className="px-2 py-2 border-b border-gray-200 bg-white text-sm text-center">
                    <button type="button" className="py-2 px-2 bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg" onClick={() => void (0)}>
                      <MdDelete />
                    </button>
                  </td>
                </tr>))}
              </tbody>
            </table>
            {/* Pagination */}
            <div className="px-5 bg-white py-5 flex flex-col xs:flex-row items-center xs:justify-between">
              {racks && (<div className="flex items-center">
                <button type="button" className="w-full p-4 border text-base rounded-l-xl text-gray-600 bg-white hover:bg-gray-100">
                  <IoIosArrowBack />
                </button>
                <button type="button" className="w-full px-4 py-2 border-t border-b text-base text-indigo-500 bg-white hover:bg-gray-100 ">
                  1
                </button>
                <button type="button" className="w-full px-4 py-2 border text-base text-gray-600 bg-white hover:bg-gray-100">
                  2
                </button>
                <button type="button" className="w-full p-4 border-t border-b border-r text-base  rounded-r-xl text-gray-600 bg-white hover:bg-gray-100">
                  <IoIosArrowForward />
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
      <Sidebar />
      {page}
    </Layout>
  );
};
