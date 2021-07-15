import React from "react";
import { CModal, CModalHeader, CModalTitle, CModalFooter, CModalBody, CButton } from "@coreui/react"

function Modal(props) {
    const [modalOn, modalToggle] = React.useState(true)
    if (props.dispatch) {
        return (
            <CModal 
            show={props.on} 
            onClose={() => modalToggle(!modalOn)}
            color={props.color}
            centered
            >
                <CModalHeader closeButton>
                    <CModalTitle> {props.header} </CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <h5>{props.body}</h5>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => props.dispatch({type : "MODAL_DISPLAY", payload: {type: "CLOSE"}})}>Kapat</CButton>
                </CModalFooter>
            </CModal>
        )
    } else {
        return (
            <CModal 
            show={modalOn}
            onClose={() => props.dispatch({type : "MODAL_DISPLAY", payload: {type: "CLOSE"}})}
            color={props.color}
            centered
            >
                <CModalHeader closeButton>
                    <CModalTitle> {props.header} </CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <h5>{props.body}</h5>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => modalToggle(!modalOn)}>Kapat</CButton>
                </CModalFooter>
            </CModal>
        )
    }
}

export default Modal