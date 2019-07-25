import Axios from 'axios';
// Development URL
// const baseURL = `http://localhost:3001/`;
// Deployment URL
const baseURL = `/api/persons`;

const getAll = () => {
    return Axios.get(`${baseURL}`)
    .then(res => res.data)
}

const getOne = id => {
    return Axios.get(`${baseURL}/${id}`)
    .then(res => res.data)
}

const update = (id, newPerson) => {
    return Axios.put(`${baseURL}/${id}`, newPerson)
    .then(res => res.data)
}

const create = newPerson => {
    return Axios.post(`${baseURL}/`, newPerson)
    .then(res => res.data)
}

// TODO: Axios destroy function returns no data, so that return is a bad idea
const destroy = id => {
    return Axios.delete(`${baseURL}/${id}`)
    .then(res => res.data)
}

export default { getAll, getOne, update, create, destroy }
