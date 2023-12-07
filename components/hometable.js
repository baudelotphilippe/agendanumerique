import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import styles from "@/styles/Home.module.css";

config.autoAddCss = false;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faCalendarDays,
  faClock,
  faClipboard,
} from "@fortawesome/free-solid-svg-icons";

export default function Hometable() {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR("/api/globalEvents", fetcher);

  //Handle the error state
  if (error)
    return (
      <div>Désolé, le fichier des événements n&apos;est pas accessible</div>
    );
  //Handle the loading state
  if (!data) return <div>Chargement en cours ...</div>;
  data.sort((a, b) => {
    return new Date(a.startDate) - new Date(b.startDate);
  });

  return (
    <div className="row justify-content-around">
      {data.map((event, index) => (
        <div className="col-3 m-3" key={index}>
          <div className={`${styles.card_bg} card`}>
            {event.image && (
              <Image
                src={event.image}
                alt={event.name}
                width="200"
                height="100"
                className="card-img-top"
                style={{ height: "auto" }}
              />
            )}
            <div className="card-body p-3">
              <h5 className="card-title text-center">
                <Link className="stretched-link" href={`event/${event.slug}`}>
                  {event.name}
                </Link>
              </h5>
              <p className="card-text">{event.description}</p>
            </div>
            <div className={`${styles.card_footer} card-footer p-2`}>
              <div>
                <FontAwesomeIcon className="me-1" icon={faCalendarDays} />
                {event.startDateFormat.jour} - {event.startDateFormat.heure}
                {event.subEvent &&
                  event.subEvent.map((subevent) => {
                    const heureSubEvent = subevent.startDate
                      .split("T")[1]
                      .split(":");
                    return ` - ${heureSubEvent[0]}h${heureSubEvent[1]}`;
                  })}
              </div>
              <div>
                {event.location.name && (
                  <span>
                    <FontAwesomeIcon
                      className="me-1"
                      icon={faLocationDot}
                      alt="localisation"
                    />{" "}
                    {event.location.name}
                  </span>
                )}
              </div>
              <div>
                {event.organizer && (
                  <span>
                    <FontAwesomeIcon
                      className="me-1"
                      alt="source"
                      icon={faClipboard}
                    />
                    {event.organizer}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
