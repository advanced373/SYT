import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../../pages/login";
import { MainPage } from "../../pages/main";
import {ReactNode} from 'react';

interface Props {
    children?: ReactNode
    // any props that come into the component
}

function RequireAuth({ children, ...props }: Props){
  const authed = false;

  //return authed === true ? children : <Navigate to="/login" replace />;
  return <Navigate to="/login" replace />;
};

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<RequireAuth><MainPage /></RequireAuth>} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      </BrowserRouter>
  );
};
