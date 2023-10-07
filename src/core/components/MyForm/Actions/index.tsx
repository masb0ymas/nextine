import { Button, Divider, Grid, Paper, Text } from '@mantine/core'

interface ActionFormProps {
  title?: string
  labelConfirm: string
  labelCancel?: string
  onConfirm?: () => void
  onCancel: () => void
}

export default function ActionFrom(props: ActionFormProps) {
  const {
    title = 'Actions',
    labelConfirm,
    labelCancel = 'Back',
    onConfirm,
    onCancel,
  } = props

  return (
    <Paper withBorder p={20} radius="md">
      <Text mb="md" size="md" fw="bold">
        {title}
      </Text>

      <Divider variant="dashed" />

      <Grid mt="md">
        <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
          <Button fullWidth radius="md" variant="default" onClick={onCancel}>
            {labelCancel}
          </Button>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
          {onConfirm ? (
            <Button fullWidth radius="md" onClick={onConfirm}>
              {labelConfirm}
            </Button>
          ) : (
            <Button fullWidth radius="md" type="submit">
              {labelConfirm}
            </Button>
          )}
        </Grid.Col>
      </Grid>
    </Paper>
  )
}
