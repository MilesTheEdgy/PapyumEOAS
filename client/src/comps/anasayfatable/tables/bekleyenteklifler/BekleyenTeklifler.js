import React, { useState, useEffect } from "react";
import { CDataTable, CBadge, CButton, CCollapse, CCardBody, CCol, CCard, CCardHeader, CFormGroup, CLabel, CInput, CTextarea, CRow } from "@coreui/react";
import Loader from "src/comps/loader/Loader";


const BekleyenTeklifler = () => {
    const [loading, setLoading] = useState(true)
    const [details, setDetails] = useState([])
    const [data, setData] = useState([])
  
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
    useEffect(() => {

      const fetchData = async () => {
        console.log('fetching items for BEKLEYEN teklifler')
  
        const res = await fetch(`/api/data/table/tum`, {
          headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${document.cookie.slice(11)} `
          }
        })
  
        if (res.status === 200) {
          const data = await res.json()
          setData(data)
          setLoading(false)
        }
  
        console.log('finished fetching for BEKLEYEN teklifler')
      }

      fetchData()

    }, [])
  
    return (
    <>
    <CRow>
      <CCol>
        <CLabel className = "tableLabel bekleyentekliflerGradient" >Bekleyen Teklifler</CLabel>
      </CCol>
    </CRow>
    <CRow>
      {
        loading ?
        <Loader />
        :
        <CCol>
        <div style = {{border: "solid 1px rgb(51, 153, 255, 0.35)"}} >
          <CDataTable
            header
            items={data}
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
              'birimFiyat':
              (item)=>(
                <td>
                  {item.birimFiyat} TL
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
                                    <div style = {{display: "flex", justifyContent: "space-between"}}>
                                      <p style = {{marginLeft: "15px"}} >Siz</p>
                                      <CInput style = {{maxWidth: "150px"}} type="number" placeholder="örnek: 15" autoComplete="number"/>
                                    </div>
                                  </CCol>
                                  {/* <CFormGroup row>
                                      <CCol md = "12" >
                                        <CLabel htmlFor="hf-email">BAKIYENIZDEN KESILCEK TUTAR</CLabel>
                                        <CInput type="number" id="number-input" name="number-input" placeholder="örnek: 15" autoComplete="number"/>
                                      </CCol>
                                  </CFormGroup> */}
                                  
                                </CFormGroup>
                                <CFormGroup row style = {{marginTop: "50px", display: "flex", justifyContent: "space-around"}} >
                                  <div style = {{display: "flex"}} >
                                    <CLabel>Toplam:</CLabel>
                                    <p style = {{marginLeft: "10px"}}>1000 TL</p>
                                  </div>
                                  <div style = {{display: "flex", marginLeft: "20px"}} >
                                    <CLabel>Bakiyenizden kesilecek tutar:</CLabel>
                                    <p style = {{marginLeft: "10px"}}>-1500 TL</p>
                                  </div>
                                  <div style = {{marginLeft: "20px"}} >
                                    <CButton color = "success" >Onayla</CButton>
                                  </div>
                                </CFormGroup>
                              </CCardBody>
                            </CCard>
                          </CCol>
                        </CCardBody>
                      </CCollapse>
                  )
                }
            }}
          />
        </div>
      </CCol>
      }
    </CRow>
    </>
    )
}

export default BekleyenTeklifler;