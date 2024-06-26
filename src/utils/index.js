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


export function scrollTop() {
  const element = document.getElementById('header');
  
  if (element) {
    element.scrollIntoView({ block: 'end' });
  } 
    
  let body = document.querySelector('body')
  let html = document.querySelector('html')

  body.scrollTop = 0
  html.scrollTop = 0

  body.scrollIntoView({ block: 'end' })
  html.scrollIntoView({ block: 'end' })

  document.documentElement.scrollTop = 0
  
  window.scrollTo(0, 0);
}

export function blobToFile(blob, fileName, fileType) {
  // El tipo de archivo es opcional. Si no se proporciona, se usa el tipo del blob.
  fileType = fileType || blob.type;
  fileName = fileName || 'image'
  // Crear un nuevo File a partir del Blob
  const file = new File([blob], fileName, {
      type: fileType,
      lastModified: Date.now()
  });

  return file;
}