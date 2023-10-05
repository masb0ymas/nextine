import { Title, TitleProps } from '@mantine/core'
import React from 'react'

type MyTitleProps = TitleProps & {
  children: React.ReactNode
}

export default function MyTitle(props: MyTitleProps) {
  const { children } = props

  return (
    <Title size={26} fw={600} {...props}>
      {children}
    </Title>
  )
}
