import React , { useReducer } from 'react'
import AlertContext from './alertContext'
import AlertReducer from './alertReducer'
import { SET_ALERT, REMOVE_ALERT } from '../types'

const AlertState = props => {
    const initialState = null

    const [state, dispatch] = useReducer(AlertReducer, initialState)
    
    // Set an alert for when the user submits a search without typing anything
    const setAlert = (msg, type) => {
        dispatch({
            type: SET_ALERT,
            payload: {msg, type}
        })
    // to make the alert go away in 3s
        setTimeout(() => dispatch({type: REMOVE_ALERT}), 3000);
    }
    // we have to wrap our entire app with the provider
    // we pass as props anything that we want available for the entire app
    return <AlertContext.Provider 
        value={{
            alert: state,
            setAlert,
        }}>        
        {props.children} 
    </AlertContext.Provider>
}

export default AlertState