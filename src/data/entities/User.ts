import { BaseEntity } from './Base'
import { RoleEntity } from './Role'
import { UploadEntity } from './Upload'

export interface UserEntity extends BaseEntity {
  fullname: string
  email: string
  password: string | null
  phone: string | null
  token_verify: string | null
  address: string | null
  is_active: boolean
  is_blocked: boolean
  upload_id: string | null
  upload: UploadEntity | null
  role_id: string
  role: RoleEntity
}

export type LoginAttributes = Pick<UserEntity, 'email' | 'password'>

export type UserAttributes = Omit<
  UserEntity,
  'id' | 'created_at' | 'updated_at' | 'deleted_at'
>

export const defaultUserData = {
  id: null,
  fullname: null,
  email: null,
  password: null,
  phone: null,
  token_verify: null,
  is_active: false,
  is_blocked: false,
  upload_id: null,
  role_id: null,
  created_at: null,
  updated_at: null,
  deleted_at: null,
}
