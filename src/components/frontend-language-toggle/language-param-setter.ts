export default function addLanguageParam(language: string, url: string) {
  const parsedUrl = new URL(url);
  parsedUrl.searchParams.set("lng", language);
  return parsedUrl.pathname + parsedUrl.search;
};
