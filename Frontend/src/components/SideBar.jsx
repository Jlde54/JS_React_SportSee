import styles from '../styles/SideBar.module.scss'
import yoga from '../assets/yoga_red_on_white.png'
import swimming from '../assets/swimming_red_on_white.png'
import cycling from '../assets/cycling_red_on_white.png'
import weight from '../assets/weight_red_on_white.png'

/**
 * Composant SideBar - Affiche une barre latérale avec des icônes d'activités et un message de copyright
 *
 * @component
 * @returns {JSX.Element} - composant SideBar rendu
 */
function SideBar() {

    return (
        <aside className={styles.SideBar}>
            <div className={styles.SideBar__activities}>
                {/* Icône de Yoga */}
                <a href="#">
                    <img className={styles.SideBar__activities_img} src={yoga} alt="Logo Yoga" />
                </a>
                {/* Icône de Natation */}
                <a href="#">
                    <img className={styles.SideBar__activities_img} src={swimming} alt="Logo swimming" />
                </a>
                {/* Icône de Cyclisme */}
                <a href="#">
                    <img className={styles.SideBar__activities_img} src={cycling} alt="Logo cycling" />
                </a>
                {/* Icône de Musculation */}
                <a href="#">
                    <img className={styles.SideBar__activities_img} src={weight} alt="Logo weight" />
                </a>
            </div>
            {/* Texte de copyright */}
            <p className={styles.SideBar__copyright}>
                Copyright SportSee 2025
            </p>
        </aside>
    )
}

export default SideBar