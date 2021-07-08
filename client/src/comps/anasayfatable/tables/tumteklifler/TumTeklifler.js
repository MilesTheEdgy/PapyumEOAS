import React, { useEffect, useState, useReducer } from "react";
import { CDataTable, CBadge, CButton, CCollapse, CCardBody, CCol, CCard, CCardHeader, CFormGroup, CLabel, CInput, CTextarea, CRow } from "@coreui/react";
import Loader from "src/comps/loader/Loader";
import { useSelector } from "react-redux";
import { isBelow0, toggleDetails } from "../";
import "../style.css"

const initialState = {
  rows: [],
  totalPledges: 0
}

const reducer = (state, action) => {
  switch(action.type) {
    
    case "TOGGLE_CLASS":
      console.log('prev state is: ', state.rows)
      const index = state.rows.findIndex(row => row.name ===action.payload)
      const newArray = [...state.rows]
      newArray[index].clicked = !state.rows[index].clicked
      console.log('new state is: ', newArray)
      return {
        ...state,
        rows: newArray,
      }

    case "ADD_ROW":
      return {
        ...state,
        rows: [
          ...state.rows,
          action.payload
        ]
      }
    case "HEDEF_HESAPLA":
      const toplamHedef = state.rows.reduce((accumulator, current) => accumulator + current.pledged, 0);
      return {
        ...state,
        totalPledges: toplamHedef
      }
    
    default:
      return state
  }
}

const TekliflerCollapseJoin = ({item, index, setOrder, total, bakiyeSonra}) => {
  return (
        <>
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
        </>
  )
}

const TekliflerCollapseMine = ({item, index, setOrder, total, bakiyeSonra}) => {
  
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    console.log(item);
    const { katılanlar } = item
    for (let i = 0 ; i < item.katılanlar.length; i++) {
      dispatch({type: "ADD_ROW", payload: {...katılanlar[i], clicked: false}})
      dispatch({type: "HEDEF_HESAPLA"})
    }
    //eslint-disable-next-lineDELETETHISWORD
  }, [])

  return (
        <>
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
              <div style = {{display: "flex"}} >
              <h5 style = {{margin: "20px 0px 0px 20px", borderBottom: "1px solid gray"}} >Hedefe kalan adet:</h5>
              <h4 style = {{margin: "20px 0px 0px 20px", color: "#321fdb"}}>{item.hedef - state.totalPledges}</h4>
              </div>
            </CCol>
            <CCol xs="12" md="6">
              <CLabel>Katılanlar:</CLabel>
              <table className = "table table-striped" style = {{textAlign: "center", verticalAlign: "middle"}} >
                <tbody>
                  {
                item.katılanlar.map((element, i) => {
             return <tr key = {i} style = {{backgroundColor: state.rows[i]?.clicked? "rgba(18, 54, 216, 0.514)" : "", color: "black"}} >
                      <td><input type="checkbox" id='joiner1' name={element.name}
                       onChange = {(e) => {
                         dispatch({type: "TOGGLE_CLASS", payload: e.target.name})
                         }} /></td>
                      <td><label htmlFor = "joiner1"><b>{element.name}</b></label></td>
                      <td><h5>{element.pledged} / {item.hedef}</h5></td>
                    </tr>
                    })
                  }
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
        </>
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
        setTotal(order * data[clickedItemIndex].birimFiyat)
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
                        {item.pledge}/{item.hedef}
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
                              toggleDetails(index, details, setDetails, setOrder, setTotal, setBakiyeSonra)
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
                          <CCardBody>
                            <CCol xs="12" sm="12">
                              <CCard>
                                <CCardHeader>Detaylar</CCardHeader>
                                <CCardBody>
                                  {whichCollapsedToRender(eczaneName, item.eczane, item, index)}
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

export default TumTeklifler;