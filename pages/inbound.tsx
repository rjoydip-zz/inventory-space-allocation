import * as yup from "yup";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Layout from "../components/Layout";
import Sidebar from "../components/Sidebar";
import notify from "../components/Toster";
import { generateUID } from "../utils";

export default function Inbound() {
  const skuEndpoint = "/api/sku",
    rackEndpoint = "/api/rack",
    volumetricCapacity = 90;
  const [skuList, setSkuList] = useState([]);
  const [rackList, setRackList] = useState([]);
  const [inboundLists, setInboundLists] = useState([]);
  const schema = yup
    .object()
    .shape({
      chalanNo: yup
        .string()
        .required()
        .matches(/^[a-zA-Z0-9]{2}-[a-zA-Z0-9]/, {
          message: "Invalid chanal format",
        }),
      inboundDate: yup
        .string()
        .required()
        .matches(
          /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/,
          {
            message: "Invalid date format",
          }
        ),
    })
    .required();

  const {
    reset,
    register,
    setError,
    getValues,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const addStorageEfficency = (data) => {
    const _sortedRackList = data.sort(
      (a, b) => parseFloat(b.rackCapacity) - parseFloat(a.rackCapacity)
    );
    return _sortedRackList
      .map((item, index) => {
        const _item = item;
        if (index === 0) {
          _item.capacityWiseRank = 1;
        } else {
          if (
            parseFloat(_sortedRackList[index - 1].rackCapacity) ===
            parseFloat(_item.rackCapacity)
          ) {
            _item.capacityWiseRank = parseFloat(
              _sortedRackList[index - 1].capacityWiseRank
            );
          } else {
            _item.capacityWiseRank =
              parseFloat(_sortedRackList[index - 1].capacityWiseRank) + 1;
          }
        }
        return _item;
      })
      .map((item) => {
        const _item = item;
        _item.storageCoefficient = parseFloat(
          (item.capacityWiseRank * 0.3 + item.order * 0.7).toFixed(2)
        );
        return _item;
      })
      .sort((a, b) => a.storageCoefficient - b.storageCoefficient);
  };

  useEffect(() => {
    fetch(skuEndpoint)
      .then((res) => res.json())
      .then((data) => setSkuList(data));
    fetch(rackEndpoint)
      .then((res) => res.json())
      .then((data) => {
        setRackList(addStorageEfficency(data));
      });
  }, []);

  const submitRackOccupyAPI = async (rackName) => {
    const rackDetails = rackList.filter(
      (item) => item.rackName.toLowerCase() === rackName.toLowerCase()
    )[0];
    const data = await fetch(`${rackEndpoint}/${rackDetails.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isOccupied: true }),
    }).then((res) => res.json());
    console.log(data)
    setValue("skuNo", "");
    setInboundLists([...inboundLists]);
    notify("Rack has been Occupied");
  };

  const addRow = () => {
    setInboundLists([
      ...inboundLists,
      {
        id: generateUID(),
        quantity: 0,
        skuNo: null,
        chalanNo: !!getValues("chalanNo") && getValues("chalanNo"),
        inboundDate: !!getValues("inboundDate") && getValues("inboundDate"),
        suggestedPlace: "",
        createdAt: dayjs().format(),
        updatedAt: dayjs().format(),
      },
    ]);
  };

  const onSkuChange = (e) => {
    const _skuNo = getValues("skuNo");
    if (e.key === "Enter" && !!_skuNo) {
      const updatedInboundList = inboundLists.map((ibl) => {
        const matchedSku = skuList.filter(
          (i) => i.skuName.toLowerCase() == _skuNo.toLowerCase()
        );
        if (ibl.skuNo == _skuNo && !!matchedSku.length) {
          ibl.quantity += 1;

          const leastStorageCoefficientRackDetail = rackList[0];
          const matchedSkuDetail = matchedSku[0];
          if (
            parseInt(ibl.quantity) * parseFloat(matchedSkuDetail.skuCapacity) >=
            (volumetricCapacity / 100) *
              parseFloat(leastStorageCoefficientRackDetail.rackCapacity)
          ) {
            ibl.suggestedPlace = leastStorageCoefficientRackDetail.rackName;
          }
        }
        return ibl;
      });
      // Suggest space
      setInboundLists(updatedInboundList);
    }
  };

  const onSkuChangeInList = (e, index, item) => {
    const _changeValue = e.target.value;
    if (
      skuList.filter(
        (i) => i.skuName.toLowerCase() === _changeValue.toLowerCase()
      ).length === 0
    ) {
      setError(`inboundLists-${index}-skuNo`, {
        type: "server",
        message: "SKU not match",
      });
    } else {
      reset({
        [`inboundLists-${index}-.skuNo`]: _changeValue,
      });
    }
    setInboundLists(
      inboundLists.map((ibl) => {
        if (ibl.id === item.id) {
          ibl.skuNo = _changeValue;
          ibl.updatedAt = dayjs().format();
        }
        return ibl;
      })
    );
  };

  return (
    <section>
      <form>
        <div className="sticky top-0 bg-white shadow-md mt-4 inline-block rounded-lg">
          {/* Form section */}
          <div className="flex flex-wrap m-2">
            <div className="w-full md:w-1/3 px-2 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="inboundDate"
              >
                <span className={errors.inboundDate ? "text-red-600" : ""}>
                  {errors.inboundDate?.message ?? "Date *"}
                </span>
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="inboundDate"
                type="text"
                placeholder="DD/MM/YYYY"
                {...register("inboundDate")}
              />
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="chalanNo"
              >
                <span className={errors.chalanNo ? "text-red-600" : ""}>
                  {errors.chalanNo?.message ?? "Chalan No *"}
                </span>
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="chalanNo"
                type="text"
                placeholder="XX-XXXX"
                {...register("chalanNo")}
              />
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="skuNo"
              >
                SKU scan
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="skuNo"
                type="text"
                placeholder="X"
                {...register("skuNo")}
                onKeyPress={(e) => onSkuChange(e)}
              />
            </div>
          </div>
          <div className="flex flex-wrap m-6">
            <button
              type="button"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
              disabled={!isValid}
              className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out disabled:opacity-100"
              onClick={addRow}
            >
              Add Row
            </button>
          </div>
        </div>
        {/* Display section */}
        <div className="flex flex-wrap mt-4">
          {inboundLists.map((item, index) => (
            <div key={index} className="flex flex-wrap mt-4">
              <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                {index === 0 ? (
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor={`inboundLists-${index}-skuNo`}
                  >
                    SKU
                  </label>
                ) : (
                  <></>
                )}
                <span
                  className={
                    errors[`inboundLists-${index}-skuNo`] ? "text-red-600" : ""
                  }
                >
                  {errors[`inboundLists-${index}-skuNo`]?.message
                    ? "SKU Not match"
                    : ""}
                </span>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id={`inboundLists-${index}-skuNo`}
                  type="text"
                  placeholder="X"
                  {...register(`inboundLists-${index}-skuNo`)}
                  onChange={(e) => onSkuChangeInList(e, index, item)}
                  disabled={item.suggestedPlace}
                />
              </div>
              <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                {index === 0 ? (
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="quantity"
                  >
                    Quantity
                  </label>
                ) : (
                  <></>
                )}
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="quantity"
                  type="number"
                  placeholder="0"
                  value={item.quantity}
                  disabled
                />
              </div>
              <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                {index === 0 ? (
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="suggestedSpace"
                  >
                    Suggested Space
                  </label>
                ) : (
                  <></>
                )}
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="suggestedSpace"
                  type="text"
                  placeholder="X"
                  value={item.suggestedPlace}
                  disabled={!!item.suggestedPlace}
                  onChange={() => void 0}
                />
              </div>
              {!!item.suggestedPlace ? (
                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                  <div
                    className={`bg-white w-full ${index === 0 ? "p-4" : "m-2"}`}
                  ></div>
                  <button
                    type="button"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                    className="inline-block px-6 py-2 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                    onClick={() => submitRackOccupyAPI(item.suggestedPlace)}
                  >
                    Done
                  </button>
                </div>
              ) : (
                <></>
              )}
            </div>
          ))}
        </div>
      </form>
    </section>
  );
}

Inbound.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Sidebar />
      {page}
    </Layout>
  );
};
