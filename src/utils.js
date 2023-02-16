function capitalizeWords(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function getIdFromUrl(url) {
  const urlParts = url.split("/");
  return urlParts[urlParts.length - 2];
}

export { capitalizeWords, getIdFromUrl };
