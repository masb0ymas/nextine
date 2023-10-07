import {
  Center,
  Menu,
  Stack,
  Tooltip,
  UnstyledButton,
  rem,
  useMantineColorScheme,
} from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import {
  IconCheck,
  IconColorSwatch,
  IconDeviceDesktopCog,
  IconHome2,
  IconLogout,
  IconMoon,
  IconSun,
  IconX,
} from '@tabler/icons-react'
import { useMutation } from '@tanstack/react-query'
import _ from 'lodash'
import Router, { useRouter } from 'next/router'
import { env } from '~/config/env'
import MantineLogo from '~/core/components/BrandLogo/MantineLogo'
import { useAuthSession } from '~/core/hooks/useAuthSession/useAuthSession'
import useMenuSidebar from '~/data/query/useMenuSidebar'
import useVerifySession from '~/data/query/useVerifySession'
import AuthRepository from '~/data/repository/AuthRepository'
import classes from './Sidebar.module.css'

interface BaseNavbarLinkProps {
  icon: typeof IconHome2
  label: string
  link?: string
  active?: boolean
}

interface NavbarLinkProps extends BaseNavbarLinkProps {
  links?: BaseNavbarLinkProps[]
}

function NavbarLink({
  icon: Icon,
  label,
  link,
  links,
  active,
}: NavbarLinkProps) {
  const router = useRouter()

  return (
    <>
      {!_.isEmpty(links) ? (
        <Menu
          withArrow
          shadow="md"
          position="right-start"
          radius="md"
          trigger="hover"
          openDelay={200}
          closeDelay={400}
        >
          <Menu.Target>
            <UnstyledButton
              className={classes.link}
              data-active={active || undefined}
            >
              <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
            </UnstyledButton>
          </Menu.Target>

          <Menu.Dropdown>
            {links?.map((item) => {
              const is_active = item.link === router.pathname

              return (
                <Menu.Item
                  leftSection={
                    <item.icon style={{ width: rem(16), height: rem(16) }} />
                  }
                  onClick={() => Router.push(String(item.link))}
                  data-active={is_active}
                  color={is_active ? 'blue' : undefined}
                  key={item.label}
                >
                  {item.label}
                </Menu.Item>
              )
            })}
          </Menu.Dropdown>
        </Menu>
      ) : (
        <Tooltip
          label={label}
          position="right"
          transitionProps={{ duration: 0 }}
        >
          <UnstyledButton
            onClick={() => Router.push(String(link))}
            className={classes.link}
            data-active={active || undefined}
          >
            <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
          </UnstyledButton>
        </Tooltip>
      )}
    </>
  )
}

export default function Siderbar() {
  const router = useRouter()
  const { setColorScheme } = useMantineColorScheme()

  const userAuth = useAuthSession()
  const { remove } = useVerifySession()

  const queryMenu = useMenuSidebar()
  const { data } = queryMenu

  const links = data.map((item) => {
    const links_active = item.links?.find((x) => x.link === router.pathname)
    const is_active = item.link === router.pathname || !_.isEmpty(links_active)

    return (
      <NavbarLink
        {...item}
        key={item.label}
        active={is_active}
        link={item.link}
      />
    )
  })

  const postLogout = useMutation(() =>
    AuthRepository.logout({ user_id: String(userAuth?.data?.id) })
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
    <nav className={classes.navbar}>
      <Center>
        <MantineLogo />
      </Center>

      <div className={classes.navbarMain}>
        <Stack justify="center" gap={0}>
          {links}
        </Stack>
      </div>

      <Stack justify="center" gap={10}>
        <Menu
          withArrow
          shadow="md"
          position="right"
          radius="md"
          trigger="hover"
          openDelay={200}
          closeDelay={400}
        >
          <Menu.Target>
            <UnstyledButton className={classes.link}>
              <IconColorSwatch
                style={{ width: rem(20), height: rem(20) }}
                stroke={1.5}
              />
            </UnstyledButton>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item
              onClick={() => setColorScheme('auto')}
              leftSection={
                <IconDeviceDesktopCog
                  style={{ width: rem(14), height: rem(14) }}
                />
              }
            >
              Auto
            </Menu.Item>

            <Menu.Item
              onClick={() => setColorScheme('light')}
              leftSection={
                <IconSun style={{ width: rem(14), height: rem(14) }} />
              }
            >
              Light
            </Menu.Item>

            <Menu.Item
              onClick={() => setColorScheme('dark')}
              leftSection={
                <IconMoon style={{ width: rem(14), height: rem(14) }} />
              }
            >
              Dark
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>

        <Tooltip
          label="Logout"
          position="right"
          transitionProps={{ duration: 0 }}
        >
          <UnstyledButton
            className={classes.link}
            color="red"
            onClick={() => handleLogout()}
          >
            <IconLogout
              color="red"
              style={{ width: rem(20), height: rem(20) }}
              stroke={1.5}
            />
          </UnstyledButton>
        </Tooltip>
      </Stack>
    </nav>
  )
}
