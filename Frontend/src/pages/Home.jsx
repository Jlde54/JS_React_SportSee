import {Link} from 'react-router-dom'
import styles from '../styles/Home.module.scss'
import logoRed from '../assets/Logo_red.png'

/**
 * Home Component - Displays the homepage with user selection options
 *
 * @component
 * @returns {JSX.Element} - rendered Home component
 */
function Home () {
    return (
        <div className={styles.home}>
            {/* Logo image */}
            <img className={styles.home__logoImg} src={logoRed} alt="Logo SportSee" />
            {/* Title  */}
            <p className={styles.home__title}>Choisissez un utilisateur :</p>
            {/* Navigation links to user profiles */}
            <nav className={styles.home__nav}>
                <Link className={styles.home__link} to={'/user/12'}>Karl Dovineau</Link>
                <Link className={styles.home__link} to={'/user/18'}>Cecilia Ratorez</Link>
            </nav>
        </div>
    )
}

export default Home