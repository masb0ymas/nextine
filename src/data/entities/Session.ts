import { BaseEntity } from './Base'
import { UserEntity } from './User'

export interface SessionEntity extends BaseEntity {
  user_id: string
  user: UserEntity
  token: string
  ip_address?: string | null
  device?: string | null
  platform?: string | null
  latitude?: string | null
  longitude?: string | null
}

export type SessionAttributes = Omit<
  SessionEntity,
  'id' | 'created_at' | 'updated_at' | 'deleted_at'
>
