import React, { useState } from "react";
import { CDataTable, CBadge, CButton, CCollapse, CCardBody, CCol, CCard, CCardHeader, CFormGroup, CLabel, CInput, CTextarea, CRow } from "@coreui/react";
import "./anasayfatable.css"

const usersData = [
    {id: 0, name: 'Hayat Eczanesi', registered: '2018/01/01', role: 'Guest', status: 'Pending', som: "blah", some: "bloh"},
    {id: 1, name: 'Samppa Nori', registered: '2018/01/01', role: 'Member', status: 'Active'},
    {id: 2, name: 'Estavan Lykos', registered: '2018/02/01', role: 'Staff', status: 'Banned'},
    {id: 3, name: 'Chetan Mohamed', registered: '2018/02/01', role: 'Admin', status: 'Inactive'},
    {id: 4, name: 'Derick Maximinus', registered: '2018/03/01', role: 'Member', status: 'Pending'},
    {id: 5, name: 'Friderik Dávid', registered: '2018/01/21', role: 'Staff', status: 'Active'},
    {id: 6, name: 'Yiorgos Avraamu', registered: '2018/01/01', role: 'Member', status: 'Active'},
    {id: 7, name: 'Avram Tarasios', registered: '2018/02/01', role: 'Staff', status: 'Banned'},
    {id: 8, name: 'Quintin Ed', registered: '2018/02/01', role: 'Admin', status: 'Inactive'},
    {id: 9, name: 'Enéas Kwadwo', registered: '2018/03/01', role: 'Member', status: 'Pending'},
    {id: 10, name: 'Agapetus Tadeáš', registered: '2018/01/21', role: 'Staff', status: 'Active'},
    {id: 11, name: 'Carwyn Fachtna', registered: '2018/01/01', role: 'Member', status: 'Active'},
    {id: 12, name: 'Nehemiah Tatius', registered: '2018/02/01', role: 'Staff', status: 'Banned'},
    {id: 13, name: 'Ebbe Gemariah', registered: '2018/02/01', role: 'Admin', status: 'Inactive'},
    {id: 14, name: 'Eustorgios Amulius', registered: '2018/03/01', role: 'Member', status: 'Pending'},
    {id: 15, name: 'Leopold Gáspár', registered: '2018/01/21', role: 'Staff', status: 'Active'},
    {id: 16, name: 'Pompeius René', registered: '2018/01/01', role: 'Member', status: 'Active'},
    {id: 17, name: 'Paĉjo Jadon', registered: '2018/02/01', role: 'Staff', status: 'Banned'},
    {id: 18, name: 'Micheal Mercurius', registered: '2018/02/01', role: 'Admin', status: 'Inactive'},
    {id: 19, name: 'Ganesha Dubhghall', registered: '2018/03/01', role: 'Member', status: 'Pending'},
    {id: 20, name: 'Hiroto Šimun', registered: '2018/01/21', role: 'Staff', status: 'Active'},
    {id: 21, name: 'Vishnu Serghei', registered: '2018/01/01', role: 'Member', status: 'Active'},
    {id: 22, name: 'Zbyněk Phoibos', registered: '2018/02/01', role: 'Staff', status: 'Banned'},
    {id: 23, name: 'Aulus Agmundr', registered: '2018/01/01', role: 'Member', status: 'Pending'},
    {id: 42, name: 'Ford Prefect', registered: '2001/05/25', role: 'Alien', status: 'Don\'t panic!'}
  ]
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


const AnasayfaTable = () => {
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
      <CDataTable
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
    )
}

export default AnasayfaTable;