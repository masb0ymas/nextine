import { Checkbox, Divider, Group, Text } from '@mantine/core'
import _ from 'lodash'
import Image from 'rc-image'
import { formatCurrencyIDR } from '~/core/utils/currency'
import { formatDateText, formatDateTime } from '~/core/utils/date'
import classes from '../modal.module.css'

interface ItemProps<T> {
  item: T
  content: ContentDetailType
}

type ContentDetailType = {
  title: string
  key: string
  type: ItemType
}

export enum ItemType {
  string,
  boolean,
  date,
  number,
  currency,
  date_time,
  html,
  image,
}

export default function ModalItemDetail<T>({ item, content }: ItemProps<T>) {
  const { title, key, type } = content

  const data = _.get(item, key, '-')

  return (
    <>
      <Group justify="space-between">
        <Text className={classes.modal_label} size="sm">
          {title} :
        </Text>

        {type === ItemType.date && (
          // @ts-ignore
          <Text size="sm">{formatDateText(data)}</Text>
        )}

        {type === ItemType.date_time && (
          // @ts-ignore
          <Text size="sm">{formatDateTime(data)}</Text>
        )}

        {type === ItemType.currency && (
          // @ts-ignore
          <Text size="sm">{formatCurrencyIDR(data)}</Text>
        )}

        {type === ItemType.string && (
          // @ts-ignore
          <Text size="sm">{data}</Text>
        )}

        {type === ItemType.boolean && (
          // @ts-ignore
          <Checkbox checked={Boolean(data)} />
        )}

        {type === ItemType.image && (
          // @ts-ignore
          <Image alt={'image'} src={data} />
        )}

        {type === ItemType.html && (
          // @ts-ignore
          <div dangerouslySetInnerHTML={{ __html: data }} />
        )}
      </Group>

      <Divider variant="dashed" />
    </>
  )
}
