module.exports = (language, url) => {
  const parsedUrl = new URL(url);
  parsedUrl.searchParams.set("lng", language);
  return parsedUrl.pathname + parsedUrl.search;
};
