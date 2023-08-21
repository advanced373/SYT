import { Button, Group, Box, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useSelector, useDispatch } from 'react-redux';
import { add, selectThoughts } from './thoughtSlice';

export const ThoughtFormComponent = ()=>{
  const dispatch = useDispatch();
    const form = useForm({
        initialValues: {
          body: ''
        },
      });
    
      return (
        <Box maw={300} mx="auto">
          <form onSubmit={form.onSubmit((values) => dispatch(add(values)))} onReset={form.onReset}>
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