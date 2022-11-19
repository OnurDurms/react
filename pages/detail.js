
import { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Router,{ useRouter } from 'next/router';
import styles from '../styles/detail.module.css';
import { GET_MAIN, GET_SUB } from '../redux/types';

export default function Detail() {
    const mainListData = useSelector((state) => state.mainData);
    const { main } = mainListData;
    const subListData = useSelector((state) => state.subData);
    const { sub } = subListData;
    const isAdminData = useSelector((state) => state.isAdmin);
    const { isAdmin } = isAdminData;
    const router = useRouter()
    const { task } = router.query;
    const dispatch = useDispatch();
    const [taskState,setTaskState] = useState([])
    const title = useRef();
    const description = useRef();
    const email = useRef();

    useEffect(() => {
        if(isAdmin == 1){
            if(taskState.length == 0){
                setTaskState(main.filter((item) => item.taskId == task));
            }
        }else{
            if(taskState.length == 0){
                setTaskState(sub.filter((item) => item.taskId == task));
            }
        }
    },[isAdmin == 1 ? main : sub])

    const updateItem = () => {
        const titleValue = title.current.value;
        const descriptionValue = description.current.value;
        const emailValue = email.current.value;
        
        if(isAdmin == 1){
            for(let item of main){
                if(item.taskId == taskState[0].taskId){
                    item.email = emailValue;
                    item.taskTitle = titleValue;
                    item.taskDescription = descriptionValue;
                }
            }
            dispatch({
                type: GET_MAIN,
                payload: main,
            });
        }else{
            for(let item of sub){
                if(item.taskId == taskState[0].taskId){
                    item.email = emailValue;
                    item.taskTitle = titleValue;
                    item.taskDescription = descriptionValue;
                }
            }
            dispatch({
                type: GET_SUB,
                payload: sub,
            });
        }
        Router.push({
            pathname: '/list',
          })
    }
    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <section className="vh-100 gradient-custom">
                    <div className="container py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                                <div className={"card text-white " + styles.card}>
                                    <div className={"card-body p-5 text-center " + styles.cardBody}>
                                        <div className="mb-md-5 mt-md-4 pb-5">
                                            <h1 className="fw-bold mb-20 text-uppercase">Edit Task</h1>
                                            <h4 className="fw-bold mb-2 text-uppercase">{taskState && taskState.length > 0 ? "Task #" + taskState[0].taskId : ""}</h4>

                                            <div className="form-outline form-white mb-4">
                                                <input type="text" id="typeTitleX" className="form-control form-control-lg" defaultValue={taskState && taskState.length > 0 ? taskState[0].taskTitle : ""} ref={title}/>
                                            </div>

                                            <div className="form-outline form-white mb-4">
                                                <input type="text" id="typeDescriptionX" className="form-control form-control-lg" defaultValue={taskState && taskState.length > 0 ? taskState[0].taskDescription : ""} ref={description}/>
                                            </div>
                                            
                                            <div className="form-outline form-white mb-4">
                                                <input type="email" id="typeEmailX" className="form-control form-control-lg" defaultValue={taskState && taskState.length > 0 ? taskState[0].email : ""} ref={email}/>
                                            </div>

                                            <button className="btn btn-outline-light btn-lg px-5" onClick={() => updateItem()}>Güncelle</button>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}