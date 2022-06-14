import Link from "next/link";
import Layout from "../components/Layout";

export default function Index() {
  const navigation = [
    {
      href: "/dashboard",
      title: "Dashboard",
      description:
        "Dashboard Contains all the items details of Inbound, Racks, SKU's.",
    },
    {
      href: "/rack",
      title: "Rack",
      description:
        "Rack component have ablity to add, delete and edit racks items details",
    },
    {
      href: "/sku",
      title: "SKU",
      description:
        "SKU component have ablity to add, delete and edit racks items details",
    },
    {
      href: "/inbound",
      title: "Inbound",
      description:
        "Inbound component is takes racks and skus information and calculate the suggested racks while user adds entery on inbound lists",
    },
  ];

  return (
    <section>
      <div className="py-10 bg-purple-200 rounded-2xl">
        <div className="mb-10 text-3xl text-center">
          Inventory Space Allocation Portal
        </div>
        <div className="container m-auto px-6 text-gray-500 md:px-12 xl:px-0">
          <div className="mx-auto grid gap-6 md:w-3/4 lg:w-full lg:grid-cols-3">
            {navigation.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-xl px-8 py-12 sm:px-12 lg:px-8"
              >
                <div className="mb-12 space-y-4">
                  <h3 className="text-2xl font-semibold text-purple-900">
                    {item.title}
                  </h3>
                  <p className="mb-6">
                    {item.description}
                  </p>
                  <Link
                    href={item.href}
                    passHref
                  >
                    <div
                      className="block font-medium text-purple-600"
                    >
                      Go to
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

Index.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};
