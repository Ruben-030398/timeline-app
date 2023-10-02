import { array, object, string } from "yup";

export default object({
  events: array()
    .of(
      object().shape({
        event: string().required('Event should not be empty'),
        color: string().required()
      })
    ).min(1, 'Timeline should have at least one event').required()
}) 
