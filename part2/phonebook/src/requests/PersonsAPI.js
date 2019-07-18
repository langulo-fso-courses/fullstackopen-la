import Axios from 'axios';
const baseURL = `http://localhost:3001/`

// An API
const getAll = () => {
    return Axios.get(`${baseURL}persons`)
    .then(res => res.data)
}

const getOne = id => {
    return Axios.get(`${baseURL}persons/${id}`)
    .then(res => res.data)
}

const update = (id, newPerson) => {
    return Axios.put(`${baseURL}persons/${id}`, newPerson)
    .then(res => res.data)
}

const create = newPerson => {
    return Axios.post(`${baseURL}persons/`, newPerson)
    .then(res => res.data)
}

const destroy = id => {
    return Axios.delete(`${baseURL}persons/${id}`)
    .then(res => res.data)
}

export default { getAll, getOne, update, create, destroy }
