import { DateTime } from "luxon";

export function downloadDocument(url) {
  const link = document.createElement('a');

  link.href = url;

  link.setAttribute('download', '');

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
}


export function convertDateFormat(dateString) {
  const date = DateTime.fromJSDate(new Date(dateString));
  return date.toFormat('yyyy-MM-dd');
}