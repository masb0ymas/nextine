import { BaseEntity } from './Base'

export interface RoleEntity extends BaseEntity {
  name: string
}

export type RoleAttributes = Omit<
  RoleEntity,
  'id' | 'created_at' | 'updated_at' | 'deleted_at'
>
