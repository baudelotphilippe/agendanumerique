import styles from "@/styles/Home.module.css";
import { Lexend_Mega } from "@next/font/google";
import Link from "next/link";

const lexend = Lexend_Mega({
  weight: "400",
  subsets: ["latin"],
});

const Layout = ({ children }) => {
  return (
    <main className={`${styles.main} container`}>
      <h1 className={`${styles.h1} ${lexend.className} text-center`}>
        <Link href="/">Agenda du numérique<br/>à Poitiers et ses environs</Link>
      </h1>
      {children}
    </main>
  );
};

export default Layout;
