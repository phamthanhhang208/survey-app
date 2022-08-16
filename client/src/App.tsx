import "@/App.scss";
import AppLayout from "@/layouts/AppLayout";
import MyRoutes from "@/routes/MyRoutes";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

function App() {
	return (
		<HashRouter>
			<QueryClientProvider client={queryClient}>
				<AppLayout>
					<MyRoutes />
				</AppLayout>
				<ReactQueryDevtools initialIsOpen />
			</QueryClientProvider>
		</HashRouter>
	);
}

export default App;
