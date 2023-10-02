import { Container, Loader, Stack } from '@mantine/core'
import { ReactComponentLike } from 'prop-types'
import React, { useState } from 'react'
import Footer from './Footer'
import Header from './Header'
import classes from './Header/Header.module.css'
import Siderbar from './Sidebar'

interface IProps {
  Component: ReactComponentLike
}

const AdminContext = React.createContext<
  {
    stateLayoutLoading: [boolean, (loading: boolean) => void]
  } & any
>({
  stateLayoutLoading: [false, () => {}],
})

export default function AdminContainer(props: IProps) {
  const { Component } = props

  const stateLayoutLoading = useState(false)
  const [isLayoutLoading] = stateLayoutLoading

  return (
    <AdminContext.Provider value={{ stateLayoutLoading }}>
      <div style={{ display: 'flex' }}>
        <Siderbar />

        <Container size="xl" w="100vw" mih="100vh">
          <Header />

          {/* loading component */}
          {isLayoutLoading && <Loader />}

          <Stack gap="lg" className={classes.content}>
            {/* render content */}
            <Component {...props} />

            <Footer />
          </Stack>
        </Container>
      </div>
    </AdminContext.Provider>
  )
}
