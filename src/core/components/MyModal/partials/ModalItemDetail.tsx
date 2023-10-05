import { Checkbox, Divider, Group, Text } from '@mantine/core'
import Image from 'rc-image'
import classes from '../modal.module.css'
import { formatDateText, formatDateTime } from '~/core/utils/date'
import { formatCurrencyIDR } from '~/core/utils/currency'

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

  return (
    <>
      <Group justify="space-between">
        <Text className={classes.modal_label} size="sm">
          {title} :
        </Text>

        {type === ItemType.date && (
          // @ts-ignore
          <Text size="sm">{formatDateText(item[key])}</Text>
        )}

        {type === ItemType.date_time && (
          // @ts-ignore
          <Text size="sm">{formatDateTime(item[key])}</Text>
        )}

        {type === ItemType.currency && (
          // @ts-ignore
          <Text size="sm">{formatCurrencyIDR(item[key])}</Text>
        )}

        {type === ItemType.string && (
          // @ts-ignore
          <Text size="sm">{item[`${key}`]}</Text>
        )}

        {type === ItemType.boolean && (
          // @ts-ignore
          <Checkbox checked={Boolean(item[key])} />
        )}

        {type === ItemType.image && (
          // @ts-ignore
          <Image alt={'image'} src={item[key]?.signed_url} />
        )}

        {type === ItemType.html && (
          // @ts-ignore
          <div dangerouslySetInnerHTML={{ __html: item[key] ?? '' }} />
        )}
      </Group>

      <Divider variant="dashed" />
    </>
  )
}
