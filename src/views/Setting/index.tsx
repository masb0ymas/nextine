import { Container, Stack, Tabs, Text, rem } from '@mantine/core'
import { IconBell, IconPhoto, IconServerCog } from '@tabler/icons-react'
import MyPaper from '~/core/components/MyPaper/MyPaper'
import MyTitle from '~/core/components/MyTitle/MyTitle'

export default function SettingPage() {
  const iconStyle = { width: rem(18), height: rem(18) }

  return (
    <Stack>
      <MyTitle>Setting</MyTitle>

      <Tabs
        variant="pills"
        radius="md"
        orientation="vertical"
        defaultValue="banner"
      >
        <Tabs.List>
          <Tabs.Tab
            value="banner"
            leftSection={<IconPhoto style={iconStyle} stroke={1.5} />}
          >
            Banner
          </Tabs.Tab>
          <Tabs.Tab
            value="notification"
            leftSection={<IconBell style={iconStyle} stroke={1.5} />}
          >
            Notification
          </Tabs.Tab>
          <Tabs.Tab
            value="setting"
            leftSection={<IconServerCog style={iconStyle} stroke={1.5} />}
          >
            Setting
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="banner" px={20}>
          <MyPaper p={20} radius="md" withBorder>
            <Text>Banner Content</Text>
          </MyPaper>
        </Tabs.Panel>

        <Tabs.Panel value="notification" px={20}>
          <MyPaper p={20} radius="md" withBorder>
            <Text>Notification Content</Text>
          </MyPaper>
        </Tabs.Panel>

        <Tabs.Panel value="setting" px={20}>
          <MyPaper p={20} radius="md" withBorder>
            <Text>Setting Content</Text>
          </MyPaper>
        </Tabs.Panel>
      </Tabs>
    </Stack>
  )
}
