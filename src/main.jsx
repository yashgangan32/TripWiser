import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import BrowserRouter, Routes, and Route
import CreateTrip from './create-trip/index.jsx';
import ViewTrip from './view-trip/[tripid]/index.jsx'
import Header from './components/custom/Header.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './login/Login.jsx';
import { AuthProvider } from './context/AuthContext.jsx'; // Import AuthProvider
import SignUp from './login/SignUp.jsx';
import ProtectedRoute from './components/ProtectedRoute';
import Reset from './login/Reset.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> {/* Wrap your app with BrowserRouter */}
      <AuthProvider> {/* Wrap your app with AuthProvider */}
        <Header />
        <Routes>
          <Route path="/" element={<App />} />
          {/*<Route path="/create-trip" element={<ProtectedRoute element={<CreateTrip />} />} />*/}
          <Route path="/create-trip" element={<CreateTrip />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/view-trip/:tripid" element={<ViewTrip/>}/>
          <Route path="/view-trip/:tripid" element={<ViewTrip/>}/>
          <Route path="/reset" element={<Reset/>}/>
        </Routes>
        <ToastContainer className="mx-auto" />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
