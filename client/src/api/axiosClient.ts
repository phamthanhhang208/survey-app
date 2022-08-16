import axios from "axios";

const axiosClient = axios.create({
	baseURL: process.env.REACT_APP_API_URL || "http://localhost:8080/",
});

axiosClient.interceptors.response.use(
	(res) => res,
	async (error) => {
		if (error.response.status === 404) {
			window.location.replace(`${window.location.origin}/#/not-found`);
		}
		return Promise.reject(error);
	}
);

export default axiosClient;
