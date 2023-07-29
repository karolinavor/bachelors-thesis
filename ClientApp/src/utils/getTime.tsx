export function getLocalTime(date) {
  let formattedDate = new Date(date);
  return formattedDate.toLocaleTimeString("cz-CS",{ hour: '2-digit', minute: '2-digit' })
}

export function getLocalTimeWithSeconds(date) {
  let formattedDate = new Date(date);
  return formattedDate.toLocaleTimeString("cz-CS",{ hour: '2-digit', minute: '2-digit', second: '2-digit' })
}

export function getLocalDate(date) {
  let formattedDate = new Date(date);
  return formattedDate.toLocaleDateString().replaceAll("/", ".")
}

