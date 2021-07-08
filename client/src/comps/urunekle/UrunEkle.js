import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CCollapse,
  CFormGroup,
  CTextarea,
  CInput,
  CLabel,
  CAlert,
  CDataTable
} from '@coreui/react'

import "./urunekle.css"

// object keys:
// ID İlaç eklendiğiTarih ekleyenEczane

const UrunEkle = () => {
    const [details, setDetails] = React.useState([])
    const [form, showForm] = React.useState(false)
  
    const toggleDetails = (index) => {
      const position = details.indexOf(index)
      let newDetails = details.slice()
      if (position !== -1) {
        newDetails.splice(position, 1)
      } else {
        newDetails = [...details, index]
      }
      setDetails(newDetails)
    }

    const fields = [
        'İlaç',
        'eklendiğiTarih',
        'ekleyenEczane',
        {
            key: 'show_details',
            label: '',
            _style: { width: '1%' },
            sorter: false,
            filter: false
        }
     ]

  return (
    <>
    <CCard>
        <CCardHeader>
            Ürün
            <small> ekle</small>
        </CCardHeader>
        <CCardBody>
        <CAlert color="danger">
            Lütfen yeni bir ürün eklemeden, önce ÜRÜN SORGULAMA yaparak ürünün eklenmiş durumunu öğrenin.
        </CAlert>
        <CLabel>ÜRÜN SORGULAMA</CLabel>
        <CDataTable
              tableFilter
            //   items={usersData}
              fields={fields}
              itemsPerPage={5}
              pagination
              scopedSlots = {{
                'show_details':
                    (item, index)=>{
                    return (
                        <td className="py-2">
                        <CButton
                            color="primary"
                            variant="outline"
                            shape="square"
                            size="sm"
                            onClick={()=>{toggleDetails(index)}}
                        >
                            {details.includes(index) ? 'Sakla' : 'Açıklama'}
                        </CButton>
                        </td>
                        )
                    },
                'details':
                    (item, index)=>{
                        return (
                        <CCollapse show={details.includes(index)}>
                            <CCardBody>
                                <b>Birşeyler için yarar, çok güzel bir ilaç. Tavsiye ederim. Doktorun söyledikleri</b>
                            </CCardBody>
                        </CCollapse>
                        )
                    }
                }}
        />
        <CButton color = "warning" onClick = {() => showForm(true)} >Ürününz bulunmadı mı?</CButton>

        <div className = {`${form ? "" : "hidden"}`}>
            <div className = "split-margin"></div>
            <CFormGroup row>
                <CCol md = "6">
                    <CLabel htmlFor="company">Ürün</CLabel>
                    <CInput id="company" placeholder="Eklemek istediğiniz ürünü yazın" />
                </CCol>
                <CCol md = "6">
                    <CLabel htmlFor="vat">Açıklama</CLabel>
                    <CTextarea 
                        name="textarea-input" 
                        id="textarea-input" 
                        rows="6"
                        placeholder="Eklemek istediğiniz ürünün hakkında kısa bir açıklama yazın..." 
                    />
                </CCol>
            </CFormGroup>
            <CFormGroup row>
                <CCol md = "1" className = "ml-auto justify-content-end" >
                    <CButton color = "success" >Onayla</CButton>
                </CCol>
            </CFormGroup>
        </div>
        </CCardBody>
    </CCard>
    </>
  )
}

export default UrunEkle
