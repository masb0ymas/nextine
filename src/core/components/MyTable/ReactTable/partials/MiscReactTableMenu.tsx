import { ActionIcon, Menu } from '@mantine/core'
import {
  IconDotsVertical,
  IconEdit,
  IconEye,
  IconTrashX,
} from '@tabler/icons-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { openSelectModal } from '~/core/components/MyModal'
import { IMiscReactTableMenu } from '../IReactTable'

export default function MiscReactTableMenu<T>(props: IMiscReactTableMenu<T>) {
  const {
    data,
    isEdit,
    baseURL,
    showModalDetail,
    selectedMutation,
    // multiSelectedMutation,
    // isMultiDeleted,
    query,
    isDeleted,
    isShowDetail,
  } = props
  const router = useRouter()

  return (
    <Menu shadow="md" position="bottom-end" radius="md" withinPortal withArrow>
      <Menu.Target>
        <ActionIcon variant="light" mx={'auto'}>
          <IconDotsVertical size={'1rem'} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown p={10}>
        <Menu.Label>Actions</Menu.Label>
        {isShowDetail && (
          <Menu.Item
            fz={'sm'}
            variant="transparent"
            onClick={() => showModalDetail(data)}
            leftSection={<IconEye size={20} />}
          >
            Detail
          </Menu.Item>
        )}

        {isEdit && (
          <Menu.Item
            fz={'sm'}
            variant="transparent"
            color="blue"
            component={Link}
            // @ts-ignore
            href={`${baseURL}/${data?.id}/edit`}
            leftSection={<IconEdit size={20} color="#228BE6" />}
          >
            Edit
          </Menu.Item>
        )}

        {isDeleted && (
          <Menu.Item
            fz={'sm'}
            variant="transparent"
            color="red"
            leftSection={<IconTrashX size={20} color="#FA5252" />}
            onClick={() =>
              openSelectModal({
                // @ts-ignore
                id: data?.id,
                mutation: selectedMutation,
                query,
              })
            }
          >
            Delete
          </Menu.Item>
        )}

        {/* {isMultiDeleted && (
          <Menu.Item
            leftSection={<IconTrashX />}
            onClick={() =>
              openMultiSelectModal({
                // @ts-ignore
                id: data?.id,
                mutation: selectedMutation,
                query,
              })
            }
          >
            Multiple Delete
          </Menu.Item>
        )} */}
      </Menu.Dropdown>
    </Menu>
  )
}
