export default async function chamarApi(url) {
  const request = await fetch(url);
  const requestJson = request.json();
  return requestJson;
}
