import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-tiles-psup.firebaseio.com/'
});

export default instance;
