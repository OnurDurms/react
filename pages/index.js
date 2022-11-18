
import { useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Router from 'next/router';
import styles from '../styles/login.module.css'
import { GET_SUB, IS_ADMIN } from '../redux/types';

export default function Login() {
    const dispatch = useDispatch();
    const email = useRef();
    const password = useRef();
    const mainListData = useSelector((state) => state.mainData);
    const { main } = mainListData;

    const login = () => {
        const emailValue = email.current.value;
        const passwordValue = password.current.value;

        const selectedItemFilter = main.filter((item) => item.email == emailValue && item.password == passwordValue);
        if(selectedItemFilter.length > 0){
            if(!selectedItemFilter[0].isAdmin){
                dispatch({
                    type: IS_ADMIN,
                    payload: 0,
                  });
                dispatch({
                    type: GET_SUB,
                    payload: selectedItemFilter,
                  });
            }else{
                dispatch({
                    type: IS_ADMIN,
                    payload: 1,
                  });
            }
            Router.push('/list');
        }
    }
    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <section className="vh-100 gradient-custom">
                    <div className="container py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                                <div className="card bg-dark text-white">
                                    <div className="card-body p-5 text-center">
                                        <div className="mb-md-5 mt-md-4 pb-5">
                                            <h1 className="fw-bold mb-20 text-uppercase">To Do App!</h1>
                                            <h4 className="fw-bold mb-2 text-uppercase">Login</h4>
                                            <p className="text-white-50 mb-5">Please enter your login and password!</p>

                                            <div className="form-outline form-white mb-4">
                                                <input type="email" id="typeEmailX" className="form-control form-control-lg" placeholder='Email' ref={email}/>
                                            </div>

                                            <div className="form-outline form-white mb-4">
                                                <input type="password" id="typePasswordX" className="form-control form-control-lg" placeholder='Password' ref={password}/>
                                            </div>

                                            <p className="small mb-5 pb-lg-2"><a className="text-white-50" href="#!">Forgot password?</a></p>

                                            <button className="btn btn-outline-light btn-lg px-5" onClick={() => login()}>Login</button>

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