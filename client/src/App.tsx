import "@/App.scss";
import AppLayout from "@/components/Layout/AppLayout";
import MyRoutes from "@/routes/MyRoutes";
import { BrowserRouter } from "react-router-dom";

function App() {
<<<<<<< HEAD
	return (
		<AppLayout>
			<BrowserRouter>
				<MyRoutes />
			</BrowserRouter>
		</AppLayout>
	);
=======
  return (
    <BrowserRouter>
      <AppLayout>
        <MyRoutes />
      </AppLayout>
    </BrowserRouter>
  );
>>>>>>> minhdl
}

export default App;
