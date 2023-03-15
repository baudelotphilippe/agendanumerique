import type { NextApiRequest, NextApiResponse } from 'next'
import emptyEvent from '../../scripts/utils/emptyEvent'
import utilsFile from '../../scripts/utils/file'

type ResponseData = {
  data: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const body = req.body
  const workingFolder="manuel"
  const event={...emptyEvent}
  event.name=body.name
  event.description= body.description
  event.startDate= body.startDate
  event.endDate= body.endDate
  event.image= body.image
  event.organizer= body.organizer
  event.url= body.url   
  event.location.name= body.locationName
  event.location.address.streetAddress= body.locationStreetAddress
  event.location.address.addressLocality= body.locationAddressLocality
//   console.log('body: ', body)
  utilsFile.saveFile(workingFolder, event);
  res.json({ data: `${event}` })
}


// const emptyEvent = {
//     "@context": "https://schema.org",
//     "@type": "Event",
//     name: "",
//     description: "",
//     startDate: "",
//     endDate: "",
//     location: {
//       "@type": "Place",
//       name: "",
//       address: {
//         "@type": "PostalAddress",
//         addressLocality: "",
//         streetAddress: "",
//       },
//     },
//     image: "",
//     organizer: "",
//     url: "",
//   }

// module.exports = emptyEvent;
