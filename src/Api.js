import axios from 'axios';

const baseUrl = 'https://api.github.com/users/';

export default axios.create({
	baseURL: baseUrl,
	headers: {
		'Accept': 'application/json'
	}
});
