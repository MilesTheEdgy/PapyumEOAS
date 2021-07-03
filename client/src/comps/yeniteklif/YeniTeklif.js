import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow
} from '@coreui/react'

const Modals = () => {
  const yeniTeklifModal = useSelector(state => state.modals.yeniTeklifModal)
  const dispatch = useDispatch()
  return (
    <CModal 
        centered
        show={yeniTeklifModal} 
        onClose={() => dispatch({type: "YENI_TEKLIF_OFF"})}
        size="lg"
      >
        <CModalHeader closeButton>
          <CModalTitle>Modal title</CModalTitle>
        </CModalHeader>
        <CModalBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
          et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </CModalBody>
        <CModalFooter>
          <CButton color="primary">Do Something</CButton>{' '}
          <CButton color="secondary" onClick={() => dispatch({type: "YENI_TEKLIF_OFF"})}>Cancel</CButton>
        </CModalFooter>
      </CModal>
  )
}

export default Modals
