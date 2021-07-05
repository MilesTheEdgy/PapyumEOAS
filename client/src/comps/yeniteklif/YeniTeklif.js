import React from 'react'
import { useSelector, useDispatch } from "react-redux"
import {
  CButton,
  CCol,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CFormGroup,
  CLabel,
  CInput,
  CForm,
  CFormText,
  CTextarea,
  CInputRadio
} from '@coreui/react'
import "./yeniteklif.css"

const dummy = ["Chocolate", "Coconut", "Mint", "Strawberry", "Vanilla"]

const setAdetFiyat = (e, hedef, setToplamState) => {
  const value = e.target.value;
  setToplamState(hedef * value)
}

const validateUrunAdi = (e, valState, setState, data) => {
  const input = e.target.value
  setState(input)
  for (let i = 0; i < data.length; i++) {
    if (input.toLowerCase() === data[i].toLowerCase()) {
      return valState({valid: true, invalid: false})
    } else {
      return valState({valid: false, invalid: true})      
    }
  }
}

const validateNumInput = (e, valState, setState) => {
  const input = e.target.value
  setState(input)
  if (input > 0) {
    return valState({valid: true, invalid: false})
  } else {
    return valState({valid: false, invalid: true})     
  }
}

const YeniTeklif = () => {
  
  const [sart, setSart] = React.useState(false)
  const [input1, valInput1] = React.useState({valid: false, invalid: true})
  const [input2, valInput2] = React.useState({valid: false, invalid: true})
  const [input3, valInput3] = React.useState({valid: false, invalid: true})
  const [input4, valInput4] = React.useState({valid: false, invalid: true})
  const [input5, valInput5] = React.useState({valid: false, invalid: true})
  const [inp1, setinp1] = React.useState("")
  const [inp2, setinp2] = React.useState(0)
  const [inp3, setinp3] = React.useState(0)
  const [inp4, setinp4] = React.useState("")
  const [inp5, setinp5] = React.useState("")

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
            <CFormGroup row className = "justify-content-center align-items-start" style = {{marginTop: "20px"}} > 
              <CCol md="2">
                <CLabel htmlFor="text-input" ><b> Ürün Adı</b></CLabel>
              </CCol>
              <CCol xs="12" md="6">
                <CInput list = "medicine-list" placeholder="İlaç ismini giriniz" {...input1}
                 onChange = {(e) => validateUrunAdi(e, valInput1, setinp1, dummy)}/>
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
                <CLabel htmlFor="text-input"><b> Hedef</b></CLabel>
              </CCol>
              <CCol md="2">
                <CInput {...input2} type = "number" onChange = {(e) => validateNumInput(e, valInput2, setinp2)} />
                <CFormText>Ulaşmak istediğiniz alım hedefi</CFormText>
              </CCol>
            </CFormGroup>

            <div className = "splitterBorder"></div>

            <CFormGroup row className = "justify-content-start align-items-start" >
              <CCol md="2">
                <CLabel><b> Depo fiyatı</b></CLabel>
              </CCol>
              <CCol md="4">
                <div className = "row">
                  <div className = "col-md-6">
                    <CLabel htmlFor="text-input">Her adet</CLabel>
                  </div>
                  <div className = "col-md-6">
                    <CInput placeholder="örn: 65" defaultValue = {null} onChange = {(e) => setAdetFiyat(e, input2, setinp3)} />
                    <CFormText>Birim fiyatını giriniz</CFormText>
                  </div>
                </div>
                <div className = "row">
                  <div className = "col-md-6">
                    <CLabel htmlFor="text-input" >Toplam</CLabel>
                  </div>
                  <div className = "col-md-6">
                    <CInput placeholder="örn: 890" defaultValue = {null} />
                    <CFormText>Toplam fiyatını giriniz</CFormText>
                  </div>
                </div> 
              </CCol>
              <CCol md = "1">
              </CCol>

              <CCol md="5">
                <div className = "row">
                  <div className = "col-md-6">
                    <CLabel><b> Alım şartı</b></CLabel>
                  </div>
                  <div className = "col-md-6">
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio custom id="inline-radio1" name="inline-radios" value="option1" onClick = {() => setSart(true)} />
                      <CLabel variant="custom-checkbox" htmlFor="inline-radio1">Var</CLabel>
                    </CFormGroup>
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio custom id="inline-radio2" name="inline-radios" value="option2" onClick = {() => setSart(false)} />
                      <CLabel variant="custom-checkbox" htmlFor="inline-radio2">Yok</CLabel>
                    </CFormGroup>
                  </div>
                </div>
                <div className =  {`${sart ? "" : "hidden"} row align-items-center`}>
                  <div className = "col-md-6">
                    <CLabel htmlFor="text-input"><b> Şartı</b></CLabel>
                  </div>
                  <div className = "col-md-6">
                    <div style = {{display: "flex", alignItems: "center"}} >
                      <input style = {{maxWidth : "50px", maxHeight: "30px"}} className = "form-control" placeholder = "70" />
                      <p style = {{fontSize : "25px", marginTop: "15px"}} >+</p>
                      <input style = {{maxWidth : "50px", maxHeight: "30px"}} className = "form-control" placeholder = "8" />
                    </div>
                  </div>
                </div>
              </CCol>
            </CFormGroup>
            
            <div className = "splitterBorder"></div>

            <CFormGroup row>
              <CCol md="2">
                <CLabel htmlFor="textarea-input"><b>Açıklama</b></CLabel>
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
                <CLabel htmlFor="date-input"><b>Bitiş tarih</b></CLabel>
                <CInput type="date" id="date-input" name="date-input" />
              </CCol>
            </CFormGroup>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick = {() => console.log(inp1, inp2, inp3)} >Teklif oluştur</CButton>
          <CButton color="secondary" onClick={() => dispatch({type: "YENI_TEKLIF_OFF"})}>İptal et</CButton>
        </CModalFooter>
      </CModal>
  )
}

export default YeniTeklif
