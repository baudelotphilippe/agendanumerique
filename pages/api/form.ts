import type { NextApiRequest, NextApiResponse } from 'next'
import {emptyEvent} from '../../scripts/utils/emptyEvent'
import {saveFile} from '../../scripts/utils/file'

type ResponseData = {
  data: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  
  const infosFilename={workingFolder:"manuel", i:false, uniqueId:true}

  const body = req.body
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
  saveFile(infosFilename, event);
  res.json({ data: `${event}` })
}