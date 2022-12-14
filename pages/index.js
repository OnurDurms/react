
import { useRef } from 'react';
import { useDispatch } from "react-redux";
import Router from 'next/router';
import styles from '../styles/login.module.css'
import { GET_SUB, IS_ADMIN } from '../redux/types';
import axios from 'axios';

export default function Login() {
    const dispatch = useDispatch();
    const email = useRef();
    const password = useRef();

    const login = () => {
        const emailValue = email.current.value;
        const passwordValue = password.current.value;

        axios.post("http://localhost:1453/api/user/login", {
                email: emailValue,
                password: passwordValue
          })
            .then(res => {
                localStorage.setItem("token", res.data.token);
                if (!res.data.user.isAdmin) {
                    dispatch({
                        type: IS_ADMIN,
                        payload: 0,
                    });
                    dispatch({
                        type: GET_SUB,
                        payload: res.data.user,
                    });
                } else {
                    dispatch({
                        type: IS_ADMIN,
                        payload: 1,
                    });
                }
                Router.push('/list');
            })
            .catch((err) => console.log(err));
    }

    const register = () => {
        Router.push('/register');
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
                                            <h1 className="fw-bold mb-20 text-uppercase">To Do List App!</h1>
                                            <h4 className="fw-bold mb-2 text-uppercase">Login</h4>
                                            <p className="text-white-50 mb-5">Please enter your login and password!</p>

                                            <div className="form-outline form-white mb-4">
                                                <input type="email" id="typeEmailX" className="form-control form-control-lg" placeholder='Email' ref={email} />
                                            </div>

                                            <div className="form-outline form-white mb-4">
                                                <input type="password" id="typePasswordX" className="form-control form-control-lg" placeholder='Password' ref={password} />
                                            </div>
                                            <div className="text-center">
                                                <p>Not a member? <a onClick={() => register()}>Register</a></p>
                                            </div>
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