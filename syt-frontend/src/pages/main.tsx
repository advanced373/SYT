import { AuthenticationForm } from "../features/authentication/authentication.component";
import { GlobalContext } from "../features/context/globalContext";
import { ThoughtFormComponent } from "../features/thought-create/thought-form.component";
import { ListThoughtsComponent } from "../features/thought-list/thought-list.component";

export const MainPage = () =>{
    return (
        <>
        <ThoughtFormComponent></ThoughtFormComponent>
        <ListThoughtsComponent></ListThoughtsComponent>
        </>
    
    );
}