import { object, string } from "yup";

export default object({
  eventName: string().required('please add event name'),
});