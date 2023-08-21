import axios from "axios";
import { notifications } from '@mantine/notifications';
export const createThought = (formBody: any)=>{
    formBody["placedAt"]="19.08.2023";
    formBody["author"]={"name": "Stoica Mihai", "image": "image.png"};
    return axios.post("https://localhost:7249/thoughts", formBody).then( res=> 
    {
        if(res.status === 200){
            notifications.show({
                title: 'Success',
                message: 'Thought was added sucessfully.',
                style: { backgroundColor: 'green' },
              });
              return formBody;
        }
        else{
            notifications.show({
                title: 'Success',
                message: 'Thought was added sucessfully.',
                style: { backgroundColor: 'red' },
              });
              return null;
        }
    }
    );
  }