import React, { lazy } from 'react'

const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.js'))
const AnasayfaTable = lazy(() => import('../../../src/comps/anasayfatable/AnasayfaTable'));


const Dashboard = () => {
  return (
    <>
      <WidgetsDropdown />
      <AnasayfaTable />
    </>
  )
}

export default Dashboard
