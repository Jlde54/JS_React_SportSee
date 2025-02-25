import styles from '../styles/SideBar.module.scss'
import yoga from '../assets/yoga_red_on_white.png'
import swimming from '../assets/swimming_red_on_white.png'
import cycling from '../assets/cycling_red_on_white.png'
import weight from '../assets/weight_red_on_white.png'

/**
 * SideBar Component - Displays a sidebar with activity icons and a copyright message
 *
 * @component
 * @returns {JSX.Element} - rendered SideBar component
 */
function SideBar() {

    return (
        <aside className={styles.SideBar}>
            <div className={styles.SideBar__activities}>
                {/* Yoga icon */}
                <a href="#">
                    <img className={styles.SideBar__activities_img} src={yoga} alt="Logo Yoga" />
                </a>
                {/* Swimming icon */}
                <a href="#">
                    <img className={styles.SideBar__activities_img} src={swimming} alt="Logo swimming" />
                </a>
                {/* Cycling icon */}
                <a href="#">
                    <img className={styles.SideBar__activities_img} src={cycling} alt="Logo cycling" />
                </a>
                {/* Weightlifting icon */}
                <a href="#">
                    <img className={styles.SideBar__activities_img} src={weight} alt="Logo weight" />
                </a>
            </div>
            {/* Copyright text */}
            <p className={styles.SideBar__copyright}>
                Copyright SportSee 2025
            </p>
        </aside>
    )
}

export default SideBar