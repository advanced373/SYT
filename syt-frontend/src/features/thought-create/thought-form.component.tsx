import { Button, Group, Box, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import axios from 'axios';

export const ThoughtFormComponent = ()=>{
    const form = useForm({
        initialValues: {
          body: ''
        },
      });
    const createThought = (formBody: any)=>{
      formBody["placedAt"]="19.08.2023";
      formBody["author"]={"name": "Stoica Mihai", "image": "image.png"};
      axios.post("https://localhost:7249/thoughts", formBody).then( res=> notifications.show({
        title: 'Success',
        message: 'Thought was added sucessfully.',
      }));
    }
      return (
        <Box maw={300} mx="auto">
          <form onSubmit={form.onSubmit((values) => createThought(values))} onReset={form.onReset}>
            <Textarea
              label="Write your thought"
              placeholder="Message"
              {...form.getInputProps('body')}
            />
            <Group position="right" mt="md">
              <Button type="submit">Submit</Button>
            </Group>
          </form>
        </Box>
      );
}