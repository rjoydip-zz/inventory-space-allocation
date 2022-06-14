import Layout from "../components/Layout";

export default function Index() {
  return (
    <section>
      <div>Inventory Space Allocation (Dashboard)</div>
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
