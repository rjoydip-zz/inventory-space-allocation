import React from "react";
import useSWR from "swr";
import Link from "next/link";

import Layout from "../components/Layout";
import { fetcher } from "../utils";

export default function Dashboard() {
  const { data: skuGetCount, error: skuGetCountError } = useSWR(
    "/api/sku/get-count",
    fetcher,
  );
  const { data: rackGetCount, error: rackGetCountError } = useSWR(
    "/api/rack/get-count",
    fetcher,
  );
  const { data: rackGetOccupiedCount, error: rackGetOccupiedCountError } =
    useSWR(
      "/api/rack/get-occupied-count",
      fetcher,
    );

  return (
    <Layout>
      <div className="py-10 bg-purple-200 rounded-2xl">
        {skuGetCountError || rackGetCountError || rackGetOccupiedCountError
          ? <>An error has occurred.</>
          : <></>}
        {!skuGetCount || !rackGetCount || !rackGetOccupiedCount
          ? (<>Loading ...</>)
          : (
            <>
              <div className="flex justify-center mt-10">
                {/* Racks details */}
                <div
                  className="p-4 max-w-sm bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700"
                >
                  <h5
                    className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400"
                  >
                    Racks
                  </h5>
                  <div
                    className="flex items-baseline text-gray-900 dark:text-white"
                  >
                    <span className="text-5xl font-extrabold tracking-tight">
                      {rackGetCount.count}
                    </span>
                  </div>
                  <div className="p-2"></div>
                  <button
                    type="button"
                    className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
                  >
                    <Link href="/rack">Racks Component</Link>
                  </button>
                </div>

                <div className="p-2"></div>

                {/* Skus details */}
                <div
                  className="p-4 max-w-sm bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700"
                >
                  <h5
                    className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400"
                  >
                    SKUs
                  </h5>
                  <div
                    className="flex items-baseline text-gray-900 dark:text-white"
                  >
                    <span className="text-5xl font-extrabold tracking-tight">
                      {skuGetCount.count}
                    </span>
                  </div>
                  <div className="p-2"></div>
                  <button
                    type="button"
                    className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
                  >
                    <Link href="/sku">SKU Component</Link>
                  </button>
                </div>
              </div>
              <div className="flex justify-center mt-10">
                <div
                  className="p-4 max-w-sm bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700"
                >
                  <h5
                    className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400"
                  >
                    Racks Occupied
                  </h5>
                  <div
                    className="flex items-baseline text-gray-900 dark:text-white justify-center"
                  >
                    <svg
                      className="flex-shrink-0 w-5 h-5 text-blue-600 dark:text-blue-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      >
                      </path>
                    </svg>
                    <span
                      className="ml-2 text-5xl font-extrabold tracking-tight"
                    >
                      {rackGetOccupiedCount.count}
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}
      </div>
    </Layout>
  );
}
