import styles from "@/styles/Home.module.css";
import Hometable from "../components/hometable";
import Header from "../components/header";
import Layout from "../components/layout";


export default function Home() {
  return (
    <>
      <Header title="Agenda du numérique poitevin" datas=""/>
      <Layout>
        <Hometable />
      </Layout>
    </>
  );
}

