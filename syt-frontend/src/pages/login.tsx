import { AuthenticationForm } from "../features/authentication/authentication.component";

export const LoginPage = () =>{
    return (
        <>
        <AuthenticationForm withBorder={true} w={"50%"} m={"auto"}></AuthenticationForm>
        </>
    
    );
}