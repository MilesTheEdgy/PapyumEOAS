import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { 
  TheHeaderDropdown,
  TheHeaderDropdownNotif
}  from './index'

import "./theheader.css"

const TheHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector(state => state.sidebarShow)
  const userInfo = useSelector(state => state.user.userInfo)
  const toggleSidebar = () => {
    const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive'
    dispatch({type: 'set', sidebarShow: val})
  }

  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive'
    dispatch({type: 'set', sidebarShow: val})
  }

  return (
    <CHeader>
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />
      <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={toggleSidebar}
      />
      <CHeaderBrand className="mx-auto d-lg-none" to="/">
        <CIcon name="logo" height="48" alt="Logo"/>
      </CHeaderBrand>

      <CHeaderNav className="d-md-down-none mr-auto">
        <CHeaderNavItem className="px-3" >
          <CHeaderNavLink className = "anaSayfa-mr" to="/dashboard">Ana Sayfa</CHeaderNavLink>
        </CHeaderNavItem>
        <CHeaderNavItem  className="px-3">
          <CHeaderNavLink to="/users">Eczaneler</CHeaderNavLink>
        </CHeaderNavItem>
      </CHeaderNav>

      <CHeaderNav>
        <TheHeaderDropdownNotif/>
      </CHeaderNav>

      <CHeaderNav className = "align-items-center " >
          <strong className = "px-3" >Bakiye:</strong>
          <strong className = "success" color = "success" > {userInfo.bakiye} TL</strong>
      </CHeaderNav>

      <CHeaderNav className="px-3">
        {/* <TheHeaderDropdownTasks/> */}
        {/* <TheHeaderDropdownMssg/> */}
        <TheHeaderDropdown/>
      </CHeaderNav>      
    </CHeader>
  )
}

export default TheHeader
