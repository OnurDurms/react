import { useDispatch, useSelector } from "react-redux";
import Router from 'next/router';
import styles from '../styles/list.module.css'
import { GET_MAIN, GET_SUB } from "../redux/types";
import { useState, useEffect } from "react";
import Card from "./components/card/card";

export default function List() {
  const mainListData = useSelector((state) => state.mainData);
  const { main } = mainListData;
  const subListData = useSelector((state) => state.subData);
  const { sub } = subListData;
  const isAdminData = useSelector((state) => state.isAdmin);
  const { isAdmin } = isAdminData;
  const dispatch = useDispatch();
  const [dataState, setDataState] = useState([]);

  useEffect(() => {
      if (isAdmin == 1) {
        if (main !== dataState) {
          setDataState(main);
        }
      } else {
        if (sub !== dataState) {
          setDataState(sub.filter((el) => el.status !== 2));
        }
      }
  }, [isAdmin == 1 ? main : sub]);


  const settings = (e, task) => {
    if (e == 1) {
      Router.push({
        pathname: '/detail',
        query: { task: task._id },
      })
    } else {
      let itemStatus = 2;
      if (e == 3) {
        itemStatus = 1
      }
      if (isAdmin == 1) {
        main.filter((el) => el._id == task._id)[0].status = itemStatus;
        dispatch({
          type: GET_MAIN,
          payload: main,
        });
      } else {
        sub.filter((el) => el._id == task._id)[0].status = itemStatus;
        dispatch({
          type: GET_SUB,
          payload: sub,
        });
      }
    }
  }

  const addTask = () => {
    Router.push({
      pathname: '/detail',
      query: { addTask: true },
    })
  }
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={"row"}>
          <div className="col-lg-12">
            <h1 className={"text-center " + styles.title}>
              To Do List
            </h1>
          </div>
          <div className={"col-lg-12 " + styles.addButton}>
            <button className="btn btn-outline-light btn-lg px-5" onClick={() => addTask()}>Add Task</button>
          </div>

          {dataState && dataState.length > 0 ?
            dataState.map((el, index) =>
              <Card el={el} index={index} key={index} settings={settings}/>
            )
            :
            <div className="col-lg-12">
              <p className="text-center ">
                Kullanıcıya ait task bulunamadı.
              </p>
            </div>}
        </div>
      </main>
    </div>
  )
}
