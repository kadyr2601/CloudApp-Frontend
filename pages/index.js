import {useRouter} from "next/router";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {SignInAction} from '../store/actions/AuthActions'




export default function Home() {

    const err = useSelector((state) => state.AuthReducer.err)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()
    const dispatch = useDispatch()

    const handleSubmit = (event) => {
        dispatch(SignInAction({email: email, password: password}, () => router.push('/main')))
        event.preventDefault();
    }


  return (
        <>
          <div className={'auth-cont'}>
            <div className={'auth'}>
                {err && err.status === 400 ?
                    <div style={{color: 'red', fontSize: '14px', textAlign: 'center', paddingBottom: '10px'}}>
                        Не правильный Логин или Пароль</div> : null}
                <input type="text" placeholder={'Email'} value={email} onChange={event => setEmail(event.target.value)}/>
                <input type="text" placeholder={'Password'} value={password} onChange={event => setPassword(event.target.value)}/>
              <div className={'btn auth-btn'} onClick={handleSubmit}>Sign In</div>
            </div>
          </div>
        </>
  )
}
