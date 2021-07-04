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
  CRow,
  CFormGroup,
  CLabel,
  CInput,
  CSelect,
  CForm,
  CFormText,
  CTextarea,
  CSwitch,
  CInputRadio,
  CInputCheckbox,
  CInputFile,
  CCardFooter
} from '@coreui/react'

import "./yeniteklif.css"

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
          <CModalTitle>Yeni Teklif Oluştur</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm className="form-horizontal">
            <CFormGroup row>
              <CCol md="2">
                <CLabel htmlFor="text-input">Ürün Adı</CLabel>
              </CCol>
              <CCol xs="12" md="6">
                <CInput list = "medicine-list" id="text-input" name="text-input" placeholder="İlaç ismini giriniz" />
                <datalist id = "medicine-list">
                  <option value="Chocolate" />
                  <option value="Coconut" />
                  <option value="Mint" />
                  <option value="Strawberry" />
                  <option value="Vanilla" />
                </datalist>
                <CFormText>Almak istediğiniz ürün</CFormText>
              </CCol>
              <CCol md="2">
                <CLabel htmlFor="text-input">Hedef</CLabel>
              </CCol>
              <CCol md="2">
                <CInput placeholder="örn: 65" type = "number" />
              </CCol>
            </CFormGroup>

            <CFormGroup row className = "mt-4" >
              <CCol md="4">
                <CLabel>Depo fiyatı</CLabel>
              </CCol>
              <CCol md="2">
                <CLabel htmlFor="text-input">Her adet</CLabel>
              </CCol>
              <CCol xs="12" md="2">
                <CInput id="text-input" name="text-input" placeholder="örn: 65" />
                <CFormText>Birim fiyatını giriniz</CFormText>
              </CCol>
              <CCol md="2">
                <CLabel htmlFor="text-input">Toplam</CLabel>
              </CCol>
              <CCol xs="12" md="2">
                <CInput id="text-input" name="text-input" placeholder="örn: 890" />
                <CFormText>Toplam fiyatını giriniz</CFormText>
              </CCol>
            </CFormGroup>

            <CFormGroup row className = "mt-4">
              <CCol md="2">
                <CLabel>Alım şartı</CLabel>
              </CCol>
              <CCol md="6">
                <CFormGroup variant="custom-radio" inline>
                  <CInputRadio custom id="inline-radio1" name="inline-radios" value="option1" />
                  <CLabel variant="custom-checkbox" htmlFor="inline-radio1">Var</CLabel>
                </CFormGroup>
                <CFormGroup variant="custom-radio" inline>
                  <CInputRadio custom id="inline-radio2" name="inline-radios" value="option2" />
                  <CLabel variant="custom-checkbox" htmlFor="inline-radio2">Yok</CLabel>
                </CFormGroup>
              </CCol>
              <CCol md="2">
                <CLabel htmlFor="text-input">Şartı:</CLabel>
              </CCol>
              {/*  */}
              <CCol md="2">
                <div className = "yeniteklifsartiController">
                  <input style = {{maxWidth : "50px", maxHeight: "30px"}} className = "form-control" placeholder = "70" />
                  <p style = {{fontSize : "25px"}} >+</p>
                  <input style = {{maxWidth : "50px", maxHeight: "30px"}} className = "form-control" placeholder = "8" />
                </div>
                  <CFormText>kampanyanın alım şartı</CFormText>
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="2">
                <CLabel htmlFor="textarea-input">Açıklama</CLabel>
              </CCol>
              <CCol xs="12" md="6">
                <CTextarea 
                  name="textarea-input" 
                  id="textarea-input" 
                  rows="9"
                  placeholder="Açıklamanızı giriniz..." 
                />
              </CCol>
              <CCol xs="12" md="1">
              </CCol>
              <CCol md="3">
                <CLabel htmlFor="date-input">Bitiş tarih</CLabel>
                <CInput type="date" id="date-input" name="date-input" />
              </CCol>
            </CFormGroup>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary">Teklif oluştur</CButton>
          <CButton color="secondary" onClick={() => dispatch({type: "YENI_TEKLIF_OFF"})}>İptal et</CButton>
        </CModalFooter>
      </CModal>
  )
}

export default Modals
