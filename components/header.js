import Head from "next/head";

const Header = ({ title, datas }) => {
  return (
    <Head>
      <title>{title} - Agenda numérique Poitiers</title>
      <meta name="description" content="Agenda du numéroque sur Poitiers" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
      <script type="application/ld+json">{datas}</script>
    </Head>
  );
};

export default Header;
