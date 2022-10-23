import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import Link from "next/link";
import { FcOpenedFolder } from 'react-icons/fc';
import {CheckSessionAction} from "../../store/actions/AuthActions";
import {GetCompanyFolders} from "../../store/actions/CloudAction";
import {BsArrowLeft} from "react-icons/bs";
import {useRouter} from "next/router";


export default function Main () {

    const router = useRouter()
    const id = router.query.id && localStorage.setItem('lastId', router.query.id)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(CheckSessionAction())
    } , [dispatch])

    useEffect(() => {
        const id = router.query.id || localStorage.getItem('lastId')
        dispatch(GetCompanyFolders(id))
    } , [])

    const folders = useSelector((state) => state.CloudReducer.CompanyFolders)

    return (
        <div className={'company-folders-cont'}>
            <span className={'title'}>{folders.name}</span>
            <span className={'count'}>Listed folders count - {folders.folder_count}</span>
            <Link href="/main">
                <a className={'breadcumbs'}>
                    <BsArrowLeft className={'icon'}/> Back to Main
                </a>
            </Link>
            <div className={'folders-list'}>
                {folders && folders.company_folders?.map((folder, index) => (
                    <Link key={index} href={'/folder/[id]'} as={`/folder/${folder.id}`}>
                        <a className={'folder-cont'}>
                            <FcOpenedFolder className={'icon'}/>
                            <span className={'down'}>{folder.name}</span>
                        </a>
                    </Link>
                ))}
            </div>
        </div>
    )
}

// export async function getServerSideProps({query}) {
//     const res = await fetch(`${process.env.BASE_URL}cloud/company/${query.id}/`)
//     const folders = await res.json()
//     return { props: { folders } }
// }