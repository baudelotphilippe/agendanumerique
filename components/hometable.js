import useSWR from "swr";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faCalendarDays,
  faClock,
  faClipboard,
} from "@fortawesome/free-solid-svg-icons";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Hometable() {
  const { data, error } = useSWR("/api/globalEvents", fetcher);

  //Handle the error state
  if (error) return <div>Failed to load</div>;
  //Handle the loading state
  if (!data) return <div>Loading...</div>;
  data.sort((a, b) => {
    return (
      //tmp reformater heur pur tester le sort ...
    // console.log( a.startDate)
      new Date(a.startDate) - new Date(b.startDate)
    );
  });
    // console.log(data)

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
              <div></div>
              <h5 className="card-title">
                <Link className="stretched-link" href={`event/${event.slug}`}>
                  {event.name}
                </Link>
              </h5>
              <h6 className="card-subtitle mb-2 text-muted">
                {event.startDateFormat.jour} - {event.startDateFormat.heure} 
                {event.subEvent &&
                  event.subEvent.map((subevent) => {
                    const heureSubEvent=(subevent.startDate.split("T")[1]).split("-");
                    return ` - ${heureSubEvent[0]}h${heureSubEvent[1]}`
                  })
                  }
              </h6>
              <p className="card-text">{event.description}</p>
            </div>
            <div className="card-footer text-muted">
              <div>
                <FontAwesomeIcon icon={faLocationDot} /> {event.location.name}
              </div>
              <FontAwesomeIcon className="me-2" icon={faClipboard} />
              {event.organizer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
