import Link from "next/link";
import Image from "next/image";
import useSWR from "swr";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import styles from "@/styles/Home.module.css";
import CustomIcons from "@/components/CustomIcons";

config.autoAddCss = false ;

export default function HomeTable() {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR("/api/globalEvents", fetcher);

  //Handle the error state
  if (error)
    return (
      <div>Désolé, le fichier des événements n&apos;est pas accessible</div>
    );
  //Handle the loading state
  if (!data) return <div>Chargement en cours ...</div>;
  data.sort((a, b) => a.startDate.localeCompare(b.startDate));

  return (
    <div className="row justify-content-around">
      {data.map((event, index) => (
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 m-3" key={index}>
          <div className={`${styles.card_bg} card`}>
            {event.image && (
              <Image
                src={event.image}
                alt={event.name}
                width="200"
                height="100"
                className="card-img-top"
                style={{ height: "auto" }}
                loading="lazy"
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
                <CustomIcons type="hours" className="me-1" size="24" />
                <span>
                  {event.startDateFormat.jour} - {event.startDateFormat.heure}
                  {event.subEvent &&
                    event.subEvent.map((subevent) => {
                      const heureSubEvent = subevent.startDate
                        .split("T")[1]
                        .split(":");
                      return ` - ${heureSubEvent[0]}h${heureSubEvent[1]}`;
                    })}
                </span>
              </div>
              <div>
                {event.location.name && (
                  <>
                    <CustomIcons type="location" className="me-1" size="24" />
                    <span>{event.location.name}</span>
                  </>
                )}
              </div>
              <div>
                {event.organizer && (
                  <div>
                    <CustomIcons type="orga" className="me-1" size="24" />
                    <span>{event.organizer}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
