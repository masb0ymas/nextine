import { Avatar, Center, Stack, Text } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'
import cx from 'clsx'
import { env } from '~/config/env'
import classes from './verify_page.module.css'

interface Props {
  loading: boolean
}

export default function VerifyPage({ loading }: Props) {
  const [colorSchema] = useLocalStorage({
    key: `${env.PREFFIX}-color-scheme`,
    defaultValue: 'light',
  })

  const logoSource = '/static/images/mantine-logo.png'
  const loadingText = 'Loading...'

  return (
    <div className={classes.wrapper}>
      <Center>
        <Stack gap={'xs'} align="center">
          <Avatar
            src={logoSource}
            alt="Logo"
            className={cx(classes.avatar, { [classes.anim]: loading })}
          />
          <Text
            lts={2}
            size="xl"
            fw={500}
            className={classes.text_writer}
            c={colorSchema === 'dark' ? 'white' : 'dark'}
          >
            {loadingText}
          </Text>
        </Stack>
      </Center>
    </div>
  )
}
