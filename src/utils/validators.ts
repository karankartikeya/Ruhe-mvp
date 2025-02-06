import { formatDistanceToNow } from "date-fns";

const isValidPhoneNumber = (phone: string) => {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return phoneRegex.test(phone);
  };

export { isValidPhoneNumber };


export const isValidEmail = (email: string) => {
    const emailRegex = /^(?!.*\.{2})[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }


 export const getTimeDifference = (date: string) => {
    const postDate = new Date(date);
    return formatDistanceToNow(postDate, { addSuffix: true });
  };