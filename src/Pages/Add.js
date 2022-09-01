import React, {useState} from 'react'
import css from '../cssModules/Add.module.css'
import { useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';

const Add = () => {
    let navigate = useNavigate()
    
    let date = new Date()
    let sec = date.getHours() * 360 + date.getMinutes() * 60;
    console.log(sec)
    const user = useSelector(state => state.details);
    const logedIn = useSelector(state => state.loggedIn);
    const authorization = user.token
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [data, setData] = useState({
        assigned_user: user.user_id,
        task_date: '',
        task_time: '',
        is_completed: 0,
        time_zone: sec,
        task_msg: ''
    })

    if(!logedIn){
        navigate('/login')
    }

    const convertTime = (param) => {
        console.log(param)
        let val = param.split(':')
        let time = parseInt(val[0])*360 + parseInt(val[1]*60)

        return time;
    }

    const changeData = (e) => {
        const  name = e.target.name
         const value = e.target.value
         setData({
             ...data,
             [name]: value
         })   
     }

     const cancel = () => {
        navigate('/Home')
     }

     const closeMsg = () => {
        setMessage('')
    }

     const submitBtn = async () =>{ 
        try{
            setLoading(true)
            console.log(data)
            if(!data.task_date || !data.task_msg || !data.task_time){
                setLoading(false)
                setMessage('please fill all fields')
                return
            }

            const bod = {
                assigned_user: data.assigned_user,
                task_date: data.task_date,
                task_time: convertTime(data.task_time),
                is_completed: data.is_completed,
                time_zone: data.time_zone,
                task_msg: data.task_msg
            }
    
            const apiRequest = await fetch(` https://stage.api.sloovi.com/task/lead_465c14d0e99e4972b6b21ffecf3dd691?company_id=${user.company_id}`,{
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${authorization}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                  },
                body: JSON.stringify(bod)
            }) 
    
            const result = await apiRequest.json()
            if(apiRequest.status === 200){
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
        <div className={css.addBody}>
             {message ? <div className={css.message}>
            <span>{message}</span>
            <span onClick={closeMsg}>
            <img src="https://img.icons8.com/ios/17/000000/cancel.png" alt='working'/>
            </span>
        </div> : ''}
            <nav>
            Sloovi
            </nav>
            <h1>Add Task</h1>
            <div className={css.addForm}>
                <div>
                    <label>Task description</label><br/>
                    <input
                     type='text'
                     name='task_msg'
                     value={data.task_msg}
                     onChange={changeData}
                     />
                </div>
                <div className={css.date_time}> 
                <div>
                    <label>Date</label><br/>
                    <input
                     type='date'
                     name='task_date'
                     value={data.task_date}
                     onChange={changeData}
                     />
                </div>
                <div>
                    <label>Time</label><br/>
                    <input
                     type='time'
                     name='task_time'
                     value={data.task_time}
                     onChange={changeData}
                     />
                </div>
                </div>
                <div>
                <label>Assign User</label><br/>
                    <input
                     type='text'
                     name='asigned_user'
                     value='osuji chiaka'
                     readOnly
                     />
                </div>
                <div className={css.saveContainer}>
                    <span
                    onClick={cancel}
                    >cancel</span>
                    <button 
                    className={css.saveBtn}
                    onClick={submitBtn}
                    >
                    {loading ? 'saving...' : 'save'}    
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Add;