import "@/App.scss";
import AppLayout from "@/layouts/AppLayout";
import MyRoutes from "@/routes/MyRoutes";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ProvideAuth } from "./hooks/useAuth";

const queryClient = new QueryClient();

function App() {
	return (
		<ProvideAuth>
			<BrowserRouter>
				<QueryClientProvider client={queryClient}>
					<AppLayout>
						<MyRoutes />
					</AppLayout>
					<ReactQueryDevtools initialIsOpen />
				</QueryClientProvider>
			</BrowserRouter>
		</ProvideAuth>
	);
}

export default App;
