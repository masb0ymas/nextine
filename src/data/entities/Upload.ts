import { BaseEntity } from './Base'

export interface UploadEntity extends BaseEntity {
  key_file: string
  filename: string
  mimetype: string
  size: number
  signed_url: string
  expiry_date_url: string | Date
  file_upload?: File | null
}

export type UploadAttributes = Omit<
  UploadEntity,
  'id' | 'created_at' | 'updated_at' | 'deleted_at'
>
