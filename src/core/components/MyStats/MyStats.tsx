import { Group, SimpleGrid, Text } from '@mantine/core'
import {
  IconArrowDownRight,
  IconArrowUpRight,
  IconCoin,
  IconDiscount2,
  IconReceipt2,
  IconUserPlus,
} from '@tabler/icons-react'
import MyPaper from '../MyPaper/MyPaper'
import classes from './Stats.module.css'

const icons = {
  user: IconUserPlus,
  discount: IconDiscount2,
  receipt: IconReceipt2,
  coin: IconCoin,
}

const data = [
  { title: 'Revenue', icon: 'receipt', value: '13,456', diff: 34 },
  { title: 'Profit', icon: 'coin', value: '4,145', diff: -13 },
  { title: 'Coupons usage', icon: 'discount', value: '745', diff: 18 },
  { title: 'New customers', icon: 'user', value: '188', diff: -30 },
] as const

export default function MyStats() {
  const stats = data.map((stat) => {
    const Icon = icons[stat.icon]
    const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight

    return (
      <MyPaper withBorder p={20} radius="md" key={stat.title}>
        <Group justify="space-between">
          <Text size="sm" className={classes.title}>
            {stat.title}
          </Text>
          <Icon
            className={classes.icon}
            color={stat.diff > 0 ? 'teal' : 'red'}
            size="1.4rem"
            stroke={1.5}
          />
        </Group>

        <Group align="flex-end" gap="xs" mt={25}>
          <Text className={classes.value}>{stat.value}</Text>
          <Text
            c={stat.diff > 0 ? 'teal' : 'red'}
            fz="sm"
            fw={600}
            className={classes.diff}
          >
            <span>{stat.diff}%</span>
            <DiffIcon size="1rem" stroke={1.5} />
          </Text>
        </Group>

        <Text fz="sm" c="dimmed" mt={7}>
          Compared to previous month
        </Text>
      </MyPaper>
    )
  })

  return <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }}>{stats}</SimpleGrid>
}
