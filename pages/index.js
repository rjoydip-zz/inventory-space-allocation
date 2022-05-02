import Layout from "../components/Layout";
import Sidebar from "../components/Sidebar";
export default function Index() {
  return (
    <section>
      <h2>Inventory Space Allocation (Dashboard)</h2>      
    </section>
  );
}

Index.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Sidebar />
      {page}
    </Layout>
  );
};
