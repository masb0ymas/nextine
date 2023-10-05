import { Text } from '@mantine/core'
import { openConfirmModal } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'
import { IconCheck } from '@tabler/icons-react'
import _ from 'lodash'
import {
  IOpenMultiSelectedCustomModal,
  IOpenSelectedCustomModal,
  IOpenSelectedWithDataCustomModal,
} from './ICustomModal'

/**
 *
 * @param values
 * @returns
 */
export const openSelectModal = (values: IOpenSelectedCustomModal) => {
  const { id, mutation, query, title, description, labelConfirm, labelCancel } =
    values

  const defaultTitle = title ?? 'Delete data'
  const defaultDescription = description ?? 'Are you sure to delete this data ?'
  const defaultLabelConfirm = labelConfirm ?? 'Confirm Delete'
  const defaultLabelCancel = labelCancel ?? 'No, Cancel'

  return openConfirmModal({
    title: defaultTitle,
    centered: true,
    children: <Text size="sm">{defaultDescription}</Text>,
    labels: { confirm: defaultLabelConfirm, cancel: defaultLabelCancel },
    confirmProps: { color: 'red' },
    onCancel: () => null,
    onConfirm: async () => {
      try {
        const response = await mutation?.mutateAsync(id)
        const message = _.get(response, 'data.message', '') as string

        showNotification({
          title: 'Berhasil!',
          message,
          icon: <IconCheck size={16} />,
          color: 'green',
        })
      } catch (error) {
        const errMessage = _.get(error, 'response.data.message', '')
        console.log(errMessage)
      } finally {
        query.refetch()
      }
    },
  })
}

/**
 *
 * @param values
 * @returns
 */
export const openMultiSelectModal = (values: IOpenMultiSelectedCustomModal) => {
  const {
    ids,
    mutation,
    query,
    title,
    description,
    labelConfirm,
    labelCancel,
  } = values

  const defaultTitle = title ?? 'Delete selected data'
  const defaultDescription =
    description ?? 'Are you sure to delete selected data ?'
  const defaultLabelConfirm = labelConfirm ?? 'Confirm Delete'
  const defaultLabelCancel = labelCancel ?? 'No, Cancel'

  return openConfirmModal({
    title: defaultTitle,
    centered: true,
    children: <Text size="sm">{defaultDescription}</Text>,
    labels: { confirm: defaultLabelConfirm, cancel: defaultLabelCancel },
    confirmProps: { color: 'red' },
    onCancel: () => null,
    onConfirm: async () => {
      try {
        const response = await mutation?.mutateAsync(ids)
        const message = _.get(response, 'data.message', '') as string

        showNotification({
          title: 'Berhasil!',
          message,
          icon: <IconCheck size={16} />,
          color: 'green',
        })
      } catch (error) {
        const errMessage = _.get(error, 'response.data.message', '')
        console.log(errMessage)
      } finally {
        query.refetch()
      }
    },
  })
}

/**
 * 
 * @param values 
 * @returns 
 */
export function openSelectModalWithData<T>(
  values: IOpenSelectedWithDataCustomModal<T>
) {
  const {
    data,
    mutation,
    query,
    title,
    description,
    labelConfirm,
    labelCancel,
  } = values

  const defaultTitle = title ?? 'Delete selected data'
  const defaultDescription =
    description ?? 'Are you sure to delete selected data ?'
  const defaultLabelConfirm = labelConfirm ?? 'Confirm Delete'
  const defaultLabelCancel = labelCancel ?? 'No, Cancel'

  return openConfirmModal({
    title: defaultTitle,
    centered: true,
    children: <Text size="sm">{defaultDescription}</Text>,
    labels: { confirm: defaultLabelConfirm, cancel: defaultLabelCancel },
    confirmProps: { color: 'red' },
    onCancel: () => null,
    onConfirm: async () => {
      try {
        const response = await mutation?.mutateAsync(data)
        const message = _.get(response, 'data.message', '') as string

        showNotification({
          title: 'Berhasil!',
          message,
          icon: <IconCheck size={16} />,
          color: 'green',
        })
      } catch (error) {
        const errMessage = _.get(error, 'response.data.message', '')
        console.log(errMessage)
      } finally {
        query.refetch()
      }
    },
  })
}
