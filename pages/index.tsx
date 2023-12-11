import Hometable from "../components/HomeTable";
import Header from "../components/Header";
import Layout from "../components/Layout";
import Footer from "../components/Footer";


export default function Home() {
  return (
    <>
      <Header title="Agenda du numérique poitevin" datas=""/>
      <Layout>
        <Hometable />
      </Layout>
      <Footer/>
    </>
  );
}

