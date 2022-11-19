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
    if(e == 1){
      Router.push({
        pathname: '/detail',
        query: { task: task.taskId },
      })
    }else{
      let itemStatus = 2;
      if(e == 3){
        itemStatus = 1
      }
      if(isAdmin == 1){
        main.filter((el) => el.taskId == task.taskId )[0].status = itemStatus;
        dispatch({
          type: GET_MAIN,
          payload: main,
        });
      }else{
        sub.filter((el) => el.taskId == task.taskId )[0].status = itemStatus;
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
        <div className={"row"}>
           <div className="col-lg-12">
              <h1 className={"text-center " + styles.title}>
                  To Do List
              </h1>
          </div>
          {dataState && dataState.length > 0 ? 
              dataState.map((el,index) => 
              <div key={index} className={el.status == 2 ? "col-lg-4 " + styles.opacity + " " + styles.flipCard: "col-lg-4 " + styles.flipCard}>
                <div className={styles.flipCardInner}>
                  <div className={styles.flipCardFront}>
                    <h2 className={styles.marginButtom}>Task #{el.taskId}</h2>
                    <h3 className={styles.marginButtom}>{el.taskTitle}</h3>
                    <p className={styles.marginButtom}>{el.taskDescription}</p>
                    <div className={"row " + styles.marginButtom}>
                      <div className={"col-lg-12 " + styles.user}>
                        <span>Atanan: {el.name}</span>
                      </div>
                      <div className={"col-lg-12 " + styles.createDate}>
                        <span>Oluşturulma Tarihi: {el.created_at}</span>
                      </div>
                    </div>
                  </div>
                  <div className={styles.flipCardBack}>
                    <div className={"row " + styles.marginButtom}>
                      <div className="col-lg-12">
                          <button type="button" className="btn btn-warning" onClick={() => settings(1,el)}>Düzenle</button>
                      </div>
                      {el.status == 2 ? 
                      <div className="col-lg-12">
                          <button type="button" className="btn btn-outline-light " onClick={() => settings(3,el)}>Geri Al</button>
                      </div> : 
                      <div className="col-lg-12">
                          <button type="button" className="btn btn-danger" onClick={() => settings(2,el)}>Sil</button>
                      </div>}
                    </div>
                  </div>
                </div>
              </div>
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
