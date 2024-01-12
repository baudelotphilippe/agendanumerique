export const emptyEvent = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    location: {
      "@type": "Place",
      name: "",
      address: {
        "@type": "PostalAddress",
        addressLocality: "",
        streetAddress: "",
      },
    },
    image: "",
    organizer: "",
    url: "",
  }