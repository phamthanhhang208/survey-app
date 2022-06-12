import "@/App.scss";
import AppLayout from "@/components/Layout/AppLayout";
import MyRoutes from "@/routes/MyRoutes";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

function App() {
	return (
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<AppLayout>
					<MyRoutes />
				</AppLayout>
				<ReactQueryDevtools initialIsOpen />
			</QueryClientProvider>
		</BrowserRouter>
	);
}

export default App;
