import { ScrollArea, Table } from '@mantine/core'
import cx from 'clsx'
import { useState } from 'react'
import MyPaper from '~/core/components/MyPaper/MyPaper'
import { mockDataTable } from './mockTable'
import classes from './table_scroll.module.css'

export default function TableScroll() {
  const [scrolled, setScrolled] = useState(false)

  const rows = mockDataTable.map((row) => (
    <Table.Tr key={row.name}>
      <Table.Td>{row.name}</Table.Td>
      <Table.Td>{row.email}</Table.Td>
      <Table.Td>{row.company}</Table.Td>
    </Table.Tr>
  ))

  return (
    <MyPaper withBorder p={20} radius="md">
      <ScrollArea
        h={300}
        onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
      >
        <Table miw={700}>
          <Table.Thead
            className={cx(classes.header, { [classes.scrolled]: scrolled })}
          >
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>Email</Table.Th>
              <Table.Th>Company</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </ScrollArea>
    </MyPaper>
  )
}
