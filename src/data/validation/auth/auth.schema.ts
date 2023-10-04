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
})

const authSchema = { login }

export default authSchema
