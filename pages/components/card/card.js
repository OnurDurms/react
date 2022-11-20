import styles from '../../../styles/list.module.css'

export default function Card({el,settings,index}) {
    return (
        <>
            <div key={index} className={el.status == 2 ? "col-lg-4 " + styles.opacity + " " + styles.flipCard : "col-lg-4 " + styles.flipCard}>
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
                                <button type="button" className="btn btn-warning" onClick={() => settings(1, el)}>Düzenle</button>
                            </div>
                            {el.status == 2 ?
                                <div className="col-lg-12">
                                    <button type="button" className="btn btn-outline-light " onClick={() => settings(3, el)}>Geri Al</button>
                                </div> :
                                <div className="col-lg-12">
                                    <button type="button" className="btn btn-danger" onClick={() => settings(2, el)}>Sil</button>
                                </div>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}