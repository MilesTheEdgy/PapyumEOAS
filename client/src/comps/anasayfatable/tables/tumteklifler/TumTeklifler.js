import React, { useState } from "react";
import { CDataTable, CBadge, CButton, CCollapse, CCardBody, CCol, CCard, CCardHeader, CFormGroup, CLabel, CInput, CTextarea } from "@coreui/react";

const eczData = [
    {
        id: 0,
        eczane: "Hayat Eczanesi",
        İlaç: "PARACETOL",
        hedef: "20/50",
        kampanya: "15 + 4",
        birimFiyat: "39 TL",
        sonTarih: "2018/01/09",
        durum: "beklemede"
    },
    {
        id: 1,
        eczane: "Birgül Eczanesi",
        İlaç: "STEROIDS",
        hedef: "15/25",
        kampanya: "15 + 4",
        birimFiyat: "16 TL",
        sonTarih: "2018/01/01",
        durum: "beklemede"
    },
    {
        id: 2,
        eczane: "Dolmuş Eczanesi",
        İlaç: "FAKE JUICE",
        hedef: "69/100",
        kampanya: "15 + 4",
        birimFiyat: "99 TL",
        sonTarih: "2018/04/25",
        durum: "beklemede"
    },
    {
        id: 3,
        eczane: "Başka Eczanesi",
        İlaç: "BAŞKAMAMOL",
        hedef: "13/46",
        kampanya: "15 + 4",
        birimFiyat: "498 TL",
        sonTarih: "2018/08/01",
        durum: "beklemede"
    },
    {
      id: 4,
      eczane: "Hayat Eczanesi",
      İlaç: "PARACETOL",
      hedef: "20/50",
      kampanya: "15 + 4",
      birimFiyat: "39 TL",
      sonTarih: "2018/01/09",
      durum: "beklemede"
  },
  {
      id: 5,
      eczane: "Birgül Eczanesi",
      İlaç: "STEROIDS",
      hedef: "15/25",
      kampanya: "15 + 4",
      birimFiyat: "16 TL",
      sonTarih: "2018/01/01",
      durum: "beklemede"
  },
  {
      id: 6,
      eczane: "Dolmuş Eczanesi",
      İlaç: "FAKE JUICE",
      hedef: "69/100",
      kampanya: "15 + 4",
      birimFiyat: "99 TL",
      sonTarih: "2018/04/25",
      durum: "beklemede"
  },
  {
      id: 7,
      eczane: "Başka Eczanesi",
      İlaç: "BAŞKAMAMOL",
      hedef: "13/46",
      kampanya: "15 + 4",
      birimFiyat: "498 TL",
      sonTarih: "2018/08/01",
      durum: "beklemede"
  }
]


const TumTeklifler = () => {
    const [details, setDetails] = useState([])
    // const [items, setItems] = useState(usersData)
  
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
      { key: 'eczane', _style: { width: '10%'} },
      { key: 'İlaç', _style: { width: '30%'} },
      'hedef',
      'birimFiyat',
      'kampanya',
      'sonTarih',
      'durum',
      {
        key: 'show_details',
        label: '',
        _style: { width: '1%' },
        sorter: false,
        filter: false
      }
    ]
  
    const getBadge = (status)=>{
      switch (status) {
        case 'Active': return 'success'
        case 'Inactive': return 'secondary'
        case 'beklemede': return 'warning'
        case 'Banned': return 'danger'
        default: return 'primary'
      }
    }
  
    return (
    <>
      <CLabel>Tüm Teklifler</CLabel>
      <CDataTable
        header
        items={eczData}
        fields={fields}
        columnFilter
        footer
        itemsPerPage={50}
        hover
        sorter
        pagination
        border
        scopedSlots = {{
          'eczane':
            (item)=>(
              <td style = {{fontSize: "12px"}} >
                  {item.eczane}
              </td>
            ),
          'İlaç':
          (item)=>(
            <td>
               <b>{item.İlaç}</b>
            </td>
            ),
          'hedef':
            (item)=>(
              <td>
                <CBadge color={"secondary"}>
                  {item.hedef}
                </CBadge>
              </td>
            ),
          'kampanya':
          (item)=>(
            <td style = {{color: "green"}} >
                {item.kampanya}
            </td>
          ),
          'durum':
            (item)=>(
              <td>
                <CBadge color={getBadge(item.durum)}>
                  {item.durum}
                </CBadge>
              </td>
            ),
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
                    {details.includes(index) ? 'Sakla' : 'Göster'}
                  </CButton>
                </td>
                )
            },
          'details':
              (item, index)=>{
                return (
                  <CCollapse show={details.includes(index)}>
                    <CCardBody>
                      <CCol xs="12" sm="12">
                        <CCard>
                          <CCardHeader>Detaylar</CCardHeader>
                          <CCardBody>
                            <CFormGroup row>
                              <CCol xs="12" md="6">
                                <CLabel htmlFor="textarea-input">Açıklama:</CLabel>
                                <CTextarea 
                                  name="textarea-input" 
                                  id="textarea-input" 
                                  rows="9"
                                  placeholder="Birşeyler yapalım arkadaşlar xDDD" 
                                />
                              </CCol>
                              <CCol xs="12" md="6">
                                <CLabel>Katılanlar:</CLabel>
                                <table className = "table">
                                  <tbody>
                                    <tr>
                                      <td>Hayat Eczanesi</td>
                                      <td>15/20</td>
                                    </tr>
                                    <tr>
                                      <td>Başka Eczanesi</td>
                                      <td>5/20</td>
                                    </tr>
                                  </tbody>
                                </table>
                                <CFormGroup row className = "justify-content-end" >
                                  <CCol md = "3" className = "ansayfaTalepFormControl">
                                    <CLabel htmlFor="hf-email">Siz</CLabel>
                                    <CInput className = "anasayfaClientAdetInput" type="number" id="number-input" name="number-input" placeholder="örnek: 15" autoComplete="number"/>
                                  </CCol>
                                </CFormGroup>
                              </CCol>
                              <CFormGroup row className = "justify-content-end" >
                                  <CCol md = "3" className = "ansayfaTalepFormControl">
                                    <CLabel htmlFor="hf-email">BAKIYENIZDEN KESILCEK TUTAR</CLabel>
                                    <CInput className = "anasayfaClientAdetInput" type="number" id="number-input" name="number-input" placeholder="örnek: 15" autoComplete="number"/>
                                  </CCol>
                              </CFormGroup>
                              
                            </CFormGroup>
                            <CFormGroup row className = "justify-content-end" >
                              <CCol md = "1" >
                                <CButton color = "success" >Onayla</CButton>
                              </CCol>
                            </CFormGroup>
                            {/* <CFormGroup row className = "justify-content-end" >
                              <CCol md = "2" className = "ansayfaTalepFormControl">
                                <CLabel htmlFor="hf-email">Siz</CLabel>
                                <CInput className = "anasayfaClientAdetInput" type="number" id="number-input" name="number-input" placeholder="örnek: 15" autoComplete="number"/>
                              </CCol>
                              <CCol md = "2">
                                <CButton color = "success" >Onayla</CButton>
                              </CCol>
                            </CFormGroup> */}
                          </CCardBody>
                        </CCard>
                      </CCol>
                    </CCardBody>
                  </CCollapse>
              )
            }
        }}
      />
    </>
    )
}

export default TumTeklifler;