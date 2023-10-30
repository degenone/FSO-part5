import axios from 'axios';
const URL = '/api/blogs';

const getAll = () => {
    const request = axios.get(URL);
    return request.then((response) => response.data);
};

export default { getAll };
