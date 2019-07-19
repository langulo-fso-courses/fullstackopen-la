import Axios from "axios";
// CRUD functions for the country API

const baseURL = "https://restcountries.eu/rest/v2/";

const getAll = () => {
  return Axios.get(`${baseURL}all`).then(res => res.data);
};

const getOne = id => {
  return Axios.get(`${baseURL}${id}`).then(res => res.data);
};

// const create = () => {}

// const update = () => {}

// const destroy = () => {}

export default { getAll, getOne };
