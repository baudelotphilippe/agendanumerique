import { useRouter } from "next/router";
import useSWR from "swr";
import * as cheerio from "cheerio";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faCalendarDays,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import Header from "../../components/header";
import Layout from "../../components/layout";
import formatDate from "../../utils/convertDates";

const Post = () => {
  const router = useRouter();
  const { pid } = router.query;
  const fetcher = (url) => fetch(url).then((res) => res.json());

  const { data, error } = useSWR(`../api/staticevent?slug=${pid}`, fetcher);
  //Handle the error state
  if (error) return <div>Failed to load</div>;
  //Handle the loading state
  if (!data) return <div>Loading...</div>;

  const $ = cheerio.load(data);
  const jsonRaw = $("script[type='application/ld+json']")[0].children[0].data;
  const event = JSON.parse(jsonRaw);
  // console.log(event);

 

  const reformatDate = event.startDate ? formatDate(event.startDate) : null;

  // console.log(reformatDate)
  return (
    <>
      <Header title={event.name} datas={jsonRaw}/>
      <Layout>
        <div className="row">
          <div className="col-12">
            <h2 className={styles.h2}>{event.name}</h2>
            <p>{event.description}</p>
            <div className="col-4">
              <Image src={event.image} alt={event.name} fill className="img-fluid remove-position" />
            </div>
            <table>
              <tbody>
                {event.location && (
                  <tr>
                    <td>
                      <FontAwesomeIcon icon={faLocationDot} />
                    </td>
                    <td>
                      {event.location.name}<br/>
                      {event.location.address.streetAddress} -{" "}
                      {event.location.address.addressLocality}
                    </td>
                  </tr>
                )}

                {reformatDate && (
                  <>
                    <tr>
                      <td>
                        <FontAwesomeIcon icon={faCalendarDays} />
                      </td>
                      <td> {reformatDate.jour}</td>
                    </tr>
                    <tr>
                      <td>
                        <FontAwesomeIcon icon={faClock} />
                      </td>
                      <td>{reformatDate.heure}</td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
        </Layout>
    </>
  );
};

export default Post;
