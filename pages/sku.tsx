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

export default function Sku() {
  const defaultSkuItem = {
    id: null,
    skuName: null,
    skuCapacity: null,
    measurement: "cubic feet",
    createdAt: null,
    updatedAt: null,
  };
  const endpoint = "/api/sku";
  const [skuList, setSkuList] = useState([]);

  const schema = yup
    .object({
      skuName: yup.string().required(),
      skuCapacity: yup.number().required(),
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
      .then((data) => {
        setSkuList(data);
        notify("SKU Data Synced");
      });
  };

  useEffect(() => fetchData(), []);

  const onSubmit = async (data, e) => {
    e.target.reset();
    defaultSkuItem.id = generateUID();
    defaultSkuItem.updatedAt = defaultSkuItem.createdAt = dayjs().format();
    const body = { ...defaultSkuItem, ...data };
    const responseData = await (
      await fetch(`${endpoint}/${body.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
    ).json();
    setSkuList([...skuList, responseData]);
    notify("SKU Item Submitted Successfully");
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
                htmlFor="skuName"
              >
                <span className={errors.skuName ? "text-red-600" : ""}>
                  {errors.skuName?.message ?? "SKU Name *"}
                </span>
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="skuName"
                type="text"
                placeholder="X"
                {...register("skuName")}
              />
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="skuCapacity"
              >
                <span className={errors.skuCapacity ? "text-red-600" : ""}>
                  {errors.skuCapacity?.message ?? "Capacity (cubic feet) *"}
                </span>
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="skuCapacity"
                type="number"
                step="any"
                placeholder="0"
                {...register("skuCapacity")}
              />
            </div>
            <div>
              <div className="bg-white w-full m-3 inline-block"></div>
              <button
                type="submit"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                disabled={!isValid}
                className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out disabled:opacity-100"
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
      {skuList.map((item, index) => (
        <Listview key={index}>
          <div className="select-none cursor-pointer hover:bg-gray-50 flex flex-1 items-center p-4">
            <div className="flex-1 pl-1">
              <div className="font-medium dark:text-white">{item.skuName}</div>
              <div className="text-gray-600 dark:text-gray-200 text-sm">
                {item.skuCapacity} {item.measurement}
              </div>
            </div>
            <div className="flex flex-row justify-center">
              <div className="w-10 text-right flex justify-end"></div>
            </div>
          </div>
        </Listview>
      ))}
    </section>
  );
}

Sku.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Sidebar />
      {page}
    </Layout>
  );
};
