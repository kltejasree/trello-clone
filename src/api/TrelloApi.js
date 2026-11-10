import axios from "axios";

const TrelloApi = axios.create({
  baseURL: 'https://api.trello.com/1',
  params: {
    key: import.meta.env.VITE_TRELLO_API_KEY,
    token: import.meta.env.VITE_TRELLO_TOKEN,
  }
});

export default TrelloApi;


