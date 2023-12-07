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
              <span className="me-1">
              <svg
                      width="24"
                      height="24"
                      viewBox="0 0 96 96"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="18"
                        y="18"
                        width="68"
                        height="68"
                        fill="black"
                        stroke="black"
                        stroke-width="4"
                        stroke-linejoin="round"
                      />
                      <rect
                        x="10"
                        y="10"
                        width="68"
                        height="68"
                        fill="#FFB443"
                        stroke="black"
                        stroke-width="4"
                        stroke-linejoin="round"
                      />
                      <path d="M64 48H40V20" stroke="black" stroke-width="8" />
                    </svg>
                </span>
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
                  <div>
                  <span className="me-1">
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 96 96"
                    >
                      <rect
                        x="18"
                        y="18"
                        width="68"
                        height="68"
                        fill="black"
                        stroke="black"
                        stroke-width="4"
                        stroke-linejoin="round"
                      />
                      <rect
                        x="10"
                        y="10"
                        c
                        width="68"
                        height="68"
                        fill="#39DBFF"
                        stroke="black"
                        stroke-width="4"
                        stroke-linejoin="round"
                      />
                      <g transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)">
                        <path
                          d="M437.7,12639.4c-25.6-1.9-50.6-9.3-71.7-21.3c-38.6-21.9-67.7-58.9-78.9-100.5c-2.5-9-4-17.4-5.2-27.9
		c-0.7-6.3-0.7-26.7,0-32.8c2.6-22.7,9-42.1,21.1-63.9c18.8-34.1,21.5-38.5,46.7-77.1c16.8-25.8,26.1-40.7,34.9-56.1
		c29.7-51.8,48.9-100.9,60.2-153.7l1.7-7.7h4.7h4.7l2,9.6c11.9,57.1,32.6,107.4,68.8,167.3c7.2,11.9,14,22.7,27.8,43.7
		c19.3,29.6,27.2,42.3,34.3,55.2c5.6,10.4,18.7,37.2,21.2,43.6c15.7,39.9,13.2,89.1-6.6,128.6c-16.7,33.4-43.7,60.1-76.4,75.9
		C499.5,12635.4,467.3,12641.7,437.7,12639.4z"
                        />
                      </g>
                    </svg>
                    </span>
                    <span>
                    {event.location.name}
                  </span>
                  </div>
                )}
              </div>
              <div>
                {event.organizer && (
                  <div>
                    <span className="me-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="24"
                        height="24"
                        viewBox="0 0 96 96"
                      >
                        <rect
                          x="18"
                          y="18"
                          class="st0"
                          width="68"
                          height="68"
                          stroke="black"
                          stroke-width="4"
                          stroke-linejoin="round"
                        />
                        <rect
                          x="10"
                          y="10"
                          class="st1"
                          width="68"
                          height="68"
                          fill="#FF5E5E"
                          stroke="black"
                          stroke-width="4"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M44.1,46.2c7.1,0,12.8-5.7,12.8-12.8s-5.7-12.8-12.8-12.8c-7,0-12.8,5.7-12.8,12.8C31.3,40.5,37,46.2,44.1,46.2z M44.2,47.8
	c-21.2-0.3-20,19.6-20,19.6h39.6C63.8,67.4,64.1,48.1,44.2,47.8z"
                        />
                      </svg>
                    </span>
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
