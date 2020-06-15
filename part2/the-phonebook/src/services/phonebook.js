import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

const get = () => {
	return axios.get(baseUrl);
};

const create = entry => {
	return axios.post(baseUrl, entry);
};

const remove = id => {
	return axios.delete(`${baseUrl}/${id}`);
};

const update = (id, entry) => {
	return axios.put(`${baseUrl}/${id}`, entry);
};

export default { get, create, remove, update };
