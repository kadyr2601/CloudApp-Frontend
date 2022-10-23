
const initialState = {

    SignUpLoading: false,
    SignInLoading: false,

    CurrentUser: null,
    LoginUser: null,
    err: null,
    ChangePass: null,

    UsersList: [],
    NewUser: null

}

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_USERS_SUCCESS':
            return {
                ...state,
                UsersList: action.payload,
            }
        case 'SIGNUP_START':
            return {
                ...state,
                SignUpLoading: true,
            }
        case 'SIGNUP_SUCCESS':
            return {
                ...state,
                SignUpLoading: false,
                NewUser: action.payload
            }
        case 'SIGNUP_FAILURE':
            return {
                ...state,
                SignUpLoading: false,
            }
        //////////////////////////////////////////////////////////////////
        case 'SIGNIN_START':
            return {
                ...state,
                SignInLoading: true,
            }
        case 'SIGNIN_SUCCESS':
            return {
                ...state,
                SignInLoading: false,
                LoginUser: action.payload,
            }
        case 'SIGNIN_FAILURE':
            return {
                ...state,
                SignInLoading: false,
            }
        //////////////////////////////////////////////////////////////////
        case 'CURRENT_USER':
            return {
                ...state,
                CurrentUser: action.payload,
            }
        //////////////////////////////////////////////////////////////////
        case 'CHECK_SESSION_SUCCESS':
            return {
                ...state,
                IsLoggedIn: true,
            }
        //////////////////////////////////////////////////////////////////
        case 'UPDATE_CURRENT_USER': {
            return {
                ...state,
                CurrentUser: action.payload
            }
        }
        //////////////////////////////////////////////////////////////////
        case 'GET_ERR_SUCCESS':
            return {
                ...state,
                err: action.payload,
            }
        //////////////////////////////////////////////////////////////////
        case 'CHANGE_PASS_SUCCESS':
            return {
                ...state,
                ChangePass: action.payload?.data,
            }
        default:
            return state
    }
}

export default AuthReducer;
