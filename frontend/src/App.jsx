import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ThemeProvider from './theme';

import LoginPage from './pages/auth/login';
import RegisterPage from './pages/auth/register';
import HomePage from './pages/auth/private/home';

function App() {

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
