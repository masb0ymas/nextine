import { Center, Stack, Text, ThemeIcon } from '@mantine/core'
import { IconDatabaseOff } from '@tabler/icons-react'

export default function EmptyRecord() {
  return (
    <Center>
      <Stack align="center">
        <ThemeIcon variant="light" radius={'xl'} size={'xl'} color="gray">
          <IconDatabaseOff />
        </ThemeIcon>

        <Text c="dimmed">Data Tidak Tersedia</Text>
      </Stack>
    </Center>
  )
}
