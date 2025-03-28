import { ToastContainer } from 'react-toastify'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Index from './pages/Index'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Operadoras from './pages/Operadoras'
import NotFound from './pages/NotFound'


function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer position='top-right' autoClose={3000} />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Index />} />
          <Route path='/operadoras' element={<Operadoras />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL '*' ROUTE */}
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
