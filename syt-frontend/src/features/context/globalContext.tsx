import React from "react";

interface IUserContext
{
    token: string,
    setToken: any
}

export const GlobalContext = React.createContext<IUserContext>({token: ''} as IUserContext);