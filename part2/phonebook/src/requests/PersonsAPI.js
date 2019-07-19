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

// Axios destroy function returns no data, so that return is a bad idea
// This points to a more general problem in designing a wrapper around AJAX libraries
// Which I'm not knowledgeable enough to solve at this time - L.A.
const destroy = id => {
    return Axios.delete(`${baseURL}persons/${id}`)
    .then(res => res.data)
}

export default { getAll, getOne, update, create, destroy }
