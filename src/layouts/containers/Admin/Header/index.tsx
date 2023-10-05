import {
  Avatar,
  Divider,
  Group,
  Menu,
  Text,
  TextInput,
  UnstyledButton,
  rem,
} from '@mantine/core'
import {
  IconLockOpen,
  IconLogout,
  IconSearch,
  IconUserCog,
} from '@tabler/icons-react'
import classes from './Header.module.css'
import { useAuthSession } from '~/core/hooks/useAuthSession/useAuthSession'
import { getInitialName } from '~/core/utils/formatter'

export default function Header() {
  const queryAuth = useAuthSession()
  const { data } = queryAuth

  return (
    <header className={classes.header}>
      <Group justify="space-between">
        <TextInput
          leftSectionPointerEvents="none"
          leftSection={
            <IconSearch style={{ width: rem(16), height: rem(16) }} />
          }
          placeholder="Search"
          radius="md"
        />

        <Menu
          withArrow
          shadow="md"
          position="bottom-end"
          radius="md"
          trigger="hover"
          openDelay={200}
          closeDelay={400}
        >
          <Menu.Target>
            <UnstyledButton>
              <Group>
                <Text>{`Halo, ${data?.fullname}`}</Text>
                <Avatar color="teal">
                  {getInitialName(String(data?.fullname))}
                </Avatar>
              </Group>
            </UnstyledButton>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item
              leftSection={
                <IconUserCog style={{ width: rem(14), height: rem(14) }} />
              }
            >
              Profile
            </Menu.Item>

            <Menu.Item
              leftSection={
                <IconLockOpen style={{ width: rem(14), height: rem(14) }} />
              }
            >
              Change Password
            </Menu.Item>

            <Divider my={5} variant="dashed" />

            <Menu.Item
              color="red"
              leftSection={
                <IconLogout style={{ width: rem(14), height: rem(14) }} />
              }
            >
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </header>
  )
}
