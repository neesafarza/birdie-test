const BASE_URL =
  "http://localhost:8000/events?careRecipientId=df50cac5-293c-490d-a06c-ee26796f850d";

export const getEvents = async (params) => {
  const url = `${BASE_URL}` + (params ? `/${params}` : "");
  const response = await fetch(url);
  const data = await response.json();

  console.log(data);
  return data;
};
