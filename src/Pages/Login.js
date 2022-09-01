import React, {useState} from 'react';
import css from '../cssModules/Login.module.css'
import { loginDetails, loginStatus} from '../actions';
import {useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [details, setDetails] = useState({
        email: '',
        password: ''
    })

    const changeDetails = (e) => {
       const  name = e.target.name
        const value = e.target.value

        setDetails({
            ...details,
            [name]: value
        })   
    }

    const closeMsg = () => {
        setMessage('')
    }

    const onClickBtn  = async() => {
        try{
        setLoading(true)
        console.log(details)
        if(!details.email || !details.password){
            setLoading(false)
            setMessage('please fill all fields')
            return
        }
        const apiRequest = await fetch('https://stage.api.sloovi.com/login',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(details)
        }) 

        const result = await apiRequest.json()
        if(apiRequest.status === 200){
            setLoading(false)
            const {token, user_id, company_id} = result.results
             dispatch(loginDetails({
                token,
                user_id,
                company_id
             }))
             dispatch(loginStatus(true))
            setMessage(result.message)
            navigate('/add')
            console.log(result.results)
        }
        else{
            setLoading(false)
            setMessage(result.message)
        }
    }
    catch(error){
        setLoading(false)
        setMessage(error.message)
    }
    }
    return(
        <div className={css.loginBoddy}>
         {message ? <div className={css.message}>
            <span>{message}</span>
            <span onClick={closeMsg}>
            <img src="https://img.icons8.com/ios/17/000000/cancel.png" alt='working'/>
            </span>
        </div> : ''}
        <nav>
        Sloovi
        </nav>
        <div className={css.loginBody}>
        <h1>Login</h1>

        <div className={css.formBody}>
        <div>
        <label>Email</label><br/>
        <input 
        type='email'
        name="email" 
        onChange={changeDetails}
        />
        </div>

        <div>
        <label>Password</label><br/>
        <input 
        type='password'
        name='password'
        onChange={changeDetails}
        /> 
        </div>

        <button
        onClick={onClickBtn}
        >
        {loading ? 'Submitting...' : 'Submit'}
        </button>
        
        </div>      
        </div>
        </div>
    )
}

export default Login;