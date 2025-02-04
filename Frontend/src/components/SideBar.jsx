import styles from '../styles/SideBar.module.scss'
import yoga from '../assets/yoga_red_on_white.png'
import swimming from '../assets/swimming_red_on_white.png'
import cycling from '../assets/cycling_red_on_white.png'
import weight from '../assets/weight_red_on_white.png'

function SideBar() {

    return (
        <aside className={styles.SideBar}>
            <div className={styles.SideBar__activities}>
                <a href="#">
                    <img className={styles.SideBar__activities_img} src={yoga} alt="Logo Yoga" />
                </a>
                <a href="#">
                    <img className={styles.SideBar__activities_img} src={swimming} alt="Logo swimming" />
                </a>
                <a href="#">
                    <img className={styles.SideBar__activities_img} src={cycling} alt="Logo cycling" />
                </a>
                <a href="#">
                    <img className={styles.SideBar__activities_img} src={weight} alt="Logo weight" />
                </a>
            </div>
            <p className={styles.SideBar__copyright}>
                Copyright SportSee 2025
            </p>
        </aside>
    )
}

export default SideBar