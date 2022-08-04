import { useState, useEffect, useContext, createContext } from "react";
import { app } from "../firebase";
import {
	getAuth,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
} from "firebase/auth";
import { roles } from "@/const/roles";

const auth = getAuth(app);
const authContext = createContext({
	role: null,
	user: null,
	signin: (email: any, password: any) => {},
	signout: () => {},
});
// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }: { children: JSX.Element }) {
	const auth = useProvideAuth();
	return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
	return useContext(authContext);
};
// Provider hook that creates auth object and handles state
function useProvideAuth() {
	const [user, setUser] = useState<any | null>(null);
	const [role, setRole] = useState<any | null>(null);
	// Wrap any Firebase methods we want to use making sure ...
	// ... to save the user to state.
	const signin = async (email: any, password: any) => {
		const response = await signInWithEmailAndPassword(auth, email, password);
		setUser(response.user);
		const idTokenResult = await response.user.getIdTokenResult();
		if (idTokenResult.claims.teacher) {
			setRole(roles.TEACHER);
		} else {
			setRole(roles.STUDENT);
		}
		return response.user;
	};
	const signout = async () => {
		await signOut(auth);
		setRole(null);
		return setUser(null);
	};

	// Subscribe to user on mount
	// Because this sets state in the callback it will cause any ...
	// ... component that utilizes this hook to re-render with the ...
	// ... latest auth object.
	useEffect(() => {
		const getRole = async (user: any) => {
			const idTokenResult = await user.getIdTokenResult();
			setRole(idTokenResult.claims.role);
		};
		const unsubscribe = onAuthStateChanged(auth, (user: any) => {
			if (user) {
				setUser(user);
				getRole(user);
			} else {
				setUser(null);
				setRole(null);
			}
		});
		// Cleanup subscription on unmount
		return () => unsubscribe();
	}, []);
	// Return the user object and auth methods
	return {
		role,
		user,
		signin,
		signout,
	};
}
