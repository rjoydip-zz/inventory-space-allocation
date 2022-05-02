import * as yup from "yup";
import * as dayjs from "dayjs";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FiRefreshCcw } from "react-icons/fi";
import { yupResolver } from "@hookform/resolvers/yup";
import Layout from "../components/Layout";
import Sidebar from "../components/Sidebar";
import Listview from "../components/Listview";
import notify from "../components/Toster";
import { generateUID } from "../utils";

export default function Rack() {
  const defaultRackData = {
    id: null,
    rackName: null,
    rackCapacity: 0,
    order: 0,
    measurement: "cubic feet",
    createdAt: null,
    updatedAt: null,
  };
  const endpoint = "/api/rack";
  const [racks, setRacks] = useState([]);

  const schema = yup
    .object({
      rackName: yup.string().required(),
      rackCapacity: yup.number().positive().required(),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const fetchData = () => {
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => setRacks(data));
    notify("Rack Data Synced");
  };

  useEffect(() => fetchData(), []);

  const onSubmit = async (data, e) => {
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
  };

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
    <section>
      <div className="sticky top-0 bg-white shadow-md mt-4 inline-block rounded-lg">
        {/* Form section */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-wrap m-2">
            <div className="w-full md:w-1/3 px-2 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="rackName"
              >
                <span
                  className={errors.rackName?.message ? "text-red-600" : ""}
                >
                  {errors.rackName?.message ?? "Rack Name *"}
                </span>
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="rackName"
                type="text"
                placeholder="X"
                {...register("rackName")}
              />
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="rackCapacity"
              >
                <span className={errors.rackCapacity ? "text-red-600" : ""}>
                  {errors.rackCapacity?.message ?? "Capacity (cubic feet) *"}
                </span>
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="rackCapacity"
                type="number"
                placeholder="0"
                step="any"
                {...register("rackCapacity")}
              />
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <div className="bg-white w-full m-3 inline-block"></div>
              <button
                type="submit"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                disabled={!isValid}
                className="inline-block px-4 py-2 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out disabled:opacity-100"
              >
                Submit
              </button>
              <span className="inline-block p-2"></span>
              <button
                type="button"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                className="inline-block px-4 py-2 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out disabled:opacity-100"
                onClick={() => fetchData()}
              >
                <FiRefreshCcw />
              </button>
            </div>
          </div>
        </form>
      </div>
      <ul>
        {racks.map((item, index) => (
          <li key={index}>
            <Listview>
              <div className="select-none cursor-pointer hover:bg-gray-50 flex flex-1 items-center p-4">
                <div className="flex-1 pl-1">
                  <div className="font-medium dark:text-white">
                    {item.rackName}
                  </div>
                  <div className="text-gray-600 dark:text-gray-200 text-sm">
                    {item.rackCapacity} {item.measurement}
                  </div>
                </div>
                <div className="">
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="number"
                    placeholder="0"
                    value={item.order}
                    min={0}
                    onChange={(e) => {
                      racks[index].order = parseInt(e.target.value);
                      setRacks([...racks]);
                    }}
                  />
                </div>
              </div>
            </Listview>
          </li>
        ))}
      </ul>
      {!!racks.length && (
        <div className={`bg-white w-full m-2`}>
          <button
            type="button"
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
            className="inline-block px-4 py-2 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out disabled:opacity-100"
            onClick={() => updateData()}
          >
            Submit
          </button>
        </div>
      )}
    </section>
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
