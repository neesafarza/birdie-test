const BASE_URL = "http://localhost:8000/events";

export const getEvents = async (id, eventType, currentPage) => {
  let url = `${BASE_URL}?careRecipientId=${id}&eventType=${eventType}`;
  if (currentPage) {
    url = url + `&page=${currentPage}`;
  }

  const response = await fetch(url);
  const data = await response.json();

  return data;
};
