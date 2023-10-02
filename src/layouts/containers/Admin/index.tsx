import { Container, Loader } from '@mantine/core'
import { ReactComponentLike } from 'prop-types'
import React, { useState } from 'react'
import Footer from './Footer'
import Header from './Header'
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

          {isLayoutLoading && <Loader />}

          {/* render content */}
          <Component {...props} />

          <Footer />
        </Container>
      </div>
    </AdminContext.Provider>
  )
}
