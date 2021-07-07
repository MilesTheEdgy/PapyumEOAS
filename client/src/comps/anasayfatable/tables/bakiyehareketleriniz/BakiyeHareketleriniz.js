import React, { useState, useEffect } from "react";
import { CDataTable, CBadge, CButton, CCollapse, CCardBody, CCol, CCard, CCardHeader, CFormGroup, CLabel, CRow } from "@coreui/react";
import Loader from "src/comps/loader/Loader";

const BakiyeHareketleriniz = () => {
    const [details, setDetails] = useState([])
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
  
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
      { key: 'ID', _style: { width: '10%'} },
      { key: 'İlaç', _style: { width: '20%'} },
      { key: 'tür'},
      'tarih',
      'bakiye',
      {
        key: 'show_details',
        label: '',
        _style: { width: '1%' },
        sorter: false,
        filter: false
      }
    ]
  
    const bakiyeBadge = (status)=>{
      switch (status) {
        case 'Satış': return 'success'
        case 'Alış': return 'danger'
        default: return 'primary'
      }
    }

    const plusOrMinus = (status) => {
      switch (status) {
        case 'Satış': return '+'
        case 'Alış': return '-'
        default: return 'bir sorun olmuştur'
      }
    }

    const turCustomizing = (tur)=>{
      switch (tur) {
        case 'Satış': return 'green'
        case 'Alış': return 'red'
        default: return ''
      }
    }

    useEffect(() => {

      const fetchData = async () => {
        console.log('fetching items for BAKİYE hareketleri')
  
        const res = await fetch(`/api/data/table/hareket`, {
          headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${document.cookie.slice(11)} `
          }
        })
  
        if (res.status === 200) {
          const data = await res.json()
          console.log(data);
          setData(data)
          setLoading(false)
        }
  
        console.log('finished fetching for BAKİYE hareketleri')
      }

      fetchData()

    }, [])
  
    return (
    <>
    <CRow>
      <CCol>
        <CLabel className = "tableLabel bakiyehareketlerinizGradient" >Bakiye Hareketleriniz</CLabel>
      </CCol>
    </CRow>
    <CRow>

      {
        loading ?
        <Loader />
        :
          <CCol>
          <div style = {{border: "solid 1px rgb(249, 177, 21, 0.35)"}} >
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
                'İlaç':
                (item)=>(
                  <td>
                    <b>{item.İlaç}</b>
                  </td>
                  ),
                'tür':
                (item)=>(
                  <td>
                    <b style = {{color: turCustomizing(item.tür)}}>{item.tür}</b>
                  </td>
                  ),
                'bakiye':
                (item)=>(
                  <td>
                    <CBadge style = {{minWidth: "50px", fontSize: "15px"}} color={bakiyeBadge(item.tür)}>
                      {plusOrMinus(item.tür)}{item.bakiye}TL
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
                                    <CCol xs="12" md="12">
                                      <CLabel
                                      style = {{display: "flex", justifyContent: "center", color: "green", fontSize: "1.25em"}}
                                      >
                                      Alıcı Eczane:
                                      </CLabel>
                                      <table className = "table">
                                        <tbody>
                                          <tr>
                                            <td><b>Hayat Eczanesi</b></td>
                                            <td>20/80</td>
                                            <td> <p style = {{color: "green"}} >+1125 TL</p></td>
                                          </tr>
                                        </tbody>
                                      </table>
                                      <CLabel
                                      style = {{display: "flex", justifyContent: "center", color: "red", fontSize: "1.1em"}}
                                      >
                                      Katılan Eczaneler:
                                      </CLabel>                                    
                                      <table className = "table">
                                        <tbody>
                                          <tr>
                                            <td>Hayat Eczanesi</td>
                                            <td>20/80</td>
                                            <td> <p style = {{color: "red"}} >-112 TL</p></td>
                                          </tr>
                                          <tr>
                                            <td>Hayat Eczanesi</td>
                                            <td>15/20</td>
                                            <td> <p style = {{color: "red"}} >-125 TL</p></td>
                                          </tr>
                                          <tr>
                                            <td>Başka Eczanesi</td>
                                            <td>5/20</td>
                                            <td> <p style = {{color: "red"}} >-115 TL</p></td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </CCol>
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

export default BakiyeHareketleriniz;