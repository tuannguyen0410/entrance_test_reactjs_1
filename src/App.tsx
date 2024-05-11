import './App.scss';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import {
  BrowserRouter, Route, Routes
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import useInitialRender from 'hooks/useInitialRender';
import Home from 'pages/Home';
import Login from 'pages/Login';
import SignUp from 'pages/SignUp';
import { store } from 'store';

const AppContent: React.FC = () => {
  useInitialRender();
  return (
    <Routes>
      <Route
        path="/login"
        element={<Login />}
      />
      <Route
        path="/signup"
        element={<SignUp />}
      />
      <Route index element={<Home />} />
      <Route path="*" element={<div> Not Found </div>} />
    </Routes>
  );
};

const App: React.FC = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0,
        refetchOnMount: true,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

const AppWrapper: React.FC = () => (
  <Provider store={store}>
    <App />
    <ToastContainer />
  </Provider>
);

export default AppWrapper;
