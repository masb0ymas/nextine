import { z } from 'zod'

const login = z.object({
  email: z
    .string()
    .email({ message: 'invalid email address' })
    .min(2, "email can't be empty"),

  password: z
    .string({
      required_error: 'password is required',
      invalid_type_error: 'password must be a string',
    })
    .min(2, "password can't be empty"),

  latitude: z
    .string({
      required_error: 'latitude is required',
      invalid_type_error: 'latitude must be a string',
    })
    .nullable(),

  longitude: z
    .string({
      required_error: 'longitude is required',
      invalid_type_error: 'longitude must be a string',
    })
    .nullable(),
})

const authSchema = { login }

export default authSchema
