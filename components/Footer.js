import styles from "@/styles/Home.module.css";
import Link from "next/link";
import { useEffect,useState } from "react";

const Footer = () => {
    const [dateMaj, setDateMaj] = useState()

    useEffect(() => {
        async function fetchData() {
          const res = await fetch('/dateMAJ.json');
          const data = await res.json();
          setDateMaj(data);
        }
        fetchData();
      }, []);

return (
    <footer className={`${styles.footer} container p-3 my-4 text-center`}>
         Dernière mise à jour :{' '}
         {dateMaj ? `${dateMaj.jour} à ${dateMaj.heure}` : 'Chargement...'} | 
         <Link href="/projet"> Le projet</Link> | <a href="https://github.com/baudelotphilippe/agendanumerique" target="_blank" rel="noreferrer">Github</a> | Made with <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 100 93.4"><g><g id="Layer_1" data-name="Layer 1"><path fill="#fff" d="M26.7,13.3H20V20H13.3V33.4H20V26.7h6.7V20h6.7V13.3Z"/><path fill="#b20909" d="M86.7,13.3V6.7H60v6.7H53.3v6.7H46.6V13.4H40V6.7H13.3v6.7H6.7V46.7h6.7v6.7H20v6.7h6.7v6.6h6.7v6.7H40v6.7h6.7v6.6h6.7V80H60V73.3h6.7V66.7h6.7V60H80V53.3h6.7V46.7h6.7V13.3ZM13.3,26.7V20H20V13.3H33.3V20H26.6v6.7H20v6.7H13.3Z"/><path d="M33.3,0h-20V6.7H40V0Z"/><path d="M13.3,6.7H6.7v6.7h6.7V6.7Z"/><path d="M46.7,6.7H40v6.7h6.7Z"/><path d="M60,6.7H53.3v6.7H60Z"/><path d="M0,20V45.6H6.7V13.3H0Z"/><path d="M53.3,13.3H46.6V20h6.7Z"/><path d="M13.3,46.7H6.7v6.7h6.7V46.7Z"/><path d="M20,53.4H13.3v6.7H20Z"/><path d="M26.7,60H20v6.7h6.7Z"/><path d="M33.3,66.7H26.6v6.7h6.7Z"/><path d="M80,0H60V6.7H86.7V0Z"/><path d="M93.3,6.7H86.6v6.7h6.7Z"/><path d="M93.3,13.3V46.7H100V13.3Z"/><path d="M93.3,46.7H86.6v6.7h6.7Z"/><path d="M80,60H73.3v6.7H80Z"/><path d="M86.7,53.4H80v6.7h6.7Z"/><path d="M73.3,66.7H66.6v6.7h6.7Z"/><path d="M40,73.4H33.3v6.7H40Z"/><path d="M46.7,80.1H40v6.6h6.7Z"/><path d="M60,80.1H53.3v6.6H60Z"/><path d="M53.3,86.7H46.6v6.7h6.7Z"/><path d="M66.7,73.4H60v6.7h6.7Z"/></g></g></svg> in Poitiers by <a href="https://www.baudelot.eu/" target="_blank" rel="noreferrer">Baudelot Philippe</a>
        | <a href="/feed.xml" target="_blank" rel="noreferrer">RSS</a>
    </footer>
)
}

export default Footer;