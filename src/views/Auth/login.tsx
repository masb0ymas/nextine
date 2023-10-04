import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
  rem,
} from '@mantine/core'
import { IconAt, IconLock } from '@tabler/icons-react'
import MyPaper from '~/core/components/MyPaper/MyPaper'
import classes from './auth.module.css'

export default function LoginPage() {
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
        <TextInput
          leftSectionPointerEvents="none"
          leftSection={<IconAt style={{ width: rem(16), height: rem(16) }} />}
          label="Email"
          placeholder="you@mantine.dev"
          required
        />
        <PasswordInput
          leftSectionPointerEvents="none"
          leftSection={<IconLock style={{ width: rem(16), height: rem(16) }} />}
          label="Password"
          placeholder="Your password"
          required
          mt="md"
        />

        <Group justify="space-between" mt="lg">
          <Checkbox label="Remember me" />
          <Anchor component="button" size="sm">
            Forgot password?
          </Anchor>
        </Group>

        <Button fullWidth radius="md" mt="xl">
          Sign in
        </Button>
      </MyPaper>
    </Container>
  )
}
