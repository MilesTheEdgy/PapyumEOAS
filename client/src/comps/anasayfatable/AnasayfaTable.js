import React, { useState } from "react";
import { CDataTable, CBadge, CButton, CCollapse, CCardBody, CRow, CCol } from "@coreui/react";
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
        İlaç: "paracetol",
        hedef: "20/50",
        birimFiyat: 39,
        sonTarih: "2018/01/09",
        durum: "beklemede"
    },
    {
        id: 1,
        eczane: "Birgül Eczanesi",
        İlaç: "Steroids",
        hedef: "15/25",
        birimFiyat: 16,
        sonTarih: "2018/01/01",
        durum: "beklemede"
    },
    {
        id: 2,
        eczane: "Dolmuş Eczanesi",
        İlaç: "Fake Juice",
        hedef: "69/100",
        birimFiyat: 99,
        sonTarih: "2018/04/25",
        durum: "beklemede"
    },
    {
        id: 3,
        eczane: "Başka Eczanesi",
        İlaç: "Başkamamol",
        hedef: "13/46",
        birimFiyat: 498,
        sonTarih: "2018/08/01",
        durum: "beklemede"
    }
]


const BasvurularGoruntule = () => {
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
      { key: 'eczane', _style: { width: '20%'} },
      { key: 'İlaç', _style: { width: '20%'} },
      { key: 'hedef', _style: { width: '20%'} },
      'birimFiyat',
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
        itemsPerPageSelect
        itemsPerPage={10}
        hover
        sorter
        pagination
        scopedSlots = {{
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
                    <CRow className = "anasayfaTable-center" >
                        <CCol lg = "2" >
                            <CCardBody>
                                <h4>
                                {item.eczane}
                                </h4>
                                <p className="text-muted">User since: {item.sonTarih}</p>
                                <CButton size="sm" color="info">
                                User Settings
                                </CButton>
                                <CButton size="sm" color="danger" className="ml-1">
                                Delete
                                </CButton>
                            </CCardBody>
                        </CCol>
                    </CRow>
                </CCollapse>
              )
            }
        }}
      />
    )
}

export default BasvurularGoruntule;