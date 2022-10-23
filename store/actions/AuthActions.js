import instance from './Instance'


function SignUpAction(params) {
    return async (dispatch) => {
        dispatch({ type: "SIGNUP_START" })
        try {
            const Response = await instance.post(
                `cloud/registration/`, params );
            dispatch({ type: "SIGNUP_SUCCESS", payload: Response.data })
        } catch (err) {
            dispatch({ type: "SIGNUP_FAILURE", payload: err})
        }
    }
}

function SignInAction(params, callback) {
    return async (dispatch) => {
        dispatch({ type: "SIGNIN_START" })
        try {
            const Response = await instance.post(
                `cloud/login/`, params );
            dispatch({ type: "SIGNIN_SUCCESS", payload: Response.data })
            localStorage.setItem('token', Response.data.access)
            localStorage.setItem('refresh', Response.data.refresh)
            if (callback) callback()
        } catch (err) {
            dispatch({ type: "SIGNIN_FAILURE", payload: err})
        }
    }
}

function CheckSessionAction() {
    return async (dispatch) => {
        try {
           const token = localStorage.getItem('token')
            if (token && token !== null) {
                const { data } = await instance.get('cloud/get-me/')
                dispatch({ type: "CURRENT_USER", payload: data })
                dispatch({ type: "CHECK_SESSION_SUCCESS" })
            }
        } catch (err) {
            console.log(err)
        }
    }
}

function LogoutAction(callback) {
    return async (dispatch) => {
        dispatch({ type: "GET_LOGOUT_START" })
        try {
            dispatch({ type: "GET_LOGOUT_SUCCESS", payload: Response.data })
            localStorage.removeItem('token')
            localStorage.removeItem('refresh')
            localStorage.removeItem('user_id')
            if (callback) callback()
        } catch (err) {
            dispatch({ type: "GET_LOGOUT_FAILURE", payload: err})
        }
    }
}

export {
    SignUpAction,
    SignInAction,
    LogoutAction,
    CheckSessionAction,
}
