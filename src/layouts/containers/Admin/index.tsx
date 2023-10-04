import { Loader } from '@mantine/core'
import { ReactComponentLike } from 'prop-types'
import React, { useState } from 'react'
import Footer from './Footer'
import Header from './Header'
import classes from './Main.module.css'
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
      <div>
        <Header />

        <div style={{ display: 'flex' }}>
          <Siderbar />

          <main className={classes.main}>
            {/* loading component */}
            {isLayoutLoading && <Loader />}

            <section className={classes.section}>
              {/* render content */}
              <Component {...props} />
            </section>
          </main>
        </div>

        <Footer />
      </div>
    </AdminContext.Provider>
  )
}
