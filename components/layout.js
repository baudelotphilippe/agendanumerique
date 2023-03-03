import styles from "@/styles/Home.module.css";
import { Nabla } from "@next/font/google";
import Link from "next/link";

const nabla = Nabla({
  weight: "400",
  subsets: ["latin"],
});

const Layout = ({ children }) => {
  return (
    <main className={`${styles.main} container`}>
      <h1 className={`${styles.h1} ${nabla.className}`}>
        <Link href="/">Agenda du numérique</Link>
      </h1>
      {children}
    </main>
  );
};

export default Layout;
