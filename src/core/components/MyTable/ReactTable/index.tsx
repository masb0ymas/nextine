import {
  ActionIcon,
  Center,
  Container,
  Divider,
  Flex,
  Group,
  LoadingOverlay,
  Table as MantineTable,
  Pagination,
  Select,
  Text,
  Tooltip,
} from '@mantine/core'
import { IconEdit, IconEye, IconTrashX } from '@tabler/icons-react'
import {
  ColumnDef,
  ColumnOrderState,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import EmptyRecord from '../../Empty/EmptyRecord'
import { openSelectModal } from '../../MyModal'
import { IReactTable } from './IReactTable'
import MiscReactTableMenu from './partials/MiscReactTableMenu'

export const optPageSize = [
  { label: '5', value: '5' },
  { label: '10', value: '10' },
  { label: '20', value: '20' },
  { label: '30', value: '30' },
  { label: '50', value: '50' },
  // { label: '100', value: '100' },
  // { label: '200', value: '200' },
  // { label: '500', value: '500' },
  // { label: '1000', value: '1000' },
]

export default function MyReactTable<T>(props: IReactTable<T>) {
  const {
    query,
    columns,
    baseURL,
    selectedMutation,
    multiSelectedMutation,
    showModalDetail,
    isEdit = true,
    isDeleted = true,
    isShowDetail = true,
    isMiscAction = true,
    ...otherProps
  } = props

  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)

  const { data, total, isFetching } = query

  const defaultColumns: ColumnDef<T>[] = [
    ...columns,
    {
      accessorKey: 'actions',
      id: 'actions',
      header: 'Actions',
      enablePinning: true,
      cell: ({ row }) => (
        <Group gap={'sm'} align="center" justify="center" wrap="nowrap">
          {isMiscAction ? (
            <MiscReactTableMenu
              query={query}
              baseURL={baseURL}
              data={row?.original}
              showModalDetail={showModalDetail}
              isDeleted={isDeleted}
              isEdit={isEdit}
              isShowDetail={isShowDetail}
              selectedMutation={selectedMutation}
            />
          ) : (
            <>
              {isShowDetail && (
                <Tooltip
                  transitionProps={{ transition: 'pop', duration: 300 }}
                  label="Detail"
                >
                  <ActionIcon
                    size="md"
                    variant="subtle"
                    color="teal"
                    onClick={() => showModalDetail(row.original)}
                  >
                    <IconEye />
                  </ActionIcon>
                </Tooltip>
              )}

              {isEdit && (
                <Tooltip
                  transitionProps={{ transition: 'pop', duration: 300 }}
                  label="Edit"
                >
                  <ActionIcon
                    size="md"
                    variant="subtle"
                    color="blue"
                    component={Link}
                    // @ts-ignore
                    href={`${baseURL}/${row.original?.id}/edit`}
                  >
                    <IconEdit />
                  </ActionIcon>
                </Tooltip>
              )}

              {isDeleted && (
                <Tooltip
                  transitionProps={{ transition: 'pop', duration: 300 }}
                  label="Edit"
                >
                  <ActionIcon
                    size="md"
                    variant="subtle"
                    color="red"
                    onClick={() =>
                      openSelectModal({
                        // @ts-ignore
                        id: row?.original?.id as string,
                        mutation: selectedMutation,
                        query,
                      })
                    }
                  >
                    <IconTrashX />
                  </ActionIcon>
                </Tooltip>
              )}
            </>
          )}
        </Group>
      ),
    },
  ]

  const newColumns = useMemo(() => {
    if (!isEdit && !isDeleted && !isShowDetail) {
      return [...columns]
    }

    return defaultColumns
  }, [isEdit, isDeleted, isShowDetail])

  const columnOrder = useMemo<ColumnOrderState>(
    () => newColumns.map((column) => column.id as string),
    [newColumns]
  )

  const table = useReactTable({
    data: data ?? [],
    columns: [
      {
        accessorKey: 'index',
        id: 'index',
        enablePinning: true,
        header: '#',
        cell: ({ row }) => (
          <Center>
            {row.index + 1 + ((page ?? 1) - 1) * (pageSize ?? 10)}
          </Center>
        ),
      },
      ...newColumns,
    ],
    state: {
      columnOrder: ['select', 'index', ...columnOrder],
    },
    // onColumnOrderChange: setColumnOrder,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
  })

  return (
    <MantineTable.ScrollContainer mih={280} minWidth={'100%'}>
      <LoadingOverlay visible={isFetching} />

      <MantineTable
        withColumnBorders
        highlightOnHover
        mx={'auto'}
        mih={200}
        horizontalSpacing={'sm'}
        verticalSpacing={'sm'}
      >
        {/* Header */}
        <MantineTable.Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <MantineTable.Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                let widthStyle: any = 'fit-content'

                if (header.id.match(/actions/i)) {
                  widthStyle = 140
                } else if (['index', 'select'].includes(header.id)) {
                  widthStyle = 100
                }

                return (
                  <MantineTable.Th
                    key={header.id}
                    style={{
                      textAlign: 'center',
                      width: widthStyle,
                    }}
                  >
                    {header.isPlaceholder
                      ? 'null'
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </MantineTable.Th>
                )
              })}
            </MantineTable.Tr>
          ))}
        </MantineTable.Thead>

        {/* Body */}

        <MantineTable.Tbody>
          {data?.length === 0 && (
            <MantineTable.Tr>
              <MantineTable.Td colSpan={100}>
                <EmptyRecord />
              </MantineTable.Td>
            </MantineTable.Tr>
          )}

          {table.getRowModel().rows.map((row) => (
            <MantineTable.Tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <MantineTable.Td key={cell.id} style={{ textAlign: 'center' }}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </MantineTable.Td>
              ))}
            </MantineTable.Tr>
          ))}
        </MantineTable.Tbody>
      </MantineTable>

      <Divider variant="dashed" my="xs" />

      <Container fluid>
        <Group justify="space-between" mt={20}>
          <Flex align="center">
            <Select
              data={optPageSize}
              value={String(pageSize)}
              style={{ width: '5rem' }}
              size="xs"
              onChange={(v) => setPageSize(Number(v))}
            />
            <Text fz="sm" ml="sm">
              Record
            </Text>
          </Flex>

          <Pagination
            size="sm"
            value={page}
            onChange={(newPage) => {
              setPage(newPage)
              query.helpers.setQuery((helper) => {
                helper.query.set('page', newPage ?? 1)
              })
            }}
            total={Math.ceil(Number(total || 0) / Number(pageSize ?? 10))}
          />
        </Group>
      </Container>
    </MantineTable.ScrollContainer>
  )
}
