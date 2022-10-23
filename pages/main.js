import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {SearchFiles} from "../store/actions/CloudAction";
import Link from "next/link";
import {IoSearch} from "react-icons/io5";
import {CheckSessionAction} from "../store/actions/AuthActions";
import {GetAllHistory, GetAllCompanies} from "../store/actions/CloudAction";
import Actions from "../components/actions";
import Companies from "../components/companies";
import Files from "../components/files";




export default function Main() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(CheckSessionAction())
    }, [dispatch])

    const user = useSelector((state) => state.AuthReducer.CurrentUser)

    const FilesList = useSelector((state) => state.CloudReducer.Folders)
    const Histories = useSelector((state) => state.CloudReducer.History)
    const CompanyList = useSelector((state) => state.CloudReducer.Company)

    const [search, setSearch] = useState("");

    useEffect(() => {
        dispatch(GetAllHistory())
    }, [dispatch])

    useEffect(() => {
        dispatch(GetAllCompanies())
    }, [dispatch])

    const handleSubmit = () => {
        if (search && search.length >= 1) {
            dispatch(SearchFiles(search))
        }
    }

    return (
        <div className={'content-cont'}>
            <div className='header-cont'>
                <div className={'header'}>
                    <div className={'logo'}>Logo</div>
                    <div className={'input-cont'}>
                        <input type="text" placeholder=' Search...' onChange={(e) => setSearch(e.target.value)}/>
                        <IoSearch className='search-btn' onClick={handleSubmit}/>
                    </div>
                    {user && user.is_admin ?
                        <Link href={'/registration'}>
                            <a>
                                {user?.name} {user?.surname}
                            </a>
                        </Link> : <div>{user?.name} {user?.surname}</div>
                    }
                </div>
            </div>
            <div className={'file-data-list'}>
                {
                    FilesList && FilesList.length > 0 ? <Files files={FilesList}/> :
                    <div className={'company-cont'}>
                        <Companies companyList={CompanyList}/>
                        <Actions actionList={Histories}/>
                    </div>
                }
            </div>
        </div>
    )
}