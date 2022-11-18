import { useDispatch, useSelector } from "react-redux";
import Router from 'next/router';
import styles from '../styles/list.module.css'
import { GET_MAIN, GET_SUB } from "../redux/types";
import { useState, useEffect } from "react";

export default function List() {
  const mainListData = useSelector((state) => state.mainData);
  const { main } = mainListData;
  const subListData = useSelector((state) => state.subData);
  const { sub } = subListData;
  const isAdminData = useSelector((state) => state.isAdmin);
  const { isAdmin } = isAdminData;
  const dispatch = useDispatch();
  const [dataState,setDataState] = useState([]);

  useEffect(() => {
    if(isAdmin == 1){
      if(main !== dataState){
        setDataState(main);
      }
    }else{
      if(sub !== dataState){
        setDataState(sub.filter((el) => el.status !== 2));
      }
    }
  }, [isAdmin == 1 ? main : sub]);

  const settings = (e,task) => {
    if(e.target.value == 1){
      Router.push({
        pathname: '/detail',
        query: { task: task.taskId },
      })
    }else{
      if(isAdmin == 1){
        main.filter((el) => el.taskId == task.taskId )[0].status = 2;
        dispatch({
          type: GET_MAIN,
          payload: main,
        });
      }else{
        sub.filter((el) => el.taskId == task.taskId )[0].status = 2;
        dispatch({
          type: GET_SUB,
          payload: sub,
        });
      }
    }
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
            To Do App!
        </h1>

        <div className={styles.grid}>
          {dataState && dataState.length > 0 ? 
              dataState.map((el) => 
                  <a key={el.taskId} className={el.status == 2 ? styles.opacity : styles.card}>
                    <h2 className={styles.marginButtom}>Task #{el.taskId}</h2>
                    <h3 className={styles.marginButtom}>{el.taskTitle}</h3>
                    <p className={styles.marginButtom}>{el.taskDescription}</p>
                    <div className={"row " + styles.marginButtom}>
                      <div className="col-lg-6">
                        <span>Atanan: {el.name}</span>
                      </div>
                      <div className="col-lg-6">
                        <span>Oluşturulma Tarihi: {el.created_at}</span>
                      </div>
                    </div>
                    <select className={"form-select form-select-sm " + styles.cardSelectBox} defaultValue={"0"} onChange={(e) => settings(e,el)} aria-label=".form-select-sm example">
                      <option value="0">İşlemler</option>
                      <option value="1">Düzenle</option>
                      <option value="2">Sil</option>
                    </select>
                  </a>
              )
          : ""}
        </div>
      </main>
    </div>
  )
}
