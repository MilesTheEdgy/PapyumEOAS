import React, { useEffect, useState } from "react";
import { Route, useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import SafeHOC from "../safehoc/SafeHOC";

const AuthHOC = (props) => {
        // const [isTokenValid, setTokenValid] = useState(true)
        const history = useHistory();
        const dispatch = useDispatch();
        const isLogged = useSelector(state => state.user.properties.isLogged)
        useEffect(() => {
            return history.listen(async (location) => {
                console.log('sending validation request to server')
                const res = await fetch("/api", {
                    method: 'POST',
                    headers: {
                    'content-type': 'application/json',
                    'authorization' :`Bearer ${document.cookie.slice(11)} `
                    }
                })
                if (res.status < 405 && res.status > 400) {
                    console.log('error happened at AUTHHOC: ', res.status)
                    dispatch({type: 'LOG_OUT', username: "", bakiye: 0})
                    history.push('/login')
                } else if (res.status === 200) {
                    // let payload = await res.json()
                    dispatch({type: 'LOG_IN', username: "Hayat Eczanesi", bakiye: 1000})
                    // console.log(payload);
                }
            }
        ) 
    },[history, dispatch, isLogged, props])

        if (isLogged) {
            return <Route {...props} />
        }
        else {
            return <SafeHOC />
        }
    }


export default AuthHOC;