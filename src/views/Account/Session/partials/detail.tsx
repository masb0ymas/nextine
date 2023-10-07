import { Divider, Stack } from '@mantine/core'
import ModalItemDetail, {
  ItemType,
} from '~/core/components/MyModal/partials/ModalItemDetail'
import { SessionEntity } from '~/data/entities/Session'

interface DetailProps {
  data: SessionEntity
}

export default function DetailSessionModal({ data }: DetailProps) {
  console.log(data)
  const detailItems = [
    {
      title: 'Fullname',
      key: 'user.fullname',
      type: ItemType.string,
    },
    {
      title: 'Email',
      key: 'user.email',
      type: ItemType.string,
    },
    {
      title: 'IP Address',
      key: 'ip_address',
      type: ItemType.string,
    },
    {
      title: 'Device',
      key: 'device',
      type: ItemType.string,
    },
    {
      title: 'Platform',
      key: 'platform',
      type: ItemType.string,
    },
    {
      title: 'Latitude',
      key: 'latitude',
      type: ItemType.string,
    },
    {
      title: 'Longitude',
      key: 'longitude',
      type: ItemType.string,
    },

    { title: 'Created At', key: 'created_at', type: ItemType.date },
  ].map((content) => ModalItemDetail<SessionEntity>({ item: data, content }))

  return (
    <div>
      <Divider variant="solid" />

      <Stack mt={'md'} gap={12}>
        {detailItems}
      </Stack>
    </div>
  )
}
