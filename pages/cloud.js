import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AddFollowers, FileCreate, FolderCreate, GetAllAdmins, GetFollows} from "../store/actions/CloudAction";
import { BsFolder, BsFolderSymlink } from 'react-icons/bs';
import Link from "next/link";
import {useRouter} from "next/router";



export default function CloudLayout ({children, folder}) {

    const dispatch = useDispatch()

    const Follows = useSelector((state) => state.CloudReducer.Follows)
    const router = useRouter();

    useEffect(() => {
        dispatch(GetFollows())
    }, [dispatch])

    const AddFolderSuccess = useSelector((state) => state.CloudReducer.AddFolderSuccess)
    const [newFolder, setNewFolder] = useState("");

    if (AddFolderSuccess !== null) {
        window.location.reload(false)
    }

    const [user, setUser] = React.useState(null)

    React.useEffect(() => {
        const userID = localStorage.getItem('user_id')
        setUser(userID)
    }, [])

    const Admins = useSelector((state) => state.CloudReducer.Admins)

    useEffect(() => {
        dispatch(GetAllAdmins(folder && folder[0].id))
    }, [])

    const handleFolderCreate = (event) => {
        dispatch(FolderCreate({
            user: user,
            name: newFolder,
        }))
        event.preventDefault();
        setNewFolder('')
    }

    const [file, setFile] = useState(null)
    const [fileName, setFileName] = useState('выбрать файл')

    const onFileChange = (e) => {
        setFileName(e.target.files[0].name)
        setFile(e.target.files[0])
    }

    const handleFileCreate = () => {
        const formData = new FormData();
        formData.append('user', user);
        formData.append('folder', folder[0].id);
        formData.append("file", file);
        formData.append("name", file.name);
        dispatch(FileCreate(formData))
    }

    const AddFollower = useSelector((state) => state.CloudReducer.AddFollower)

    if (AddFollower !== null) {
        window.location.reload(false)
    }
    const addFollower = (user_id) => {
        dispatch(AddFollowers(folder[0].id, user_id))
    }

    return (
    <div className='partners-nav' style={{minHeight: '100vh', paddingTop: '30px'}}>
        <div className={'cloud-body'}>
            <div className={'left-bar'}>
                <h3 style={{fontSize: '24px'}}>GastroPlusTour<sub>cloud</sub></h3>
                {folder ?
                <div>
                    <div className='cloud-datas' style={{marginTop: '50px'}}>
                        <Link href={'/cloud/myDisc'}><a className={'cloud-link'}>
                            <BsFolder className={'c-icon'}/><span>Мой диск</span>
                        </a></Link>
                        <div className={'cloud-link'}><BsFolderSymlink className={'c-icon'}/><span>Доступные мне</span></div>
                    </div>
                    <div style={{marginTop: '50px'}}>
                        <label htmlFor="files" className="file-label">{fileName}</label>
                        <input id="files" style={{display: 'none'}} type="file" onChange={onFileChange} />
                        <div className='create-btn' onClick={handleFileCreate}>Загрузить</div>
                    </div>
                    <div>
                        <div className={'shared-cont'}>
                            <span>Доступы</span>
                            {folder && folder.map((item, index) => (
                                item && item.followers.length > 0 ? item.followers.map((follower, index) => (
                                    <div className='follower' key={index}>
                                        <div style={{display: 'flex', justifyContent:'space-between', alignItems: 'center'}}>
                                            <div>{follower.first_name}</div>
                                            <div>{follower.last_name}</div>
                                        </div>

                                        <div className='follow-remove' onClick={() => addFollower(`${follower.id}`)}>Закрыть доступ</div>
                                    </div>
                                )) : null
                            ) )}
                        </div>
                        <div className={'shared-cont'}>
                            <span>Администрарторы</span>
                            {Admins && Admins.length > 0 ? Admins.map((admin, index) => (
                                <div className='follower' key={index}>
                                    <div style={{display: 'flex', justifyContent:'space-between', alignItems: 'center'}}>
                                        <div>{admin.first_name}</div>
                                        <div>{admin.last_name}</div>
                                    </div>
                                    <div className='follow-add' onClick={() => addFollower(`${admin.id}`)}>Открыть доступ</div>
                                </div>
                            )) : null}
                        </div>
                    </div>
                </div>
                    :
                    <div>
                        <div style={{marginTop: '60px'}}>
                            <input type="text" placeholder='Название папки' value={folder} onChange={event => setNewFolder(event.target.value)}/>
                            <div className='create-btn' onClick={handleFolderCreate}>Создать</div>
                        </div>
                        <div className='cloud-datas'>
                            <Link href={'/cloud/myDisc'}><a className={'cloud-link'}>
                                <BsFolder className={'c-icon'}/><span>Мой диск</span>
                            </a></Link>
                            <div className={'cloud-link'}><BsFolderSymlink className={'c-icon'}/><span>Доступные мне</span></div>
                        </div>
                    </div>

                }
            </div>
            <div className={'main-menu'}>
                {children}
            </div>
        </div>
    </div>
    )
}

