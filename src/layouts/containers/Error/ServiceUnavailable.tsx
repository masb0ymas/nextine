import { Button, Container, Group, Text, Title } from '@mantine/core'
import classes from './ErrorPage.module.css'

function ServiceUnavailable() {
  return (
    <div className={classes.root}>
      <Container>
        <div className={classes.label}>503</div>
        <Title className={classes.title}>All of our servers are busy</Title>
        <Text size="lg" ta="center" className={classes.description}>
          We cannot handle your request right now, please wait for a couple of
          minutes and refresh the page. Our team is already working on this
          issue.
        </Text>
        <Group justify="center">
          <Button variant="light" size="md" radius="md">
            Refresh the page
          </Button>
        </Group>
      </Container>
    </div>
  )
}

export default ServiceUnavailable
