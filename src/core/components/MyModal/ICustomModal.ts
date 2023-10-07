import { QueryObserverBaseResult, useMutation } from '@tanstack/react-query'
import useUrlQuery from '~/core/hooks/useUrlQuery/useUrlQuery'

type Query = QueryObserverBaseResult & {
  data: any[]
  helpers: ReturnType<typeof useUrlQuery>
  total: number
}

export interface IOpenCustomModal {
  query: Query
  mutation?: ReturnType<typeof useMutation>
}

export interface IOpenSelectedCustomModal extends IOpenCustomModal {
  id: string
  title?: string
  description?: string
  labelConfirm?: string
  labelCancel?: string
}

export interface IOpenMultiSelectedCustomModal extends IOpenCustomModal {
  ids: string[]
  title?: string
  description?: string
  labelConfirm?: string
  labelCancel?: string
}

export interface IOpenSelectedWithDataCustomModal<T> extends IOpenCustomModal {
  data: T
  title?: string
  description?: string
  labelConfirm?: string
  labelCancel?: string
  colorConfirm?: string
  colorCancel?: string
}
