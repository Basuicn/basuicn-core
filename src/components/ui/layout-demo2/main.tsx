import React from 'react'
import Layout from './layout'

const Main = ({ children }: { children: React.ReactNode }) => {
  return (
    <Layout>
        {children}
    </Layout>
  )
}

export default Main