import axios from 'axios';
const URL = '/api/blogs';

let token = null;

const setToken = (value) => (token = `Bearer ${value}`);

const getAll = () => {
    const request = axios.get(URL);
    return request.then((response) => response.data);
};

const create = async (blog) => {
    const resp = await axios.post(URL, blog, {
        headers: { Authorization: token },
    });
    return resp.data;
};

export default { getAll, create, setToken };
