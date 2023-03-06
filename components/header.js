
import Head from "next/head";

const Header = ({title, datas}) => {
  return (
    <Head>
    <title>{title}</title>
    <meta name="description" content=""/>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="/favicon.ico" />
    <script type="application/ld+json">
      {datas} 
      </script>
  </Head>
  )
}

export default Header