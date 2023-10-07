import { Divider, Stack } from '@mantine/core'
import ModalItemDetail, {
  ItemType,
} from '~/core/components/MyModal/partials/ModalItemDetail'
import { RoleEntity } from '~/data/entities/Role'

interface DetailProps {
  data: RoleEntity
}

export default function DetailRoleModal({ data }: DetailProps) {
  const detailItems = [
    {
      title: 'Name',
      key: 'name',
      type: ItemType.string,
    },

    { title: 'Created At', key: 'created_at', type: ItemType.date },
  ].map((content) => ModalItemDetail<RoleEntity>({ item: data, content }))

  return (
    <div>
      <Divider variant="solid" />

      <Stack mt={'md'} gap={12}>
        {detailItems}
      </Stack>
    </div>
  )
}
