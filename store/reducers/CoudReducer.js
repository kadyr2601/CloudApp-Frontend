const initialState = {
    Folders : [],

    Loading: false,

    AddFolderSuccess: null,
    AddFileSuccess: null,

    Folder: null,

    Follows: [],

    AddFollower: null,

    History: [],

    Company: [],

    CompanyFolders: [],

    FolderFiles: null,

    
}

const CloudReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_FOLDER_FILES_SUCCESS':
            return {
                ...state,
                FolderFiles: action.payload,
            }
        case 'GET_COMPANY_FOLDERS_SUCCESS':
            return {
                ...state,
                CompanyFolders: action.payload,
            }
        case 'GET_COMPANY_SUCCESS':
            return {
                ...state,
                Company: action.payload.results,
            }
        case 'GET_HISTORY_SUCCESS':
            return {
                ...state,
                History: action.payload.results,
            }
        case 'GET_FOLDERS_START':
            return {
                ...state,
                FoldersLoading: true,
            }
        case 'GET_FOLDERS_SUCCESS':
            return {
                ...state,
                FoldersLoading: false,
                Folders: action.payload.results,
            }
        case 'GET_FOLDERS_FAILURE':
            return {
                ...state,
                FoldersLoading: false,
            }
        case 'ADD_FILE_START':
            return {
                ...state,
                Loading: true,
                AddFileSuccess: action.payload,
            }
        case 'ADD_FILE_SUCCESS':
            return {
                ...state,
                Loading: false,
                AddFileSuccess: action.payload.results,
            }
        case 'ADD_FILE_FAILURE':
            return {
                ...state,
                Loading: false,
                AddFileSuccess: action.payload.results,
            }
        // case 'FILE_DELETE_START':
        //     return {
        //         ...state,
        //         Loading: true,
        //     }
        // case 'FILE_DELETE_SUCCESS':
        //     return {
        //         ...state,
        //         Loading: false,
        //     }
        // case 'FILE_DELETE_FAILURE':
        //     return {
        //         ...state,
        //         Loading: false,
        //     }
        default:
            return state
    }
}

export default CloudReducer;
