import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
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
    return <div>Désolé, le fichier des événements n'est pas accessible</div>;
  //Handle the loading state
  if (!data) return <div>Chargement en cours ...</div>;
  data.sort((a, b) => {
    return new Date(a.startDate) - new Date(b.startDate);
  });

  return (
    <div className="row justify-content-around">
      {data.map((event, index) => (
        <div className="col-3 m-3" key={index}>
          <div className="card bg-dark">
            <Image
              src={event.image}
              alt={event.name}
              width="200"
              height="100"
              className="card-img-top"
              style={{ height: "auto" }}
            />
            <div className="card-body">
              <h5 className="card-title">
                <Link className="stretched-link" href={`event/${event.slug}`}>
                  {event.name}
                </Link>
              </h5>
              <h6 className="card-subtitle mb-2 text-muted">
                {event.startDateFormat.jour} - {event.startDateFormat.heure}
                {event.subEvent &&
                  event.subEvent.map((subevent) => {
                    const heureSubEvent = subevent.startDate
                      .split("T")[1]
                      .split(":");
                    return ` - ${heureSubEvent[0]}h${heureSubEvent[1]}`;
                  })}
              </h6>
              <p className="card-text">{event.description}</p>
            </div>
            <div className="card-footer text-muted">
              <div>
                {event.location.name && (
                  <span>
                    <FontAwesomeIcon icon={faLocationDot} alt="localisation" />{" "}
                    {event.location.name}
                  </span>
                )}
              </div>
              <div>
              {event.organizer && (
                <span>
                  <FontAwesomeIcon
                    className="me-2"
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
