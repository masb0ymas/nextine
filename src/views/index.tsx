import { Paper, Stack, Title } from '@mantine/core'
import MyStats from '~/core/components/MyStats/MyStats'
import classes from '~/core/components/MyStats/Stats.module.css'
import TableScroll from '~/core/components/MyTable/TableScroll/TableScroll'

export default function HomePage() {
  return (
    <Stack gap="xl">
      <Title size={26} fw={600}>
        Overview
      </Title>

      <MyStats />

      <Title size={26} fw={600}>
        New Member
      </Title>

      <Paper p={20} radius="md" className={classes.card}>
        <TableScroll />
      </Paper>
    </Stack>
  )
}
