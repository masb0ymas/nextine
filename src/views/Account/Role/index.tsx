import {
  Button,
  Grid,
  Stack,
  TextInput,
  Tooltip,
  TransitionProps,
  rem,
} from '@mantine/core'
import { modals } from '@mantine/modals'
import { IconPlus, IconSearch } from '@tabler/icons-react'
import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import MyPaper from '~/core/components/MyPaper/MyPaper'
import MyReactTable from '~/core/components/MyTable/ReactTable'
import { RoleEntity } from '~/data/entities/Role'
import useRole from '~/data/query/Role/useRole'
import RoleRepository from '~/data/repository/RoleRepository'
import { queryClient } from '~/layouts/core'
import columnRole from './partials/columnRole'
import DetailRoleModal from './partials/detail'

export default function RolePage() {
  const baseURL = '/account/role'

  const queryData = useRole({
    query: {
      defaultValue: {
        page: 1,
        pageSize: 10,
      },
    },
  })

  // mutation delete
  const softDelete = useMutation(
    (id: string) => RoleRepository.softDelete(id),
    {
      onSettled() {
        queryClient.invalidateQueries(['/role'])
      },
    }
  )

  const multipleDelete = useMutation(
    (listChecked: string | string[]) =>
      RoleRepository.multipleSoftDelete({ ids: listChecked }),
    {
      onSettled() {
        queryClient.invalidateQueries(['/role'])
      },
    }
  )

  const transition: Partial<TransitionProps> = {
    transition: 'slide-up',
    duration: 500,
  }

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

        <Grid.Col span={{ base: 12, md: 6, lg: 3 }} ta="right">
          <Tooltip label="Add Role" transitionProps={transition}>
            <Button
              radius="md"
              leftSection={
                <IconPlus
                  style={{ width: rem(16), height: rem(16) }}
                  stroke={3}
                />
              }
              component={Link}
              href={`${baseURL}/add`}
            >
              Add
            </Button>
          </Tooltip>
        </Grid.Col>
      </Grid>

      <MyPaper withBorder pt={25} pb={15} px={30} radius="md">
        <MyReactTable<RoleEntity>
          baseURL={baseURL}
          columns={columnRole}
          query={queryData}
          showModalDetail={(info: RoleEntity) => {
            modals.open({
              centered: true,
              size: 'lg',
              title: 'Role Detail',
              children: <DetailRoleModal data={info} />,
            })
          }}
          // @ts-ignore
          selectedMutation={softDelete}
          // @ts-ignore
          multiSelectedMutation={multipleDelete}
        />
      </MyPaper>
    </Stack>
  )
}
