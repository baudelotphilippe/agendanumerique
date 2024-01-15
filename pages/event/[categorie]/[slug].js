import { useRouter } from "next/router";
import useSWR from "swr";
import Image from "next/image";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import CustomIcons from "@/components/CustomIcons";

import styles from "@/styles/Home.module.css";
import Header from "../../../components/Header";
import Layout from "../../../components/Layout";
import Footer from "../../../components/Footer"
import {formatDate} from "../../../scripts/utils/convertDates";
import Link from "next/link";

const Post = () => {
  const router = useRouter();
  const { slug, categorie } = router.query;

  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR(
    `../../api/staticEvent?slug=${slug}&categorie=${categorie}`,
    fetcher
  );

  // console.log(error)
  //Handle the error state
  if (error)
    return (
      <>
        <Header title="Chargement impossible" datas="" />
        <Layout>
          <div>Chargement impossible. Erreur : {error.message}</div>
        </Layout>
      </>
    );
  //Handle the loading state
  if (!data)
    return (
      <>
        <Header title="Chargement en cours" datas="" />
        <Layout>
          <div>Chargement en cours ...</div>
        </Layout>
      </>
    );

  const event = JSON.parse(data);
  // console.log(event);

  const eventStartDate = event.startDate
    ? formatDate(event.startDate)
    : null;
  const eventEndDate = event.endDate
    ? formatDate(event.endDate)
    : null;

  return (
    <>
      <Header title={event.name} datas={data} />
      <Layout>
        <div className="d-flex flex-column align-items-center justify-content-center">
          <div className={`${styles.card_bg} col-12 col-md-6`}>
            {event.image && (
              <div>
                <Image
                  src={event.image}
                  alt={event.name}
                  fill
                  className="img-fluid remove-position"
                />
              </div>
            )}
            <div className="">
              <div className="col-12 p-3 text-center">
                <h2 className={styles.h2}>{event.name}</h2>
                <p
                  className="css-fix"
                  dangerouslySetInnerHTML={{ __html: event.description }}
                ></p>
              </div>
              <div
                className="col-12 p-3"
                style={{ borderTop: "1px solid black" }}
              >
                {eventStartDate && (
                  <div>
                    <CustomIcons type="hours" className="me-1" size="36" />

                    <span className="ms-2">
                      {eventStartDate.jour} - {eventStartDate.heure}
                      {event.subEvent &&
                        event.subEvent.map((subevent) => {
                          const heureSubEvent = subevent.startDate
                            .split("T")[1]
                            .split(":");
                          return ` - ${heureSubEvent[0]}h${heureSubEvent[1]}`;
                        })}
                    </span>
                  </div>
                )}
                {eventEndDate && (
                  <div>
                    <CustomIcons type="hours" className="me-1" size="36" />

                    <span className="ms-2">
                      {eventEndDate.jour} - {eventEndDate.heure}
                      {event.subEvent &&
                        event.subEvent.map((subevent) => {
                          const heureSubEvent = subevent.endDate
                            .split("T")[1]
                            .split(":");
                          return ` - ${heureSubEvent[0]}h${heureSubEvent[1]}`;
                        })}
                    </span>
                  </div>
                )}
                {event.location && (
                  <div>
                    <CustomIcons type="location" className="me-1" size="36" />

                    <span className="ms-2">
                      {event.location.name}  
                      {event.location.address.streetAddress!="" && (<span> - {event.location.address.streetAddress}</span>)}
                      {event.location.address.addressLocality!="" && (<span> - {event.location.address.addressLocality}</span>)}

                    </span>
                  </div>
                )}

                <div>
                  <CustomIcons type="orga" className="me-1" size="36" />

                  <span className="ms-2">{event.organizer}</span>
                </div>
                <div>
                  <CustomIcons type="link" className="me-1" size="36" />

                  <span className="ms-2">
                    <Link href={event.url}>{event.url}</Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
      <Footer/>

    </>
  );
};

export default Post;
