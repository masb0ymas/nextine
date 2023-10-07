import { Stack } from '@mantine/core'
import MyStats from '~/core/components/MyStats/MyStats'
import TableScroll from '~/core/components/MyTable/TableScroll/TableScroll'
import MyTitle from '~/core/components/MyTitle/MyTitle'

export default function HomePage() {
  return (
    <Stack gap="xl">
      <MyTitle>Overview</MyTitle>

      <MyStats />

      <MyTitle>New Member</MyTitle>

      <TableScroll />
    </Stack>
  )
}
