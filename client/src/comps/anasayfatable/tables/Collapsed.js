import React, {useReducer, useEffect} from "react";
import { CFormGroup, CCol, CTextarea, CLabel, CButton, CInput } from "@coreui/react";
import { isBelow0, initialState, reducer } from ".";
import "./style.css"
import "./collapsed.css"

export function CollapseMine ({item, index, setOrder, total, bakiyeSonra}) {

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const { katılanlar } = item
        for (let i = 0 ; i < item.katılanlar.length; i++) {
            dispatch({type: "ADD_ROW", payload: {...katılanlar[i], clicked: false}})
        }
        dispatch({type: "HEDEF_HESAPLA_COLLAPSED_MINE", payload: item.pledge, hedef: item.hedef})
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
                            item.katılanlar.map((element, i) => {
                        return <tr key = {i} style = {{backgroundColor: state.rows[i]?.clicked? "rgba(18, 54, 216, 0.514)" : "", color: "black"}} >
                                    <td>
                                        <input type="checkbox" id='joiner1' name={element.name}
                                        onChange = {(e) => {
                                        dispatch({type: "TOGGLE_ECZANE", payload: e.target.name})
                                        dispatch({type: "HEDEF_HESAPLA_COLLAPSED_MINE", payload: item.pledge, hedef: item.hedef})
                                        }} />
                                    </td>
                                    <td><label htmlFor = "joiner1"><b>{element.name}</b></label></td>
                                    <td><h5>{element.pledged} / {item.hedef}</h5></td>
                                </tr>
                                })
                            }
                        </tbody>
                    </table>
                </CCol>
            </CFormGroup>
            <CFormGroup row className = "collapsedMine-footerControlButtons">
                <CButton color = "danger" onClick = {() => console.log(state)} >Teklifi sil</CButton>
                <CButton  color = "success" onClick = {() => console.log(index)} >Onayla</CButton>
            </CFormGroup>
            </>
    )
}

export function CollapseJoin ({item, index, setOrder, total, bakiyeSonra}) {

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const { katılanlar } = item
        for (let i = 0 ; i < item.katılanlar.length; i++) {
            dispatch({type: "ADD_ROW", payload: {...katılanlar[i], clicked: false}})
        }
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
                    item.katılanlar.map((element, i) => {
                return <tr key = {i} style = {{backgroundColor: state.rows[i]?.clicked? "rgba(18, 54, 216, 0.514)" : "", color: "black"}} >
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
            <CButton color = "success" onClick = {() => console.log("item is: ", item, "and index is: ", index)} >Onayla</CButton>
            </div>
        </CFormGroup>
        </>
)
}