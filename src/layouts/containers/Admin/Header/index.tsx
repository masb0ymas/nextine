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
import { showNotification } from '@mantine/notifications'
import {
  IconCheck,
  IconLockOpen,
  IconLogout,
  IconSearch,
  IconUserCog,
  IconX,
} from '@tabler/icons-react'
import { useMutation } from '@tanstack/react-query'
import _ from 'lodash'
import Router from 'next/router'
import { env } from '~/config/env'
import { useAuthSession } from '~/core/hooks/useAuthSession/useAuthSession'
import { getInitialName } from '~/core/utils/formatter'
import useVerifySession from '~/data/query/useVerifySession'
import AuthRepository from '~/data/repository/AuthRepository'
import classes from './Header.module.css'

export default function Header() {
  const queryAuth = useAuthSession()
  const { data } = queryAuth

  const { remove } = useVerifySession()

  const postLogout = useMutation(() =>
    AuthRepository.logout({ user_id: String(queryAuth?.data?.id) })
  )

  async function handleLogout() {
    try {
      const response = await postLogout.mutateAsync()
      const message = _.get(response, 'data.message', '')

      // remove session
      localStorage.removeItem(env.LOCAL_STORAGE_SESSION)
      remove() // remove cache react query

      // show notif
      showNotification({
        title: `See you again!`,
        message,
        color: 'green',
        withCloseButton: false,
        icon: <IconCheck size={16} />,
      })

      // direct success login
      Router.push('/')
    } catch (error) {
      const errMessage = _.get(error, 'response.data.message', '')

      showNotification({
        title: 'Error',
        message: errMessage,
        icon: <IconX size={16} />,
        color: 'red',
      })
    }
  }

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
              onClick={() => handleLogout()}
            >
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </header>
  )
}
