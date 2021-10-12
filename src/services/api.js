import axios from 'axios';
// Base URL > https://sujeitoprogramador.com
//r-api/?api=filmes/id (todos os filmes) paramentro da id para pegar cada um

const api = axios.create({
  baseURL: 'https://sujeitoprogramador.com'
});
export default api;