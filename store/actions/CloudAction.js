import instance from "./Instance";


function SearchFiles(params) {
    return async (dispatch) => {
        dispatch({ type: "GET_FOLDERS_START" })
        try {
            const PropertyResponse = await instance.get(
                `cloud/file-search/?search=${params}` );
            dispatch({ type: "GET_FOLDERS_SUCCESS", payload: PropertyResponse.data })
        } catch (err) {
            dispatch({ type: "GET_FOLDERS_FAILURE", payload: err})
        }
    }
}

function FileCreate(formdata) {
    return async (dispatch) => {
        dispatch({ type: "ADD_FILE_START" })
        try {
            const Response = await instance.post(
                `cloud/file-create/`, formdata );
            dispatch({ type: "ADD_FILE_SUCCESS", payload: Response.data })
        } catch (err) {
            dispatch({ type: "ADD_FILE_FAILURE", payload: err})
        }
    }
}

function FileDelete(id, callback) {
    return async (dispatch) => {
        dispatch({ type: "FILE_DELETE_START" })
        try {
            const PropertyResponse = await instance.post(
                `cloud/file-delete/${id}/` );
            dispatch({ type: "FILE_DELETE_SUCCESS", payload: PropertyResponse.data })
            if (callback) callback()
        } catch (err) {
            dispatch({ type: "FILE_DELETE_FAILURE", payload: err})
        }
    }
}

function GetAllHistory() {
    return async (dispatch) => {
        try {
            const PropertyResponse = await instance.get(
                `cloud/history-list/` );
            dispatch({ type: "GET_HISTORY_SUCCESS", payload: PropertyResponse.data })
        } catch (err) {
            console.log(err)
        }
    }
}
function GetAllCompanies() {
    return async (dispatch) => {
        try {
            const PropertyResponse = await instance.get(
                `cloud/company-list/` );
            dispatch({ type: "GET_COMPANY_SUCCESS", payload: PropertyResponse.data })
        } catch (err) {
            console.log(err)
        }
    }
}
function GetCompanyFolders(id) {
    return async (dispatch) => {
        try {
            const PropertyResponse = await instance.get(
                `cloud/company/${id}/` );
            dispatch({ type: "GET_COMPANY_FOLDERS_SUCCESS", payload: PropertyResponse.data })
        } catch (err) {
            console.log(err)
        }
    }
}
function GetFolderFiles(id) {
    return async (dispatch) => {
        try {
            const PropertyResponse = await instance.get(
                `cloud/folder/${id}/` );
            dispatch({ type: "GET_FOLDER_FILES_SUCCESS", payload: PropertyResponse.data })
        } catch (err) {
            console.log(err)
        }
    }
}

function ActionHandler(params) {
    return async (dispatch) => {
        try {
            const PropertyResponse = await instance.post(
                `cloud/file-action/`, params);
        } catch (err) {
            console.log(err)
        }
    }
}
export {
    SearchFiles,
    FileCreate,
    FileDelete,
    GetAllHistory,
    GetAllCompanies,
    GetCompanyFolders,
    GetFolderFiles,
    ActionHandler
}
