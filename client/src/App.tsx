import '@/App.scss';
import AppLayout from '@/components/Layout/AppLayout';
import MyRoutes from '@/routes/MyRoutes';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <AppLayout>
      <BrowserRouter>
        <MyRoutes />
      </BrowserRouter>
    </AppLayout>
  );
}

export default App;
