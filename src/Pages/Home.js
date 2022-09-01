import React, {useState, useEffect} from 'react';
import css from '../cssModules/Add.module.css'
import { useSelector} from 'react-redux';
import { useNavigate, Link} from "react-router-dom";


const Home = () => {
    const navigate = useNavigate();
    const user = useSelector(state => state.details);
    const [task, setTask] = useState([])
    const [message, setMessage] = useState('')
    const companyId = user.company_id
    const token = user.token
    const getUsers = async (id, tok) => {
        console.log(id, tok)
        const apiRequest = await fetch(` https://stage.api.sloovi.com/task/lead_465c14d0e99e4972b6b21ffecf3dd691?company_id=${id}`,{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${tok}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
        }) 

        const result = await apiRequest.json()
       setTask([...result.results])
    }

    useEffect(()=> {
        getUsers(companyId, token)
    },[message,companyId, token])

    const closeMsg = () => {
        setMessage('')
    }

    const deleteTask = async (id, cId) => {
        try{
            const apiRequest = await fetch(`https://stage.api.sloovi.com/task/lead_465c14d0e99e4972b6b21ffecf3dd691/${id}?company_id=${cId}`,{
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                  },
            }) 
    
            const result = await apiRequest.json()
            console.log(result)
            setMessage(result.message)
        }
        catch(error){
            setMessage(error.message)
        }
    }

    const editTask = (task_id,msg, dt, time) => {
        navigate('/edit', {state:{
            msg,
            dt,
            time,
            task_id
    }})
    }

    return(
        <div  className={css.addBody}>
        {message ? <div className={css.message}>
            <span>{message}</span>
            <span onClick={closeMsg}>
            <img src="https://img.icons8.com/ios/17/000000/cancel.png" alt='working'/>
            </span>
        </div> : ''}
        <nav>
        Sloovi
        </nav> 

        <h1>Home</h1>
        <div className={css.taskContainer}>
        <div className={css.taskHead}>Task</div> 
        <div>
        <Link
        to='/add'
        >
        <img 
        src="https://img.icons8.com/ios-glyphs/30/40C057/add--v1.png"
        alt='add'
        />
        </Link>
        </div>
        </div>
        <div className={css.homeBody}>
        {task.map((res, i) => <div className={css.taskOutline} key={i}>
        <div>{res.task_msg}<br/>
        <span>{res.task_date}</span>
        </div>
        <div>
        <img 
        src="https://img.icons8.com/ios-glyphs/16/000000/edit--v1.png"
        alt='edit'
        onClick={() => editTask(res.id,res.task_msg, res.task_date, res.task_date_time_in_utc_string)}
        />
        </div>
        <div 
        onClick={()=>deleteTask(res.id, res.company_id)}
        >
        <img 
        src="https://img.icons8.com/ios-glyphs/16/00000./filled-trash.png"
        alt="delete"
        />
        </div>

        </div>) }
        
        </div>
        </div>
    )
}

export default Home;