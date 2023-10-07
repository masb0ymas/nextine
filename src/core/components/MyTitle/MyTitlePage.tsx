import { ActionIcon, Badge, Group, rem } from '@mantine/core'
import { IconArrowLeft } from '@tabler/icons-react'
import MyTitle from './MyTitle'

interface MyTitlePageProps {
  title: string
  subtitle: string
  onBack?: () => void
}

export default function MyTitlePage(props: MyTitlePageProps) {
  const { title, subtitle, onBack } = props

  const iconStyle = { width: rem(24), height: rem(24) }

  return (
    <Group gap={10}>
      {onBack && (
        <ActionIcon variant="subtle" onClick={onBack}>
          <IconArrowLeft style={iconStyle} />
        </ActionIcon>
      )}

      <MyTitle>{title}</MyTitle>
      <Badge variant="outline" color="blue" size="lg" radius="md" lts={1.5}>
        {subtitle}
      </Badge>
    </Group>
  )
}
