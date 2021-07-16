import React, { useState, useEffect } from "react";
import { CDataTable, CBadge, CButton, CCollapse, CCardBody, CCol, CCard, CCardHeader, CFormGroup, CLabel, CRow } from "@coreui/react";
import Loader from "src/comps/loader/Loader";
import { useSelector } from "react-redux";

function BakiyeHareketleriTable({item}) {

  const eczaneName = useSelector(state => state.user.userSettings.eczaneName)

  return (
    <CCardBody>
      <CCol xs="12" sm="12">
        <CCard>
          <CCardHeader>
          <b>TEKLIF ID: <CBadge color = "info" >{item.application_id}</CBadge></b>
          </CCardHeader>
          <CCardBody>
            <CFormGroup row>
              <CCol xs="12" md="12">
                <table className="table">
                  <thead style = {{backgroundColor: "	rgb(46, 184, 92, 0.75)"}}>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Alıcı Eczane</th>
                      <th scope="col">Adet</th>
                      <th scope="col">Bakiye</th>
                    </tr>
                  </thead>
                  <tbody>
                          <tr>
                            <th scope="row">1</th>
                            <td>{item.eczane === eczaneName ? <b>{item.eczane}</b> : <p>{item.eczane}</p>}</td>
                            <td>{item.pledge}/{item.hedef}</td>
                            <td style = {{color: "green"}}>+{item.bakiye}</td>
                          </tr>
                  </tbody>
                  <thead style = {{backgroundColor: "rgb(229, 83, 83, 0.75)"}}>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Katılan Eczaneler</th>
                      <th scope="col">Adet</th>
                      <th scope="col">Bakiye</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      item.joiners.map((obj, i) => {
                        if (obj.eczane === eczaneName)
                        return (
                            <tr key = {i} >
                              <th scope="row">{i+1}</th>
                              <td><b>{obj.eczane}</b></td>
                              <td>{obj.pledge}/{item.hedef}</td>
                              <td style = {{color: "red"}}>{obj.bakiye}</td>
                            </tr>
                        )
                        return (
                          <tr key = {i}>
                              <th scope="row">{i+1}</th>
                              <td>{obj.eczane}</td>
                              <td>{obj.pledge}/{item.hedef}</td>
                              <td style = {{color: "red"}}>{obj.bakiye}</td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
              </CCol>
            </CFormGroup>
          </CCardBody>
        </CCard>
      </CCol>
    </CCardBody>
  )
}

const eczDataBakiyehrkt = [
  {
    ID: 2,
    application_id: 43,
    İlaç: "PARACETOL",
    eczane: "Hayat Eczanesi",
    tür: "Alış",
    hedef: 80,
    pledge: 20,
    tarih: "2018/01/09",
    bakiye: -500,
    joiners: [
      {
        eczane: "İstanbul Eczanesi",
        pledge: 25,
        bakiye: -648
      },
      {
        eczane: "Samsun Eczanesi",
        pledge: 35,
        bakiye: -648 
      }
    ]
  },
  {
    ID: 3,
    application_id: 38,
    İlaç: "PARACETOL",
    eczane: "İstanbul Eczanesi",
    tür: "Satış",
    hedef: 100,
    pledge: 35,
    tarih: "2018/01/09",
    bakiye: 500,
    joiners: [
      {
        eczane: "Gül Eczanesi",
        pledge: 25,
        bakiye: -648
      },
      {
        eczane: "Başak Eczanesi",
        pledge: 35,
        bakiye: -648 
      }
    ]
  },
]

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
        case 'Alış': return
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
        const res = await fetch(`/api/data/table/hareket`, {
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
      <Loader isLoading = {loading} >
          <CCol>
          <div style = {{border: "solid 1px rgb(249, 177, 21, 0.35)"}} >
            <CDataTable
              header
              items={eczDataBakiyehrkt}
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
                          <BakiyeHareketleriTable item = {item} />
                        </CCollapse>
                    )
                  }
              }}
            />
          </div>
        </CCol>
      </Loader>
    </CRow>
    </>
    )
}

export default BakiyeHareketleriniz;