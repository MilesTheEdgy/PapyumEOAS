import React, { useEffect, useState } from "react";
import { CDataTable, CBadge, CButton, CCollapse, CCardBody, CCol, CCard, CCardHeader, CLabel, CRow } from "@coreui/react";
import Loader from "src/comps/loader/Loader";
import { useSelector } from "react-redux";
import { fields, getBadge, toggleDetails, whichCollapsedToRender } from "../";
import "../style.css"

const SizinTeklifleriniz = () => {

  
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [details, setDetails] = useState([])
    const [clickedItemIndex, setClickedItemIndex] = useState(0)
    const [order, setOrder] = useState(0)
    const [total, setTotal] = useState(0)
    const [bakiyeSonra, setBakiyeSonra] = useState(0)
    
    const eczaneName = useSelector(state => state.user.userSettings.eczaneName)
    const bakiye = useSelector(state => state.user.userInfo.bakiye)
  

    useEffect(() => {
      const fetchData = async () => {
        console.log('fetching items for SIZIN teklifler')
  
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
  
        console.log('finished fetching for SIZIN teklifler')
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
          <CLabel className = "tableLabel sizintekliflerinizGradient" >Sizin Teklifleriniz</CLabel>
        </CCol>
      </CRow>
      <CRow>
      {
          loading ?
          <Loader />
          :
          <CCol>
            <div style = {{border: "solid 1px rgb(50, 31, 219, 0.35)"}} >
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
                                  {whichCollapsedToRender(eczaneName, item.eczane, item, index, setOrder, total, bakiyeSonra)}
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

export default SizinTeklifleriniz;