import { Paper, PaperProps } from '@mantine/core'
import React from 'react'
import classes from './paper.module.css'

type MyPaperProps = PaperProps & {
  children: React.ReactNode
}

export default function MyPaper(props: MyPaperProps) {
  const { children } = props

  return (
    <Paper className={classes.root} {...props}>
      {children}
    </Paper>
  )
}
