import axios from "axios";
import { notifications } from '@mantine/notifications';
import { User } from "./model/user.model";

export const createUser = (formBody: User)=>{
    return axios.post("https://localhost:7249/users/add", formBody).then( res=> 
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

export const login = (formBody: User)=>{
    return axios.post("https://localhost:7249/users/login", formBody).then( res=> 
    {
        if(res.status === 200){
            notifications.show({
                title: 'Success',
                message: 'We are login you in a moment.',
                style: { backgroundColor: 'green' },
              });
              return formBody;
        }
        else{
            notifications.show({
                title: 'Error',
                message: 'Email or password is not correct.',
                style: { backgroundColor: 'red' },
              });
              return null;
        }
    }
    );
}