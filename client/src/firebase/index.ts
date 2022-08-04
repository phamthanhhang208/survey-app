import { initializeApp } from "firebase/app";
import "firebase/auth";
// Add your Firebase credentials
const firebaseConfig = {
	apiKey: "AIzaSyD4z-3rmj9jY3ZuQGWsfH1njDvFRANigic",
	authDomain: "survey-app-user-74dd0.firebaseapp.com",
	projectId: "survey-app-user-74dd0",
	storageBucket: "survey-app-user-74dd0.appspot.com",
	messagingSenderId: "94922264310",
	appId: "1:94922264310:web:c7d5677037d8488f5da6d7",
	measurementId: "G-ZTPC0WGNPJ",
};

// {
// 	apiKey: process.env.apiKey,
// 	authDomain: process.env.authDomain,
// 	projectId: process.env.projectId,
// 	storageBucket: process.env.storageBucket,
// 	messagingSenderId: process.env.messagingSenderId,
// 	appId: process.env.appId,
// 	measurementId: process.env.measurementId,
// };

export const app = initializeApp(firebaseConfig);
