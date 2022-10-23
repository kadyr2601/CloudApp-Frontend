import {useRouter} from "next/router";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {SignUpAction} from '../store/actions/AuthActions'




export default function Registration() {

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [surName, setSurname] = useState('')
    const [password, setPassword] = useState('')

    const router = useRouter()
    const dispatch = useDispatch()

    const handleSubmit = () => {
        dispatch(SignUpAction({email: email, first_name: name, last_name: surName, password: password}))
    }

    const newUser = useSelector((state) => state.AuthReducer.NewUser)

    return (
        <>
            {
                newUser ?
                    <div className={'auth-cont'}>
                        <div className={'auth'} style={{height: '400px'}}>
                            <span style={{textAlign: 'center', fontWeight: '600'}}>User create successfully</span>
                            <input type="text" placeholder={'Email'} value={email} onChange={event => setEmail(event.target.value)} disabled/>
                            <input type="text" placeholder={'Name'} value={name} onChange={event => setName(event.target.value)} disabled/>
                            <input type="text" placeholder={'Surname'} value={surName} onChange={event => setSurname(event.target.value)} disabled/>
                            <input type="text" placeholder={'Password'} value={password} onChange={event => setPassword(event.target.value)} disabled/>
                            <div className={'btn'} onClick={() => window.location.reload(false)}>Add new user</div>
                            <div className={'btn'} onClick={() => router.push('/main')}>Go to back</div>
                        </div>
                    </div> :
                    <div className={'auth-cont'}>
                        <div className={'auth'} style={{height: '350px'}}>
                            <input type="text" placeholder={'Email'} value={email} onChange={event => setEmail(event.target.value)}/>
                            <input type="text" placeholder={'Name'} value={name} onChange={event => setName(event.target.value)}/>
                            <input type="text" placeholder={'Surname'} value={surName} onChange={event => setSurname(event.target.value)}/>
                            <input type="text" placeholder={'Password'} value={password} onChange={event => setPassword(event.target.value)}/>
                            <div className={'btn'} onClick={handleSubmit}>Submit</div>
                        </div>
                    </div>
            }
        </>
    )
}
