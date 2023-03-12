import { useRouter } from "next/router";
import useSWR from "swr";
import * as cheerio from "cheerio";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faCalendarDays,
  faClock, faArrowUpRightFromSquare
} from "@fortawesome/free-solid-svg-icons";
import Header from "../../../components/header";
import Layout from "../../../components/layout";
import utilsDates from "../../../scripts/utils/convertDates";
import Link from "next/link";

const Post = () => {
  const router = useRouter();
  const { slug, categorie } = router.query;

  const fetcher = (url) => fetch(url).then((res) => res.json());
// console.log(router.query, slug, categorie)
  const { data, error } = useSWR(`../../api/staticevent?slug=${slug}&categorie=${categorie}`, fetcher);
  //Handle the error state
  if (error) return <div>Failed to load</div>;
  //Handle the loading state
  if (!data) return <div>Loading...</div>;

  const $ = cheerio.load(data);
  const jsonRaw = $("script[type='application/ld+json']")[0].children[0].data;
  const event = JSON.parse(jsonRaw);
  // console.log(event);

 

  const eventStartDate = event.startDate ? utilsDates.formatDate(event.startDate) : null;
  const eventEndDate = event.endDate ? utilsDates.formatDate(event.endDate) : null;

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

                {eventStartDate && (
                  <>
                    <tr>
                      <td>
                        <FontAwesomeIcon icon={faCalendarDays} />
                      </td>
                      <td> {eventStartDate.jour}</td>
                      <td>
                        <FontAwesomeIcon icon={faClock} />
                      </td>
                      <td>{eventStartDate.heure}</td>
                    </tr>
                  </>
                )}
                {eventEndDate && (
                  <>
                    <tr>
                      <td>
                        <FontAwesomeIcon icon={faCalendarDays} />
                      </td>
                      <td> {eventEndDate.jour}</td>
 
                      <td>
                        <FontAwesomeIcon icon={faClock} />
                      </td>
                      <td>{eventEndDate.heure}</td>
                    </tr>
                  </>
                )}
                <tr>
                  <td>
                  <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                  <Link href={event.url}>{event.url}</Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        </Layout>
    </>
  );
};

export default Post;
