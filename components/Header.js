import Head from "next/head";

const Header = ({ title, datas }) => {
  return (
    <Head>
      <title>{title} - Agenda numérique Poitiers</title>
      <meta name="description" content="Agenda du numéroque sur Poitiers" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      <link rel="alternate" type="application/atom+xml" href="/atom.xml" />
      <link rel="alternate" type="application/json" href="/feed.json" />
      <link rel="manifest" href="/site.webmanifest"></link>
      <script type="application/ld+json">{datas}</script>
    </Head>
  );
};

export default Header;
