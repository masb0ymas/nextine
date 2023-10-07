import { Loader } from '@mantine/core'
import Router from 'next/router'
import { ReactComponentLike } from 'prop-types'
import React, { useEffect, useState } from 'react'
import VerifyPage from '~/core/components/VerifyPage'
import useVerifySession from '~/data/query/useVerifySession'
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

  const verifyAuth = useVerifySession()

  useEffect(() => {
    if (verifyAuth.isLoading) {
      return
    }

    if (verifyAuth.error?.response?.status !== 401) {
      return
    }

    verifyAuth.remove()
    Router.push('/')
  }, [
    verifyAuth.error?.response?.status,
    verifyAuth.isLoading,
    verifyAuth.dataUpdatedAt,
  ])

  // authorize user
  if (verifyAuth.isLoading) {
    return <VerifyPage loading={verifyAuth.isLoading} />
  }

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
