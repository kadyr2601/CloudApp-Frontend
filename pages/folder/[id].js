import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {FileCreate, FileDelete, GetFolderFiles, ActionHandler} from "../../store/actions/CloudAction";
import { VscFileSubmodule } from 'react-icons/vsc';
import { BsArrowLeft } from 'react-icons/bs';
import { saveAs } from "file-saver";
import { useRouter } from 'next/router'
import {IoAddSharp} from "react-icons/io5";
import Modal from "react-bootstrap/Modal";
import Link from "next/link";
import {RotatingLines} from "react-loader-spinner";


export default function FolderDetails () {

    const router = useRouter()
    const dispatch = useDispatch()
    const id = router.query.id && localStorage.setItem('lastId', router.query.id)
    const Loading = useSelector((state) => state.CloudReducer.Loading)

    useEffect(() => {
        const id = router.query.id || localStorage.getItem('lastId')
        dispatch(GetFolderFiles(id))
    } , [])

    const actionHandler = (file_name, action_type) => {
        dispatch(ActionHandler({file_name: file_name, action_type: action_type}))
    }

    const files = useSelector((state) => state.CloudReducer.FolderFiles)
    const AddFileSuccess = useSelector((state) => state.CloudReducer.AddFileSuccess)

    if (AddFileSuccess !== null) {window.location.reload(false)}

    const [active, setActive] = useState(false);

    const [name, setName] = useState(null);
    const [file_id, setFileID] = useState(null);
    const [file_data, setFileData] = useState(null);

    const deleteFile = () => {
        dispatch(FileDelete(file_id, () => window.location.reload(false)))
    }

    const DynamicModal = ({active}) => {
        return (
                <Modal show={active} onHide={() => setActive(false)} keyboard={false} centered backdrop>
                    <Modal.Body>
                        <div className={'modal-cont'}>
                            <div className='title'>{name}</div>
                            <div className={'btns-cont'}>
                                <div className={'btn-download'} onClick={() => saveFile(file_data, name)}>Download</div>
                                <div className={'btn-delete'} onClick={deleteFile}>Delete</div>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal> )
    }

    const openModal = (name, file_id, file_data) => {
        setName(name)
        setFileID(file_id)
        setFileData(file_data)
        setActive(true)
    }

    const saveFile = (file_data, name) => {
        saveAs(file_data, name);
        actionHandler(name, 'downloaded')
    };

    const [show, setShow] = useState(false);

    const AddFile = ({folder}) => {
        const [files, setFiles] = useState([])
        const fileSelectedHandler = (e) => {setFiles(e.target.files)}

        const handleSubmit = (files) => {
            let form_data = new FormData();
            for (const a of files) {
                form_data.append("files", a, a.name);
            }
            form_data.append("folder", folder?.id);
            dispatch(FileCreate(form_data))
        }

        return (
            <Modal show={show} onHide={() => setShow(false)} backdrop="static" centered>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                        <div className={'add-file'}>
                            <input type="file" style={{marginBottom: '40px'}} id={'file'} name={'file'} multiple onChange={fileSelectedHandler}/>
                            <div className={'btn'} style={{width: '250px', margin: '0 auto'}}
                                 onClick={() => handleSubmit(files)}>
                                Upload
                            </div>
                        </div>
                </Modal.Body>
            </Modal>
        );
    }

    return (
        Loading ?
            <div style={{position: 'relative', width: '100%', height: '90vh'}}>
                <div className={'loader'}>
                    <RotatingLines
                        strokeColor="grey"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="120"
                        visible={true}
                    />
                </div>
            </div> :
        <div className={'file-list-cont'}>
            <span className={'title'}>{files?.name}</span>
            <div className={'head-cont'}>
                <span className={'count'}>Listed files count - {files?.file_count}</span>
                <span className={'add-btn'} onClick={() => setShow(true)}><IoAddSharp className={'icon'}/> Add file</span>
            </div>
            <Link href="/company/[id]/" as={`/company/${files?.company.id}`}>
                <a className={'breadcumbs'}>
                    <BsArrowLeft className={'icon'}/> Back to {files?.company.name}
                </a>
            </Link>
            <DynamicModal active={active}/>
            <AddFile folder={files}/>
            <div className={'files-list'}>
                {files && files.folder_files.map((file, index) => (
                    <div className='file-cont' key={index} onClick={() => openModal(file.name, file.id, file.file)}>
                        <VscFileSubmodule className={'icon'}/>
                        <div className={'down'}>
                            <div className={'name'}>{file.name}</div>
                            <div className={'footer'}>
                                <span>{file.file_size}</span>
                                <span>{file.created}</span>
                            </div>
                        </div>
                    </div>
                ) )}
            </div>
        </div>
    );
}
