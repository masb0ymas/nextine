import { Button, Container, Group, Text, Title } from '@mantine/core'
import Link from 'next/link'
import classes from './ErrorPage.module.css'

export default function NotFound() {
  return (
    <Container className={classes.root}>
      <div className={classes.label}>404</div>
      <Title className={classes.title}>You have found a secret place.</Title>
      <Text size="lg" ta="center" className={classes.description}>
        Unfortunately, this is only a 404 page. You may have mistyped the
        address, or the page has been moved to another URL.
      </Text>
      <Group justify="center">
        <Link href="/" passHref>
          <Button variant="light" size="md" radius="md">
            Take me back to home page
          </Button>
        </Link>
      </Group>
    </Container>
  )
}
