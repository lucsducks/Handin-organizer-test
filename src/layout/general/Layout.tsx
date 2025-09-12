import { Outlet } from 'react-router-dom'
import { Footer, Header } from './sections'

export function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}
