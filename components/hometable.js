import useSWR from "swr";
import styles from "@/styles/Home.module.css";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Hometable() {
  const { data, error } = useSWR("/api/staticdata", fetcher);

  //Handle the error state
  if (error) return <div>Failed to load</div>;
  //Handle the loading state
  if (!data) return <div>Loading...</div>;
  // console.log(datas)
  return (
    <>
      <table className={styles.events}>
        <thead className={styles.thead}>
          <tr>
            <th>Date</th>
            <th>Organisé par</th>
            <th>Nom de l&apos;événement</th>
            <th>Lieu</th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {data.map((info) => (
            <tr>
              <td>{info.startDate}</td>
              <td>{info.organizer}</td>
              <td>{info.name}</td>
              <td>
                {info.location.streetAddress} - {info.location.addressLocality}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
