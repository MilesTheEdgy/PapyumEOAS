import React, {useReducer, useEffect} from "react";
import { CFormGroup, CCol, CTextarea, CLabel, CButton, CInput } from "@coreui/react";
import { isBelow0, initialState, reducer } from ".";
import "./style.css"
import "./collapsed.css"

export function CollapseMine ({item, index, setOrder, total, bakiyeSonra}) {

    const [state, dispatch] = useReducer(reducer, initialState);

    const approveBid = async () => {

        console.log(item.durum);

        // let selectedUsers = []
        // for (let i = 0; i < state.rows.length; i++) {
        //     if (state.rows[i].clicked === true) {
        //         selectedUsers.push(state.rows[i].name)
        //     }
        // }
        // console.log(selectedUsers);
        // if (state.hedefeKalanMine === 0) {
        //     const res = await fetch('/api/bid/approve', {
        //             method: 'POST',
        //             headers: {
        //             'Content-Type': 'application/json',
        //             'authorization': `Bearer ${document.cookie.slice(11)} `
        //             },
        //             body: JSON.stringify({
        //             selectedUsers: selectedUsers,
        //             id: item.id
        //             })
        //         })
        //     if (res.status === 200) {
        //         console.log(true);
        //     } else {
        //         console.log(false);
        //     }
        // }
        
    }


    useEffect(() => {
        // console.log(item);
        // if (item.katılanlar) {
        //     console.log('OUR STUPID FUCKING LENGTH IS: ', item.katılanlar.length)
        //     const { katılanlar } = item
        //     for (let i = 0 ; i < item.katılanlar.length; i++) {
        //         dispatch({type: "ADD_ROW", payload: {...katılanlar[i], clicked: false}})
        //     }
        // }
        // console.log('dispatch args are: ', item.pledge, item.hedef)
        dispatch({type: "HEDEF_HESAPLA_COLLAPSED_MINE", payload: item.pledge, hedef: item.hedef})
        dispatch({type: "SET_STATUS", payload: item.durum})
        //eslint-disable-next-line
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
                    value = {item.description}
                    readOnly
                />
                <div style = {{display: "flex"}} >
                    <h5 className = "collapsedMine-hedefeKalanH5">Hedefe kalan adet:</h5>
                    <h4 className = {`collapsedMine-hedefeKalanH4 ${state.hedefeKalanIs0 ? "hedefeKalanIs0" : ""}`}>{state.hedefeKalanMine}</h4>
                </div>
                </CCol>
                <CCol xs="12" md="6">
                    <CLabel>Katılanlar:</CLabel>
                    <table className = "table table-striped collapsedMine-table">
                        <tbody>
                            {
                            item.katılanlar && item.katılanlar.map((element, i) => {
                        return <tr key = {i} style = {{backgroundColor: state.rows[i]?.clicked? "rgba(18, 54, 216, 0.514)" : "", color: "black"}} >
                                    <td>
                                        <input type="checkbox" id='joiner1' name={element.name}
                                        onChange = {(e) => {
                                            dispatch({type: "TOGGLE_ECZANE", payload: e.target.name})
                                            dispatch({type: "HEDEF_HESAPLA_COLLAPSED_MINE", payload: item.pledge, hedef: item.hedef})
                                        }} />
                                    </td>
                                    <td><label htmlFor = "joiner1"><b>{element.name}</b></label></td>
                                    <td><h5>{element.pledge} / {item.hedef}</h5></td>
                                </tr>
                                })
                            }
                        </tbody>
                    </table>
                </CCol>
            </CFormGroup>
            {
                state.isOnHold && <CFormGroup row className = "collapsedMine-footerControlButtons">
                    <CButton color = "danger" >Teklifi sil</CButton>
                    <CButton  color = "success" onClick = {() => approveBid()} >Onayla</CButton>
                </CFormGroup>
            }
                 {/* <CFormGroup row className = "collapsedMine-footerControlButtons">
                    <CButton color = "danger" >Teklifi sil</CButton>
                    <CButton  color = "success" onClick = {() => approveBid()} >Onayla</CButton>
                </CFormGroup> */}
            </>
    )
}

export function CollapseJoin ({item, index, setOrder, total, bakiyeSonra}) {


    //state.userInputJoin

    const [state, dispatch] = useReducer(reducer, initialState);

    const onSubmit = async () => {
        console.log(state.userInputJoin);

        const res = await fetch('/api/bid/join', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${document.cookie.slice(11)} `
              },
              body: JSON.stringify({
                userInputJoin: state.userInputJoin,
                bid_id: item.id
              })
            })
        if (res.status === 200) {
            console.log("sent userInputJoin to server successfully");
        } else {
            console.log("userInputJoin was not sent to server");
        }
    }

    useEffect(() => {
        dispatch({type: "HEDEF_HESAPLA_COLLAPSED_JOIN", payload: item.pledge, hedef: item.hedef})
        //eslint-disable-next-line
    }, [])

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
                <div style = {{display: "flex"}} >
                    <h5 className = "collapsedMine-hedefeKalanH5">Hedefe kalan adet:</h5>
                    <h4 className = {`collapsedMine-hedefeKalanH4 ${state.hedefeKalanIs0 ? "hedefeKalanIs0" : ""}`}>{state.hedefeKalanJoin - state.userInputJoin}</h4>
                </div>
            </CCol>
            <CCol xs="12" md="6">
            <CLabel>Katılanlar:</CLabel>
            <table className = "table table-striped collapsedMine-table">
                <tbody>
                    {
                    item.katılanlar && item.katılanlar.map((element, i) => {
                return <tr key = {i} style = {{backgroundColor: state.rows[i]?.clicked? "rgba(18, 54, 216, 0.514)" : "", color: "black"}} >
                            <td><label htmlFor = "joiner1"><b>{element.name}</b></label></td>
                            <td><h5>{element.pledge} / {item.hedef}</h5></td>
                        </tr>
                        })
                    }
                </tbody>
            </table>
            <div style = {{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <h5 style = {{marginLeft: "15px"}} >Siz</h5>
                <CInput style = {{maxWidth: "150px", marginLeft: "20px"}} type="number" placeholder="örnek: 15" 
                onChange = {e => {
                    setOrder(e.target.value)
                    dispatch({type: "HEDEFE_EKLE_INPUT_COLLAPSED_JOIN", payload: e.target.value})
                }} />
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
            <CButton color = "success" onClick = {() => onSubmit()} >Onayla</CButton>
            <CButton color = "success" onClick = {() => console.log(item.id)} >test</CButton>
            </div>
        </CFormGroup>
        </>
)
}