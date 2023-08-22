import { Button, Group, Box, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { add, selectThoughts, store } from './thoughtSlice';
import { createThought } from './thought-createAPI';

export const ThoughtFormComponent = ()=>{
    const form = useForm({
        initialValues: {
          body: ''
        },
      });
    
      return (
        <Box maw={300} mx="auto">
          <form onSubmit={form.onSubmit(async (values) => {var res =await createThought(values); store.dispatch(add(res))})} onReset={form.onReset}>
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