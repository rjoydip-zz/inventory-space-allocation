
import Layout from "../components/Layout";
import Sidebar from "../components/Sidebar";

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
      <Sidebar />
      {page}
    </Layout>
  );
};
