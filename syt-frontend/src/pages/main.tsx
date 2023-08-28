import { AuthenticationForm } from "../features/authentication/authentication.component";
import { ThoughtFormComponent } from "../features/thought-create/thought-form.component";
import { ListThoughtsComponent } from "../features/thought-list/thought-list.component";

export const MainPage = () =>{
    return (
        <>
        {/* <ThoughtFormComponent></ThoughtFormComponent>
        <ListThoughtsComponent></ListThoughtsComponent> */}
        <AuthenticationForm withBorder={true} w={"50%"} m={"auto"}></AuthenticationForm>
        </>
    
    );
}