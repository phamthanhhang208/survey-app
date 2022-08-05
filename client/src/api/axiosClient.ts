import axios from "axios";
import { app } from "@/firebase";
import { getAuth } from "firebase/auth";
const auth = getAuth(app);

// onAuthStateChanged(auth, async (user) => {
// 	if (user) {
// 		const idToken = await getIdToken(user);
// 		token = idToken;
// 	}
// });

const axiosClient = axios.create({
	baseURL: process.env.REACT_APP_API_URL || "http://localhost:8080/",
});

axiosClient.interceptors.request.use(
	async (config: any) => {
		config.headers["Authorization"] =
			"Bearer " + (await auth.currentUser?.getIdToken());
		//config.headers["content-type"] = "multipart/form-data";
		return config;
	},
	(error) => {
		console.log(error);
		return Promise.reject(error);
	}
);

axiosClient.interceptors.response.use(
	(res) => res,
	async (error) => {
		if (error.response.status === 403) {
			//window.location.reload();
		}
		return Promise.reject(error);
	}
);

export default axiosClient;
