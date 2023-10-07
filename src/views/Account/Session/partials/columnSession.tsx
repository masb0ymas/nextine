import { ColumnDef } from '@tanstack/react-table'
import { SessionEntity } from '~/data/entities/Session'

const columnSession: ColumnDef<SessionEntity>[] = [
  {
    accessorKey: 'user.fullname',
    id: 'user.fullname',
    header: 'Fullname',
  },
  {
    accessorKey: 'user.email',
    id: 'user.email',
    header: 'Email',
  },
  {
    accessorKey: 'ip_address',
    id: 'ip_address',
    header: 'IP Address',
  },
  {
    accessorKey: 'device',
    id: 'device',
    header: 'Device',
  },
  {
    accessorKey: 'platform',
    id: 'platform',
    header: 'Platform',
  },
  {
    accessorKey: 'latitude',
    id: 'latitude',
    header: 'Latitude',
  },
  {
    accessorKey: 'longitude',
    id: 'longitude',
    header: 'Longitude',
  },
]

export default columnSession
