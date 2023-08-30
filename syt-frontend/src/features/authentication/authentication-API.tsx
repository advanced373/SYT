import axios from "axios";
import { notifications } from '@mantine/notifications';
import { User } from "./model/user.model";

export const createUser = (formBody: User)=>{
    return axios.post("https://localhost:7249/users", formBody).then( res=> 
    {
        if(res.status === 200){
            notifications.show({
                title: 'Success',
                message: 'User was registered sucessfully.',
                style: { backgroundColor: 'green' },
              });
              return formBody;
        }
        else{
            notifications.show({
                title: 'Success',
                message: 'User was registered sucessfully.',
                style: { backgroundColor: 'red' },
              });
              return null;
        }
    }
    );
}