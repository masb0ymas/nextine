import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Group,
  LoadingOverlay,
  PasswordInput,
  Text,
  TextInput,
  Title,
  rem,
} from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { IconAt, IconCheck, IconLock } from '@tabler/icons-react'
import { useMutation } from '@tanstack/react-query'
import _ from 'lodash'
import Router from 'next/router'
import { useState } from 'react'
import { env } from '~/config/env'
import MyPaper from '~/core/components/MyPaper/MyPaper'
import { useAuthSession } from '~/core/hooks/useAuthSession/useAuthSession'
import { LoginAttributes } from '~/data/entities/User'
import AuthRepository from '~/data/repository/AuthRepository'
import authSchema from '~/data/validation/auth/auth.schema'
import classes from './auth.module.css'

export default function LoginPage() {
  const [visible, setVisible] = useState(false)
  const userAuth = useAuthSession()

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      latitude: '',
      longitude: '',
    },
    validate: zodResolver(authSchema.login),
  })

  const postLogin = useMutation((data: LoginAttributes) =>
    AuthRepository.login(data)
  )

  const onFormSubmit = async () => {
    setVisible(true)
    try {
      const response = await postLogin.mutateAsync(form.values)
      const message = _.get(response, 'data.message', '') as string
      const fullname = _.get(response, 'data.fullname', 'John Doe') as string
      const accessToken = _.get(response, 'data.access_token', {}) as string

      // save session
      localStorage.setItem(env.LOCAL_STORAGE_SESSION, accessToken)

      // show notif
      showNotification({
        title: `Welcome back, ${fullname}`,
        message,
        color: 'green',
        withCloseButton: false,
        icon: <IconCheck size={16} />,
      })

      // direct success login
      Router.push('/dashboard')
    } catch (error) {
      const errMessage = _.get(error, 'response.data.message', '')

      console.log(error, errMessage)
    } finally {
      setVisible(false)
    }
  }

  if (!_.isEmpty(userAuth.data)) {
    Router.push('/dashboard')
  }

  return (
    <Container size={420} py={120}>
      <Title ta="center" className={classes.title}>
        Welcome back!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{' '}
        <Anchor size="sm" component="button">
          Create account
        </Anchor>
      </Text>

      <MyPaper withBorder shadow="md" p={30} mt={30} radius="lg">
        <LoadingOverlay
          visible={visible}
          zIndex={1000}
          overlayProps={{ radius: 'sm', blur: 2 }}
        />

        <form onSubmit={form.onSubmit(onFormSubmit)}>
          <TextInput
            leftSectionPointerEvents="none"
            leftSection={<IconAt style={{ width: rem(16), height: rem(16) }} />}
            radius="md"
            label="Email"
            placeholder="you@mantine.dev"
            withAsterisk
            {...form.getInputProps('email')}
          />

          <PasswordInput
            leftSectionPointerEvents="none"
            leftSection={
              <IconLock style={{ width: rem(16), height: rem(16) }} />
            }
            radius="md"
            label="Password"
            placeholder="Your password"
            withAsterisk
            mt="md"
            {...form.getInputProps('password')}
          />

          <Group justify="space-between" mt="lg">
            <Checkbox label="Remember me" />
            <Anchor component="button" size="sm">
              Forgot password?
            </Anchor>
          </Group>

          <Button type="submit" loading={visible} fullWidth radius="md" mt="xl">
            Sign in
          </Button>
        </form>
      </MyPaper>
    </Container>
  )
}
