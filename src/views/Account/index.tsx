import { Stack, Tabs, Text, rem } from '@mantine/core'
import { IconAnalyze, IconHistory, IconUser } from '@tabler/icons-react'
import { useRouter } from 'next/router'
import MyPaper from '~/core/components/MyPaper/MyPaper'
import MyTitlePage from '~/core/components/MyTitle/MyTitlePage'
import { capitalizeFirstLetter } from '~/core/utils/formatter'
import RolePage from './Role'
import SessionPage from './Session'

export default function AccountPage() {
  const router = useRouter()
  const baseURL = `/account`

  const subtitle = capitalizeFirstLetter(
    (router.query.tabs as string) || 'User'
  )

  const iconStyle = { width: rem(18), height: rem(18) }

  return (
    <Stack>
      <MyTitlePage title="Account" subtitle={subtitle} />

      <Tabs
        keepMounted={false}
        variant="pills"
        radius="md"
        orientation="vertical"
        defaultValue="user"
        value={router.query.tabs as string}
        onChange={(value) => router.push(`${baseURL}?tabs=${value}`)}
      >
        <Tabs.List>
          <Tabs.Tab
            value="user"
            leftSection={<IconUser style={iconStyle} stroke={1.5} />}
          >
            User
          </Tabs.Tab>
          <Tabs.Tab
            value="role"
            leftSection={<IconAnalyze style={iconStyle} stroke={1.5} />}
          >
            Role
          </Tabs.Tab>
          <Tabs.Tab
            value="session"
            leftSection={<IconHistory style={iconStyle} stroke={1.5} />}
          >
            Session
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="user" px={20}>
          <MyPaper p={20} radius="md" withBorder>
            <Text>User Content</Text>
          </MyPaper>
        </Tabs.Panel>

        <Tabs.Panel value="role" px={20}>
          <RolePage />
        </Tabs.Panel>

        <Tabs.Panel value="session" px={20}>
          <SessionPage />
        </Tabs.Panel>
      </Tabs>
    </Stack>
  )
}
