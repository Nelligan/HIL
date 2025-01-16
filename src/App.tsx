
import './App.css'
import { QueryClient, QueryClientProvider } from "react-query";
import Home from './Pages/Home/Home'
import AppRoutes from './routes/routes';
function App() {
  const queryClient = new QueryClient
  return (
    <>
    <QueryClientProvider client={queryClient}>
     <AppRoutes/>
    </QueryClientProvider>
      
    </>
  )
}

export default App
