import {Link} from 'react-router-dom'
import styles from '../styles/Home.module.scss'
import logoRed from '../assets/Logo_red.png'

function Home () {

    return (
        <div className={styles.home}>
            <img className={styles.home__logoImg} src={logoRed} alt="Logo SportSee" />
            <p className={styles.home__title}>Choisissez un utilisateur :</p>
            <nav className={styles.home__nav}>
                <Link className={styles.home__link} to={'/user/12'}>Karl Dovineau</Link>
                <Link className={styles.link} to={'/user/18'}>Cecilia Ratorez</Link>
            </nav>
        </div>
    )
}

export default Home