import { Center, Text } from '@mantine/core'
import classes from './Footer.module.css'
import { env } from '~/config/env'

export default function Footer() {
  const dateNow = new Date()
  const yearNow = dateNow.getFullYear()

  return (
    <footer className={classes.footer}>
      <Center>
        <Text fz="sm" fw={500} c="dimmed">
          &copy; {`${yearNow} ${env.APP_NAME}`}
        </Text>
      </Center>
    </footer>
  )
}
