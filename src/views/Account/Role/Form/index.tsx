import { Grid, LoadingOverlay, Paper, Stack, TextInput } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { IconCheck } from '@tabler/icons-react'
import { useMutation } from '@tanstack/react-query'
import _ from 'lodash'
import Router, { useRouter } from 'next/router'
import { useState } from 'react'
import ActionFrom from '~/core/components/MyForm/Actions'
import MyTitlePage from '~/core/components/MyTitle/MyTitlePage'
import { RoleAttributes } from '~/data/entities/Role'
import useRoleById from '~/data/query/Role/useRoleById'
import RoleRepository from '~/data/repository/RoleRepository'
import roleSchema from '~/data/validation/master/role.schema'
import { queryClient } from '~/layouts/core'

interface AbstractFormProps {
  initialValues: Record<string, any>
  validate: Record<string, any>
  isEdit?: boolean
  pageProps?: any
  mutation: ReturnType<typeof useMutation<any, any, any, any>>
}

function AbstractForm({
  initialValues,
  validate,
  mutation,
  isEdit = false,
}: AbstractFormProps) {
  const [visible, setVisible] = useState<boolean>(false)

  const baseURL = `/account?tabs=role`

  const form = useForm({
    initialValues,
    validate,
  })

  const onFormSubmit = async () => {
    setVisible(true)

    try {
      const response = await mutation.mutateAsync(form.values)
      const message = _.get(response, 'data.message', '') as string

      showNotification({
        title: 'Submit Successfully',
        message,
        icon: <IconCheck size={16} />,
        color: 'green',
      })

      // redirect
      Router.push(baseURL)
    } catch (error) {
      const description = _.get(error, 'response.data.message', '')

      console.log(description)
    } finally {
      setVisible(false)
    }
  }

  return (
    <Stack>
      <MyTitlePage
        title="Account"
        subtitle="Role"
        onBack={() => Router.push(baseURL)}
      />

      <form onSubmit={form.onSubmit(onFormSubmit)}>
        <Grid p={15}>
          <Grid.Col span={{ base: 12, md: 6, lg: 8 }}>
            <Paper withBorder p={20} radius="md">
              <TextInput
                label="Name"
                placeholder="Input Name"
                withAsterisk
                {...form.getInputProps('name')}
              />
            </Paper>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
            <ActionFrom
              labelConfirm={isEdit ? 'Save Changes' : 'Save'}
              onCancel={() => Router.push(baseURL)}
            />
          </Grid.Col>
        </Grid>
      </form>
    </Stack>
  )
}

export function FormAdd() {
  const createData = useMutation(
    (data: RoleAttributes) => RoleRepository.create(data),
    {
      onSettled() {
        queryClient.invalidateQueries(['/role'])
      },
    }
  )

  return (
    <AbstractForm
      initialValues={{
        name: '',
      }}
      validate={zodResolver(roleSchema.create)}
      mutation={createData}
    />
  )
}

export function FormEdit(props: any) {
  const { pageProps } = props
  const router = useRouter()

  const id = router?.query?.id
  const isEdit = Boolean(id)

  const queryById = useRoleById(String(id), {}, { enabled: !!id })
  const { isLoading, remove, data } = queryById

  const updateData = useMutation(
    (data: RoleAttributes) => RoleRepository.update(String(id), data),
    {
      onSettled() {
        remove()
        queryClient.invalidateQueries(['/role'])
      },
    }
  )

  if (isLoading) {
    return <LoadingOverlay visible={isLoading} />
  }

  return (
    <AbstractForm
      initialValues={{
        ...data,
      }}
      validate={zodResolver(roleSchema.create)}
      isEdit={isEdit}
      mutation={updateData}
      pageProps={pageProps}
    />
  )
}
