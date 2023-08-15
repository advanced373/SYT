import {
    createStyles,
    Text,
    Avatar,
    Group,
    TypographyStylesProvider,
    Paper,
    rem,
  } from '@mantine/core';
  import {
    Thought
  } from './model/thought.model'
  const useStyles = createStyles((theme) => ({
    comment: {
      padding: `${theme.spacing.lg} ${theme.spacing.xl}`,
    },
  
    body: {
      paddingLeft: rem(54),
      paddingTop: theme.spacing.sm,
      fontSize: theme.fontSizes.sm,
    },
  
    content: {
      '& > p:last-child': {
        marginBottom: 0,
      },
    },
  }));
  
  export const ThoughtComponent = ({ postedAt, body, author }: Thought) =>{
    const { classes } = useStyles();
    return (
      <Paper withBorder radius="md" className={classes.comment}>
        <Group>
          <Avatar src={author.image} alt={author.name} radius="xl" />
          <div>
            <Text fz="sm">{author.name}</Text>
            <Text fz="xs" c="dimmed">
              {postedAt}
            </Text>
          </div>
        </Group>
        <TypographyStylesProvider className={classes.body}>
          <div className={classes.content} dangerouslySetInnerHTML={{ __html: body }} />
        </TypographyStylesProvider>
      </Paper>
    );
  }