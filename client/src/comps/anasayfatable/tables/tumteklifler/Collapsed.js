import React, {useReducer, useEffect} from "react";
import { CFormGroup, CCol, CTextarea, CLabel, CButton, CInput } from "@coreui/react";
import { isBelow0, initialState, reducer } from "..";

export function CollapseMine ({item, index, setOrder, total, bakiyeSonra}) {
    const [state, dispatch] = useReducer(reducer, initialState);
    useEffect(() => {
        // console.log(item);
        const { katılanlar } = item
        for (let i = 0 ; i < item.katılanlar.length; i++) {
        dispatch({type: "ADD_ROW", payload: {...katılanlar[i], clicked: false}})
        dispatch({type: "HEDEF_HESAPLA", payload: item.pledge})
        }
        //eslint-disable-next-lineDELETETHISWORD
    }, [])

    // useEffect(() => {
    //     console.log(index);    
    // })

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
                            dispatch({type: "TOGGLE_ECZANE", payload: e.target.name})
                            dispatch({type: "HEDEF_HESAPLA", payload: item.pledge})
                            }} /></td>
                        <td><label htmlFor = "joiner1"><b>{element.name}</b></label></td>
                        <td><h5>{element.pledged} / {item.hedef}</h5></td>
                        </tr>
                        })
                    }
                    </tbody>
                </table>
                {/* <div style = {{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <h5 style = {{marginLeft: "15px"}} >Siz</h5>
                    <CInput style = {{maxWidth: "150px", marginLeft: "20px"}} type="number" placeholder="örnek: 15" 
                    onChange = {e => setOrder(e.target.value)} />
                </div> */}
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
                <CButton color = "danger" onClick = {() => console.log(state)} >Teklifi sil</CButton>
                <CButton color = "success" onClick = {() => console.log(index)} >Onayla</CButton>
                </div>
            </CFormGroup>
            </>
    )
}

export function CollapseJoin ({item, index, setOrder, total, bakiyeSonra}) {
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