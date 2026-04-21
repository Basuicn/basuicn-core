import React from 'react'
import Layout from './layout'

const Main = ({ children }: { children: React.ReactNode }) => {
  return (
    <Layout>
      <main className="flex-1 p-6">
        {children}
      </main>
    </Layout>
  )
}

export default Main