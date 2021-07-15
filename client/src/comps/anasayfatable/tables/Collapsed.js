import React, {useReducer, useEffect} from "react";
import { CFormGroup, CCol, CTextarea, CLabel, CButton, CInput } from "@coreui/react";
import Loader from "src/comps/loader/Loader";
import { isBelow0, initialState, reducer } from ".";
import "./style.css"
import "./collapsed.css"
import Modal from "src/comps/modals/Modal";

function CollapseMineTable({item, state, dispatch}) {
    switch (item.durum) {
        case "APPROVED":
            return (
                <table className = "table table-striped collapsedMine-table">
                    <tbody>
                        {
                        item.katılanlar && item.katılanlar.map((element, i) => {
                    return <tr key = {i} style = {{backgroundColor: state.rows[i]?.clicked? "rgba(18, 54, 216, 0.514)" : "", color: "black"}} >
                                <td>
                                    <input type="checkbox" id='joiner1' name={element.name} disabled = {state.isNotPending}
                                    onChange = {(e) => {
                                        dispatch({type: "TOGGLE_ECZANE", payload: e.target.name})
                                        dispatch({type: "HEDEF_HESAPLA_COLLAPSED_MINE", payload: item.pledge, hedef: item.hedef})
                                    }} />
                                </td>
                                <td><label><b>{element.name}</b></label></td>
                                <td><h5>{element.pledge} / {item.hedef}</h5></td>
                            </tr>
                            })
                        }
                    </tbody>
                </table>
                )
        default:
            return (
                <table className = "table table-striped collapsedMine-table">
                    <tbody>
                        {
                        item.katılanlar && item.katılanlar.map((element, i) => {
                    return <tr key = {i} style = {{backgroundColor: state.rows[i]?.clicked? "rgba(18, 54, 216, 0.514)" : "", color: "black"}} >
                                <td>
                                    <input type="checkbox" id='joiner1' name={element.name} disabled = {state.isNotPending}
                                    onChange = {(e) => {
                                        dispatch({type: "TOGGLE_ECZANE", payload: e.target.name})
                                        dispatch({type: "HEDEF_HESAPLA_COLLAPSED_MINE", payload: item.pledge, hedef: item.hedef})
                                    }} />
                                </td>
                                <td><label><b>{element.name}</b></label></td>
                                <td><h5>{element.pledge} / {item.hedef}</h5></td>
                            </tr>
                            })
                        }
                    </tbody>
                </table>
                )
        }
}

export function CollapseMine ({item, index, setOrder, total, bakiyeSonra}) {

    const [state, dispatch] = useReducer(reducer, initialState);
    const { isLoading, modal } = state

    const approveBid = async () => {
        dispatch({type: "APPROVE_BID", payload: {type: "LOADING_ON"}})      
        let selectedUsers = []
        for (let i = 0; i < state.rows.length; i++) {
            if (state.rows[i].clicked === true) {
                selectedUsers.push(state.rows[i].name)
            }
        }
        console.log(selectedUsers);
        if (state.hedefeKalanIs0) {
            const res = await fetch('/api/bid/approve', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': `Bearer ${document.cookie.slice(11)} `
                    },
                    body: JSON.stringify({
                        selectedUsers: selectedUsers,
                        id: item.id
                    })
                })
            if (res.status === 200) {
                dispatch({type: "MODAL_DISPLAY", payload : {type: "SUCCESS"}})
                dispatch({type: "APPROVE_BID", payload: {type: "LOADING_OFF"}})      
            } else {
                dispatch({type: "MODAL_DISPLAY", payload : {type: "FAILURE"}})
                dispatch({type: "APPROVE_BID", payload: {type: "LOADING_OFF"}})
            }
        }
    }


    useEffect(() => {
        if (item.katılanlar) {
            const { katılanlar } = item
            for (let i = 0 ; i < item.katılanlar.length; i++) {
                dispatch({type: "ADD_ROW", payload: {...katılanlar[i], clicked: false}})
            }
        }
        // console.log('dispatch args are: ', item.pledge, item.hedef)
        dispatch({type: "HEDEF_HESAPLA_COLLAPSED_MINE", payload: item.pledge, hedef: item.hedef})
        dispatch({type: "SET_STATUS", payload: item.durum})
        //eslint-disable-next-line
    }, [])

    return (
        <Loader isLoading = {isLoading} >
            <Modal on = {modal.on} header = {modal.header} body = {modal.body} color = {modal.color} dispatch = {dispatch} />
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
                    {           
                    state.isOnHold &&
                    <div style = {{display: "flex"}} >
                        <h5 className = "collapsedMine-hedefeKalanH5">Hedefe kalan adet:</h5>
                        <h4 className = {`collapsedMine-hedefeKalanH4 ${state.hedefeKalanIs0 ? "hedefeKalanIs0" : ""}`}>{state.hedefeKalanMine}</h4>
                    </div>
                    }
                </CCol>
                <CCol xs="12" md="6">
                    <CLabel>Katılanlar:</CLabel>
                    <CollapseMineTable item = {item} state = {state} dispatch = {dispatch}  />
                </CCol>
            </CFormGroup>
            {
                state.isOnHold && 
                <CFormGroup row className = "collapsedMine-footerControlButtons">
                    <CButton color = "danger">Teklifi sil</CButton>
                    <CButton disabled = {!state.hedefeKalanIs0} color = "success" onClick = {() => approveBid()} >Onayla</CButton>
                </CFormGroup>
            }
        </Loader>
    )
}


function CollapseJoinTables ({item, state, dispatch}) {
    switch (item.durum) {
        case "APPROVED":
            return (
                <table className = "table table-striped collapsedMine-table">
                    <tbody>
                        {
                        item.katılanlar && item.katılanlar.map((element, i) => {
                    return <tr key = {i} style = {{backgroundColor: state.rows[i]?.clicked? "rgba(18, 54, 216, 0.514)" : "", color: "black"}} >
                                { state.isNotPending && element.isCurrentUser ?
                                    <td>
                                        <input type="checkbox" id='joiner1' name={element.name}
                                        onChange = {(e) => {
                                            dispatch({type: "TOGGLE_ECZANE", payload: e.target.name})
                                        }} />
                                    </td>
                                    :
                                    <td>
                                        <input type="checkbox" id='joiner1' name={element.name} disabled />
                                    </td>
                                }
                                <td><label htmlFor = "joiner1"><b>{element.name}</b></label></td>
                                <td><h5>{element.pledge} / {item.hedef}</h5></td>
                            </tr>
                            })
                        }
                    </tbody>
                </table>
                )           
        default:
            return (
                <table className = "table table-striped collapsedMine-table">
                    <tbody>
                        {
                        item.katılanlar && item.katılanlar.map((element, i) => {
                    return <tr key = {i} style = {{backgroundColor: state.rows[i]?.clicked? "rgba(18, 54, 216, 0.514)" : "", color: "black"}} >
                                { state.isNotPending && element.isCurrentUser ?
                                    <td>
                                        <input type="checkbox" id='joiner1' name={element.name}
                                        onChange = {(e) => {
                                            dispatch({type: "TOGGLE_ECZANE", payload: e.target.name})
                                        }} />
                                    </td>
                                    :
                                    <td>
                                        <input type="checkbox" id='joiner1' name={element.name} disabled />
                                    </td>
                                }
                                <td><label htmlFor = "joiner1"><b>{element.name}</b></label></td>
                                <td><h5>{element.pledge} / {item.hedef}</h5></td>
                            </tr>
                            })
                        }
                    </tbody>
                </table>
            )    
    }
}

export function CollapseJoin ({ reduxUser, item, index, order, setOrder, total, bakiyeSonra}) {

    const [state, dispatch] = useReducer(reducer, initialState);

    const { modal, isLoading } = state;

    const onSubmit = async () => {
        dispatch({type: "APPROVE_BID", payload : {type: "LOADING_ON"}})

        const res = await fetch('/api/bid/join', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${document.cookie.slice(11)} `
              },
              body: JSON.stringify({
                userInputJoin: order,
                bid_id: item.id
              })
            })
        if (res.status === 200) {
            console.log("sent userInputJoin to server successfully");
            dispatch({type: "MODAL_DISPLAY", payload: {type: "SUCCESS"}})
        } else {
            console.log("userInputJoin was not sent to server");
            dispatch({type: "MODAL_DISPLAY", payload: {type: "FAILURE"}})
        }
        dispatch({type: "APPROVE_BID", payload : {type: "LOADING_OFF"}})
    }

    useEffect(() => {
        if (item.katılanlar) {
            for (let i = 0; i < item.katılanlar.length; i++) {
                if (item.katılanlar[i].name === reduxUser) {
                    Object.assign(item.katılanlar[i], {isCurrentUser: true})
                }
                dispatch({type: "ADD_ROW", payload: {...item.katılanlar[i], clicked: false}})
            }
        }
        dispatch({type: "HEDEF_HESAPLA_COLLAPSED_JOIN", payload: item.pledge, hedef: item.hedef})
        dispatch({type: "SET_STATUS", payload: item.durum})
        //eslint-disable-next-line
    }, [])

    return (
        <Loader isLoading = {isLoading} >
            <Modal on = {modal.on} header = {modal.header} body = {modal.body} color = {modal.color} dispatch = {dispatch} />
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
                    {
                        state.isOnHold &&
                        <div style = {{display: "flex"}} >
                            <h5 className = "collapsedMine-hedefeKalanH5">Hedefe kalan adet:</h5>
                            <h4 className = {`collapsedMine-hedefeKalanH4 ${state.hedefeKalanIs0 ? "hedefeKalanIs0" : ""}`}>{state.hedefeKalanJoin}</h4>
                        </div>
                    }
                </CCol>
                <CCol xs="12" md="6">
                <CLabel>Katılanlar:</CLabel>
                <CollapseJoinTables item = {item} state = {state} dispatch = {dispatch} />

                {
                    state.isOnHold &&
                    <div style = {{display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <h5 style = {{marginLeft: "15px"}} >Siz</h5>
                        <CInput style = {{maxWidth: "150px", marginLeft: "20px"}} type="number" placeholder="örnek: 15" 
                        onChange = {e => {
                            setOrder(e.target.value)
                        }} />
                    </div>
                }

                </CCol>
            </CFormGroup>
            {
            state.isOnHold &&
                <CFormGroup row style = {{marginTop: "50px", display: "flex", justifyContent: "space-around"}} >
                    <div style = {{display: "flex"}} >
                        <CLabel>Toplam:</CLabel>
                        <p style = {{marginLeft: "10px"}}> <b> {total.toFixed(2)} TL</b></p>
                    </div>
                    <div style = {{display: "flex", marginLeft: "20px"}} >
                        <CLabel>Sipraişten Sonra Bakiyeniz:</CLabel>
                        <p style = {{marginLeft: "10px", color: isBelow0(bakiyeSonra) }}>{bakiyeSonra.toFixed(2)} TL</p>
                    </div>
                    <div style = {{marginLeft: "20px"}} >
                        <CButton color = "success" onClick = {() => onSubmit()} >Onayla</CButton>
                        <CButton color = "secondary" onClick = {() => console.log(order)} >test</CButton>
                    </div>
                </CFormGroup>
            }
        </Loader>
    )
}