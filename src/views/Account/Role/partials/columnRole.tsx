import { ColumnDef } from '@tanstack/react-table'
import { RoleEntity } from '~/data/entities/Role'

const columnRole: ColumnDef<RoleEntity>[] = [
  {
    accessorKey: 'name',
    id: 'name',
    header: 'Name',
  },
]

export default columnRole
