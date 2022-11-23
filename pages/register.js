
import { useRef, useState } from 'react';
import Router from 'next/router';
import styles from '../styles/login.module.css'
import axios from 'axios';

export default function Register() {
    const [registerText,setRegisterState] = useState(0);
    const name = useRef();
    const email = useRef();
    const password = useRef();
    const isAdmin = useRef();

    const register = () => {
        const nameValue = name.current.value;
        const emailValue = email.current.value;
        const passwordValue = password.current.value;
        const isAdminValue = isAdmin.current.value;

        axios.post("http://localhost:1453/api/user/register", {
                name: nameValue,
                email: emailValue,
                password: passwordValue,
                isAdmin: isAdminValue
          })
            .then(res => {
                setRegisterState(1);
            })
            .catch((err) => console.log(err));
    }

    const login = () => {
        Router.push('/');
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
                                            <h4 className="fw-bold mb-2 text-uppercase">Register</h4>

                                            <div className="form-outline form-white mb-4">
                                                <input type="email" id="typeNameX" className="form-control form-control-lg" placeholder='Name' ref={name} />
                                            </div>

                                            <div className="form-outline form-white mb-4">
                                                <input type="email" id="typeEmailX" className="form-control form-control-lg" placeholder='Email' ref={email} />
                                            </div>

                                            <div className="form-outline form-white mb-4">
                                                <input type="password" id="typePasswordX" className="form-control form-control-lg" placeholder='Password' ref={password} />
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" defaultValue={true} id="flexCheckChecked" ref={isAdmin}/>
                                                <label className={"form-check-label " + styles.checkLabel} htmlFor="flexCheckChecked">
                                                     isAdmin
                                                </label>
                                            </div>

                                            <div className="text-center">
                                                <p><a onClick={() => login()}>Login</a></p>
                                            </div>
                                            <button className="btn btn-outline-light btn-lg px-5" onClick={() => register()}>Register</button>
                                            {registerText ? 
                                            <div className="text-center">
                                                <p> Registration Successfull</p>
                                            </div> : ""}

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