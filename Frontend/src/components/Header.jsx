import {Link} from 'react-router-dom'
import styles from '../styles/Header.module.scss'
import logoRed from '../assets/Logo_red.png'
import sportSee from '../assets/SportSee_red.png'

/**
 * Header Component - Displays the website header with the logo and main navigation
 *
 * @component
 * @returns {JSX.Element} - rendered Header component
 */
function Header() {

    return (
        <header className={styles.header}>
            <div className={styles.header__logo}>
                {/* Application logo */}
                <img className={styles.header__logoImg} src={logoRed} alt="Logo SportSee" />
                <img className={styles.header__logoName} src={sportSee} alt="SportSee name" />
            </div>
            {/* Main navigation */}
            <nav className={styles.header__nav}>
                <ul className={styles.header__ul}>
                    <li className={styles.header__li}><Link className={styles.header__li} to={'/'}>Accueil</Link></li>
                    <li className={styles.header__li}><a href='#'>Profil</a></li>
                    <li className={styles.header__li}><a href='#'>Réglage</a></li>
                    <li className={styles.header__li}><a href='#'>Communauté</a></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header