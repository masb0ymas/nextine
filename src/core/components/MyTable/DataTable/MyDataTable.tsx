import { ActionIcon, Group, Tooltip } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { IconEdit, IconEye, IconTrash } from '@tabler/icons-react'
import { useContextMenu } from 'mantine-contextmenu'
import { DataTable, DataTableColumn } from 'mantine-datatable'
import Router from 'next/router'
import { useState } from 'react'
import { openSelectModal } from '../../MyModal'
import { MyTableEntity } from './interface'

function MyTable<T>(props: MyTableEntity<T>) {
  const { showContextMenu } = useContextMenu()
  const isTouch = useMediaQuery('(pointer: coarse)')

  const {
    query,
    columns,
    baseURL,
    selectedMutation,
    multiSelectedMutation,
    showModalDetail,
    isEdit = true,
    isDeleted = true,
    ...otherProps
  } = props

  const { data, total, isFetching } = query

  const [selectedRecords, setSelectedRecords] = useState<T[]>([])

  // custom columns
  const defaultColumns: DataTableColumn<T | any>[] = [
    ...columns,
    {
      accessor: 'actions',
      title: 'Actions',
      textAlign: 'center',
      width: 100,
      render: (info) => {
        const id = String(info.id)

        return (
          <Group gap={4} justify="center">
            {/* Check Edit */}
            {isEdit && (
              <Tooltip
                transitionProps={{ transition: 'pop', duration: 300 }}
                label="Edit"
              >
                <ActionIcon
                  size="lg"
                  color="blue"
                  component="a"
                  href={`${baseURL}/${id}/edit`}
                >
                  <IconEdit size={22} />
                </ActionIcon>
              </Tooltip>
            )}

            {/* Check Deleted */}
            {isDeleted && (
              <Tooltip
                transitionProps={{ transition: 'pop', duration: 300 }}
                label="Hapus"
              >
                <ActionIcon
                  size="lg"
                  color="red"
                  onClick={() =>
                    openSelectModal({ id, mutation: selectedMutation, query })
                  }
                >
                  <IconTrash size={22} />
                </ActionIcon>
              </Tooltip>
            )}
          </Group>
        )
      },
    },
  ]

  let newColumns: DataTableColumn<T | any>[] = []

  if (!isEdit && !isDeleted) {
    newColumns = [...columns]
  } else {
    newColumns = defaultColumns
  }

  return (
    // @ts-expect-error
    <DataTable
      withTableBorder
      withColumnBorders
      minHeight={300}
      borderRadius="md"
      striped={false}
      highlightOnHover
      verticalAlign="center"
      verticalSpacing="md"
      horizontalSpacing="md"
      fetching={isFetching}
      columns={newColumns}
      records={data ?? []}
      totalRecords={total}
      selectedRecords={selectedRecords}
      onSelectedRecordsChange={setSelectedRecords}
      onRowContextMenu={({ record, event }) =>
        showContextMenu([
          {
            key: 'detail',
            icon: <IconEye size={16} />,
            onClick: () => showModalDetail(record),
          },
          {
            key: 'edit',
            icon: <IconEdit size={16} />,
            hidden: !isEdit,
            onClick: () => Router.push(`${baseURL}/${record.id}/edit`),
          },
          { key: 'divider' },
          {
            key: 'delete',
            icon: <IconTrash size={16} />,
            color: 'red',
            hidden:
              !isDeleted ||
              (selectedRecords.length !== 0 && selectedRecords.length > 1),
            onClick: () =>
              openSelectModal({
                id: record.id,
                mutation: selectedMutation,
                query,
              }),
          },
        ])(event)
      }
      {...otherProps}
    />
  )
}

export default MyTable
