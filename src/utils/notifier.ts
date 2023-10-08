import { addMessage } from "../features/notifier/notifierSlice";
export function notify(message: string, data?: any) {
  alert(message);
  console.info(message, data);
}

export function notifyError(message: string, data?: any) {
  alert(message);
  console.error(message, data);
}
