import { Textarea, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import axios from 'axios';

export const ThoughtFormComponent = ()=>{
    const form = useForm({
        initialValues: {
          body: ''
        },
      });
    const createThought = (formBody: any)=>{
      axios.post("https://localhost:7249/thoughts", formBody).then( res=> console.log("added done"));
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