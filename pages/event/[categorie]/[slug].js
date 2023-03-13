import { useRouter } from "next/router";
import useSWR from "swr";
import * as cheerio from "cheerio";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faCalendarDays,
  faClipboard,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import styles from "@/styles/Home.module.css";
import Header from "../../../components/header";
import Layout from "../../../components/layout";
import utilsDates from "../../../scripts/utils/convertDates";
import Link from "next/link";

const Post = () => {
  const router = useRouter();
  const { slug, categorie } = router.query;

  const fetcher = (url) => fetch(url).then((res) => res.json());
  // console.log(router.query, slug, categorie)
  const { data, error } = useSWR(
    `../../api/staticEvent?slug=${slug}&categorie=${categorie}`,
    fetcher
  );
  //Handle the error state
  if (error) return <div>Failed to load</div>;
  //Handle the loading state
  if (!data) return <div>Loading...</div>;

  const $ = cheerio.load(data);
  const jsonRaw = $("script[type='application/ld+json']")[0].children[0].data;
  const event = JSON.parse(jsonRaw);
  // console.log(event);

  const eventStartDate = event.startDate
    ? utilsDates.formatDate(event.startDate)
    : null;
  const eventEndDate = event.endDate
    ? utilsDates.formatDate(event.endDate)
    : null;

  return (
    <>
      <Header title={event.name} datas={jsonRaw} />
      <Layout>
        <div className="row flex-column align-items-center justify-content-center">
          <div className="col-6">
            <Image
              src={event.image}
              alt={event.name}
              fill
              className="img-fluid remove-position"
            />
          </div>
          <div className="col-12 text-center">
            <h2 className={styles.h2}>{event.name}</h2>
          </div>
          <div className="col-12">
            <p className="css-fix">{event.description}</p>
          </div>

          {event.location && (
            <div>
              <FontAwesomeIcon className="me-2" icon={faLocationDot} />
              {event.location.name} - {event.location.address.streetAddress} -{" "}
              {event.location.address.addressLocality}
            </div>
          )}

          {eventStartDate && (
            <div>
              <FontAwesomeIcon className="me-2" icon={faCalendarDays} />
              {eventStartDate.jour} - {eventStartDate.heure}
              {event.subEvent &&
                  event.subEvent.map((subevent) => {
                    const heureSubEvent=(subevent.startDate.split("T")[1]).split("-");
                    return ` - ${heureSubEvent[0]}h${heureSubEvent[1]}`
                  })
                  }
            </div>
          )}
          {eventEndDate && (
            <div>
              <FontAwesomeIcon className="me-2" icon={faCalendarDays} />
              {eventEndDate.jour} - {eventEndDate.heure}
              {event.subEvent &&
                  event.subEvent.map((subevent) => {
                    const heureSubEvent=(subevent.endDate.split("T")[1]).split("-");
                    return ` - ${heureSubEvent[0]}h${heureSubEvent[1]}`
                  })
                  }
            </div>
          )}

          <div>
            <FontAwesomeIcon className="me-2" icon={faArrowUpRightFromSquare} />
            <Link href={event.url}>{event.url}</Link>
          </div>
          <div>
          <FontAwesomeIcon className="me-2" icon={faClipboard} />{event.organizer}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Post;
