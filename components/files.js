import React, {useState} from 'react';
import {AiOutlineClose} from "react-icons/ai";
import {VscFileSubmodule} from "react-icons/vsc";
import {ActionHandler, FileDelete} from "../store/actions/CloudAction";
import {useDispatch} from "react-redux";
import Modal from "react-bootstrap/Modal";
import { saveAs } from "file-saver";


const Files = ({files}) => {

    const dispatch = useDispatch()

    const actionHandler = (file_name, action_type) => {
        dispatch(ActionHandler({file_name: file_name, action_type: action_type}))
    }

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


    return (
        <div className={'file-list-cont'}>
            <span className={'title'}>{files?.name}</span>
            <div className={'head-cont'}>
                <span className={'count'}>Listed files count - {files?.length}</span>
                <span className={'add-btn'} onClick={() => window.location.reload(false)}><AiOutlineClose className={'icon'}/> Close search</span>
            </div>
            <DynamicModal active={active}/>
            <div className={'files-list'}>
                {files && files.map((file, index) => (
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
};

export default Files;