import { Grid, Stack, TextInput, rem } from '@mantine/core'
import { modals } from '@mantine/modals'
import { IconSearch } from '@tabler/icons-react'
import MyPaper from '~/core/components/MyPaper/MyPaper'
import MyReactTable from '~/core/components/MyTable/ReactTable'
import { SessionEntity } from '~/data/entities/Session'
import useSession from '~/data/query/Session/useSession'
import columnSession from './partials/columnSession'
import DetailSessionModal from './partials/detail'

export default function SessionPage() {
  const baseURL = '/account/session'

  const queryData = useSession({
    query: {
      defaultValue: {
        page: 1,
        pageSize: 10,
      },
    },
  })

  return (
    <Stack gap={15}>
      <Grid justify="space-between" align="stretch">
        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
          <TextInput
            radius="md"
            leftSectionPointerEvents="none"
            leftSection={
              <IconSearch style={{ width: rem(16), height: rem(16) }} />
            }
            placeholder="Search..."
          />
        </Grid.Col>
      </Grid>

      <MyPaper withBorder pt={25} pb={15} px={30} radius="md">
        <MyReactTable<SessionEntity>
          baseURL={baseURL}
          columns={columnSession}
          query={queryData}
          showModalDetail={(info: SessionEntity) => {
            modals.open({
              centered: true,
              size: 'lg',
              title: 'Session Detail',
              children: <DetailSessionModal data={info} />,
            })
          }}
          isEdit={false}
          isDeleted={false}
        />
      </MyPaper>
    </Stack>
  )
}
