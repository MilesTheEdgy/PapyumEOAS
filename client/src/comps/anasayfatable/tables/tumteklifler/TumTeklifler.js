import React, { useEffect, useState } from "react";
import { CDataTable, CBadge, CButton, CCollapse, CCardBody, CCol, CCard, CCardHeader, CFormGroup, CLabel, CInput, CTextarea, CRow } from "@coreui/react";
import Loader from "src/comps/loader/Loader";
import { useSelector } from "react-redux";
import { isBelow0 } from "src/comps/helperfunctions/helperfunctions";


const TekliflerCollapseJoin = ({item, index, setOrder, total, bakiyeSonra}) => {
  return (
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
                rows="7"
                value = "Birşeyler yapalım arkadaşlar xDDD"
                readOnly
              />
            </CCol>
            <CCol xs="12" md="6">
              <CLabel>Katılanlar:</CLabel>
              <table className = "table table-striped" style = {{textAlign: "center", verticalAlign: "middle"}} >
                <tbody>
                  <tr>
                    <td><b>Hayat Eczanesi</b></td>
                    <td><h5>15/20</h5></td>
                  </tr>
                  <tr>
                    <td><b>Başka Eczanesi</b></td>
                    <td><h5>5/20</h5></td>
                  </tr>
                </tbody>
              </table>
              <div style = {{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <h5 style = {{marginLeft: "15px"}} >Siz</h5>
                <CInput style = {{maxWidth: "150px", marginLeft: "20px"}} type="number" placeholder="örnek: 15" 
                onChange = {e => setOrder(e.target.value)} />
              </div>
            </CCol>
          </CFormGroup>
          <CFormGroup row style = {{marginTop: "50px", display: "flex", justifyContent: "space-around"}} >
            <div style = {{display: "flex"}} >
              <CLabel>Toplam:</CLabel>
              <p style = {{marginLeft: "10px"}}> <b> {total} TL</b></p>
            </div>
            <div style = {{display: "flex", marginLeft: "20px"}} >
              <CLabel>Sipraişten Sonra Bakiyeniz:</CLabel>
              <p style = {{marginLeft: "10px", color: isBelow0(bakiyeSonra) }}>{bakiyeSonra} TL</p>
            </div>
            <div style = {{marginLeft: "20px"}} >
              <CButton color = "success" onClick = {() => console.log("item is: ", item, "and index is: ", index)} >Onayla</CButton>
            </div>
          </CFormGroup>
        </CCardBody>
      </CCard>
    </CCol>
  </CCardBody>
  )
}

const TekliflerCollapseMine = ({item, index, setOrder, total, bakiyeSonra}) => {
  return (
    <CCardBody>
    <CCol xs="12" sm="12">
      <CCard>
        <CCardHeader>Detaylar</CCardHeader>
        <CCardBody>
          <CFormGroup row>
            <CCol xs="12" md="6">
              <CLabel htmlFor="textarea-input">Açıklamanız:</CLabel>
              <CTextarea 
                name="textarea-input" 
                id="textarea-input" 
                rows="7"
                value = "Birşeyler yapalım arkadaşlar xDDD"
                readOnly
              />
            </CCol>
            <CCol xs="12" md="6">
              <CLabel>Katılanlar:</CLabel>
              <table className = "table table-striped" style = {{textAlign: "center", verticalAlign: "middle"}} >
                <tbody>
                  <tr>
                    <td><b>Hayat Eczanesi</b></td>
                    <td><h5>15/20</h5></td>
                  </tr>
                  <tr>
                    <td><b>Başka Eczanesi</b></td>
                    <td><h5>5/20</h5></td>
                  </tr>
                </tbody>
              </table>
              <div style = {{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <h5 style = {{marginLeft: "15px"}} >Siz</h5>
                <CInput style = {{maxWidth: "150px", marginLeft: "20px"}} type="number" placeholder="örnek: 15" 
                onChange = {e => setOrder(e.target.value)} />
              </div>
            </CCol>
          </CFormGroup>
          <CFormGroup row style = {{marginTop: "50px", display: "flex", justifyContent: "space-around"}} >
            <div style = {{display: "flex"}} >
              <CLabel>Toplam:</CLabel>
              <p style = {{marginLeft: "10px"}}> <b> {total} TL</b></p>
            </div>
            <div style = {{display: "flex", marginLeft: "20px"}} >
              <CLabel>Sipraişten Sonra Bakiyeniz:</CLabel>
              <p style = {{marginLeft: "10px", color: isBelow0(bakiyeSonra) }}>{bakiyeSonra} TL</p>
            </div>
            <div style = {{marginLeft: "20px"}} >
              <CButton color = "success" onClick = {() => console.log("item is: ", item, "and index is: ", index)} >Onayla</CButton>
            </div>
          </CFormGroup>
        </CCardBody>
      </CCard>
    </CCol>
  </CCardBody>
  )
}

const TumTeklifler = () => {

    const whichCollapsedToRender = (reduxUser, dataUser, item, index) => {
      if (reduxUser === dataUser) {
        return <TekliflerCollapseMine item = {item} index = {index} setOrder = {setOrder} total = {total} bakiyeSonra = {bakiyeSonra} />
      } else {
        return <TekliflerCollapseJoin item = {item} index = {index} setOrder = {setOrder} total = {total} bakiyeSonra = {bakiyeSonra} />
      }
    }
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [details, setDetails] = useState([])
    const [clickedItemIndex, setClickedItemIndex] = useState(0)
    const [order, setOrder] = useState(0)
    const [total, setTotal] = useState(0)
    const [bakiyeSonra, setBakiyeSonra] = useState(0)
    
    const eczaneName = useSelector(state => state.user.userSettings.eczaneName)
    const bakiye = useSelector(state => state.user.userInfo.bakiye)
  
    const toggleDetails = (index) => {
      const position = details.indexOf(index)
      let newDetails = details.slice()
      if (position !== -1) {
        newDetails.splice(position, 1)
      } else {
        setOrder(0);
        setTotal(0);
        setBakiyeSonra(0);
        newDetails = [index]
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
        console.log('fetching items for TUM teklifler')
  
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
  
        console.log('finished fetching for TUM teklifler')
      }

      fetchData()

    }, [])

    useEffect(() => {
      if (order > 0) {
        // console.log("order is: ", order, "and birimFiyat is: ", data[clickedItemIndex].birimFiyat);
        setTotal(order * data[clickedItemIndex].birimFiyat)
        // console.log('changing total to: ', total)
        setBakiyeSonra(bakiye - total)
      }
    }, [order, total, clickedItemIndex, bakiye, data])
  
    return (
      <>
      <CRow>
        <CCol>
          <CLabel className = "tableLabel tumtekliflerGradient" >Tüm Teklifler</CLabel>
        </CCol>
      </CRow>
      <CRow>
      {
          loading ?
          <Loader />
          :
          <CCol>
            <div style = {{border: "solid 1px rgb(229, 83, 83, 0.35)"}} >
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
                            onClick={()=>{
                              toggleDetails(index)
                              setClickedItemIndex(index)
                              }}
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
                          {whichCollapsedToRender(eczaneName, item.eczane, item, index)}
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

export default TumTeklifler;