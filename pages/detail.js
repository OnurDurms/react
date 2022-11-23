
import { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Router, { useRouter } from 'next/router';
import styles from '../styles/detail.module.css';
import { GET_MAIN, GET_SUB } from '../redux/types';
import axios from 'axios';

export default function Detail() {
    const mainListData = useSelector((state) => state.mainData);
    const { main } = mainListData;
    const subListData = useSelector((state) => state.subData);
    const { sub } = subListData;
    const isAdminData = useSelector((state) => state.isAdmin);
    const { isAdmin } = isAdminData;
    const router = useRouter()
    const { task, addTask } = router.query;
    const dispatch = useDispatch();
    const [taskState, setTaskState] = useState([]);
    const [addMessage, setAddMessage] = useState(0);
    const title = useRef();
    const description = useRef();
    const email = useRef();

    useEffect(() => {
        if (isAdmin == 1) {
            if (taskState.length == 0) {
                setTaskState(main.filter((item) => item._id == task));
            }
        } else {
            if (taskState.length == 0) {
                setTaskState(sub.filter((item) => item._id == task));
            }
        }
    }, [isAdmin == 1 ? main : sub])

    const updateItem = () => {
        const titleValue = title.current.value;
        const descriptionValue = description.current.value;
        const emailValue = email.current.value;

        if (isAdmin == 1) {
            for (let item of main) {
                if (item._id == taskState[0]._id) {
                    item.email = emailValue;
                    item.title = titleValue;
                    item.description = descriptionValue;
                }
            }
            dispatch({
                type: GET_MAIN,
                payload: main,
            });
        } else {
            for (let item of sub) {
                if (item._id == taskState[0]._id) {
                    item.email = emailValue;
                    item.title = titleValue;
                    item.description = descriptionValue;
                }
            }
            dispatch({
                type: GET_SUB,
                payload: sub,
            });
        }
        Router.push('/list')
    }

    const addItem = () => {
        const titleValue = title.current.value;
        const descriptionValue = description.current.value;
        const emailValue = email.current.value;
        axios.post("http://localhost:1453/api/task/save",{
            email: emailValue,
            title: titleValue,
            description: descriptionValue
        },{
            headers: {
              "x-access-token": localStorage.getItem("token")
            }
          })
            .then(res => setAddMessage(1))
            .catch(err => console.log(err));
    }
    const back = () => {
        Router.push('/list');
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
                                            <h1 className="fw-bold mb-20 text-uppercase">{addTask ? "Add Task" : "Edit Task"}</h1>
                                            <h4 className="fw-bold mb-2 text-uppercase">{taskState && taskState.length > 0 ? "Task #" + taskState[0]._id : ""}</h4>

                                            <div className="form-outline form-white mb-4">
                                                <input type="text" id="typeTitleX" className="form-control form-control-lg" defaultValue={taskState && taskState.length > 0 ? taskState[0].title : "Title"} ref={title} />
                                            </div>

                                            <div className="form-outline form-white mb-4">
                                                <input type="text" id="typeDescriptionX" className="form-control form-control-lg" defaultValue={taskState && taskState.length > 0 ? taskState[0].description : "Description"} ref={description} />
                                            </div>

                                            <div className="form-outline form-white mb-4">
                                                <input type="email" id="typeEmailX" className="form-control form-control-lg" defaultValue={taskState && taskState.length > 0 ? taskState[0].email : "Email"} ref={email} />
                                            </div>

                                            <div className="text-center">
                                                <p><a onClick={() => back()}>Back</a></p>
                                            </div>

                                            <button className="btn btn-outline-light btn-lg px-5" onClick={() => addTask ? addItem() : updateItem()}>{addTask ? "Ekle" : "Güncelle"} </button>

                                            {addMessage ? 
                                                <div className="text-center">
                                                    <p> Task Added</p>
                                                </div>
                                            : ""}
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