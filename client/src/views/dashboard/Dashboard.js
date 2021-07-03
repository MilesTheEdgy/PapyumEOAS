import React, { lazy } from 'react'

const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.js'))
const AnasayfaTable = lazy(() => import('../../../src/comps/anasayfatable/AnasayfaTable'));
const YeniTeklif = lazy(() => import('../../../src/comps/yeniteklif/YeniTeklif'));


const Dashboard = () => {
  return (
    <>
      <WidgetsDropdown />
      <AnasayfaTable />
      <YeniTeklif />
    </>
  )
}

export default Dashboard
