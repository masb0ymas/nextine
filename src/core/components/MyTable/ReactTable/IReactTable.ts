import { QueryObserverBaseResult, useMutation } from '@tanstack/react-query'
import { ColumnDef, useReactTable } from '@tanstack/react-table'
import useUrlQuery from '~/core/hooks/useUrlQuery/useUrlQuery'

type Query = QueryObserverBaseResult & {
  data: any[]
  helpers: ReturnType<typeof useUrlQuery>
  total: number
}

type ReactTableProps<T> = ReturnType<typeof useReactTable<T>>

export interface IReactTable<T> extends Partial<ReactTableProps<T>> {
  query: Query
  columns: ColumnDef<T>[]
  baseURL: string
  selectedMutation?: ReturnType<typeof useMutation>
  multiSelectedMutation?: ReturnType<typeof useMutation>
  showModalDetail: (data: T) => void
  isEdit?: boolean
  isDeleted?: boolean
  isShowDetail?: boolean
  isMultiDeleted?: boolean
  isMiscAction?: boolean
  page?: number
  pageSize?: number
}

export interface IMiscReactTableMenu<T> {
  data: T
  query: Query
  baseURL: string
  showModalDetail: (data: T) => void
  selectedMutation?: ReturnType<typeof useMutation>
  multiSelectedMutation?: ReturnType<typeof useMutation>
  isShowDetail?: boolean
  isMultiDeleted?: boolean
  isEdit?: boolean
  isDeleted?: boolean
}
