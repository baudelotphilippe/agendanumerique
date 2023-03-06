
import Head from "next/head";

const Header = ({title, datas}) => {
  console.log({datas})
  return (
    <Head>
    <title>{title}</title>
    <meta name="description" content=""/>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="/favicon.ico" />
    {datas}
  </Head>
  )
}

export default Header