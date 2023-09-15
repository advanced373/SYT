import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../../pages/login";
import { MainPage } from "../../pages/main";
import {ReactNode, useContext} from 'react';
import { GlobalContext } from "../context/globalContext";

interface Props {
    children?: JSX.Element
    // any props that come into the component
}

function RequireAuth({ children }: Props){
  const {token, setToken} = useContext(GlobalContext);
  //return children;
  console.log(token);
  if(children === undefined){
    return <></>;
  }
  return (token !== undefined && token !== null && token !== "") ? children : <Navigate to="/login" replace />;
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
