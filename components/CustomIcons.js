import React from "react";

const CustomIcons = ({ type, className, size }) => {
  let icon;
  switch (type) {
    case "hours":
      icon = (
        <svg
          width={size}
          height={size}
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
      );
      break;
    case "location":
      icon = (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
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
      );
      break;
      case "orga" :
        icon = (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width={size}
                        height={size}
                        viewBox="0 0 96 96"
                      >
                        <rect
                          x="18"
                          y="18"
                          width="68"
                          height="68"
                          stroke="black"
                          stroke-width="4"
                          stroke-linejoin="round"
                        />
                        <rect
                          x="10"
                          y="10"
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
        )
        break;
        case "link" :
          icon = (
            <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={size}
                    height={size}
                    viewBox="0 0 96 96"
                  >
                    <rect
                      x="18"
                      y="18"
                      width="68"
                      height="68"
                      stroke="black"
                      stroke-width="4"
                      stroke-linejoin="round"
                    />
                    <rect
                      x="10"
                      y="10"
                      width="68"
                      height="68"
                      fill="#00FF75"
                      stroke="black"
                      stroke-width="4"
                      stroke-linejoin="round"
                    />
                    <g>
                      <path
                        d="M20.3,16.8h13.1V26h-7.8v36h36.7v-7.4h9.1v16.6H16.6V16.8H20.3L20.3,16.8z M71.4,16.8H40.4L51,27.1l-15,15l9.5,9.5l15-15
		l11,10.8V16.8L71.4,16.8z"
                      />
                    </g>
                  </svg>
          )
          break;
    default:
      icon = null;
  }
  return <span className={className}>{icon}</span>;
};

export default CustomIcons;
