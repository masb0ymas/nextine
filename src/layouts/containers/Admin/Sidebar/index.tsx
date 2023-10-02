import {
  Center,
  Menu,
  Stack,
  Tooltip,
  UnstyledButton,
  rem,
  useMantineColorScheme,
} from '@mantine/core'
import { MantineLogo } from '@mantine/ds'
import {
  IconAnalyze,
  IconColorSwatch,
  IconDeviceDesktopAnalytics,
  IconDeviceDesktopCog,
  IconHistory,
  IconHome2,
  IconLogout,
  IconMoon,
  IconSettings,
  IconSun,
  IconUser,
  IconUsers,
} from '@tabler/icons-react'
import _ from 'lodash'
import { useState } from 'react'
import classes from '~/core/components/MyNavbar/Navbar.module.css'

interface BaseNavbarLinkProps {
  icon: typeof IconHome2
  label: string
  active?: boolean
  onClick?(): void
}

interface NavbarLinkProps extends BaseNavbarLinkProps {
  links?: BaseNavbarLinkProps[]
}

function NavbarLink({
  icon: Icon,
  label,
  links,
  active,
  onClick,
}: NavbarLinkProps) {
  return (
    <>
      {!_.isEmpty(links) ? (
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
            <UnstyledButton
              onClick={onClick}
              className={classes.link}
              data-active={active || undefined}
            >
              <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
            </UnstyledButton>
          </Menu.Target>

          <Menu.Dropdown>
            {links?.map((item) => (
              <Menu.Item
                leftSection={
                  <item.icon style={{ width: rem(14), height: rem(14) }} />
                }
                key={item.label}
              >
                {item.label}
              </Menu.Item>
            ))}
          </Menu.Dropdown>
        </Menu>
      ) : (
        <Tooltip
          label={label}
          position="right"
          transitionProps={{ duration: 0 }}
        >
          <UnstyledButton
            onClick={onClick}
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

const mockdata = [
  { icon: IconHome2, label: 'Home' },
  { icon: IconDeviceDesktopAnalytics, label: 'Analytics' },
  {
    icon: IconUsers,
    label: 'Account',
    links: [
      {
        icon: IconUser,
        label: 'User',
      },
      {
        icon: IconAnalyze,
        label: 'Role',
      },
      {
        icon: IconHistory,
        label: 'Session',
      },
    ],
  },
  { icon: IconSettings, label: 'Settings' },
]

export default function Siderbar() {
  const [active, setActive] = useState(0)
  const { setColorScheme } = useMantineColorScheme()

  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => setActive(index)}
    />
  ))

  return (
    <nav className={classes.navbar}>
      <Center>
        <MantineLogo type="mark" size={35} />
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
          <UnstyledButton className={classes.link} color="red">
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
