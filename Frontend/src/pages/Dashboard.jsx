import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUser } from '../services/UserService';
import styles from '../styles/Dashboard.module.scss';
import Header from '../components/Header.jsx';
import ActivityChart from '../components/ActivityChart.jsx';
import AvgSessionsChart from '../components/AvgSessionsChart.jsx';
import PerformanceChart from '../components/PerformanceChart.jsx';
import ScoreChart from '../components/ScoreChart.jsx';
import SideBar from '../components/SideBar.jsx';
import KeyData from '../components/KeyData.jsx';

/**
 * Composant Dashboard - Affiche les données de performance de l'utilisateur, son activité et ses métriques clés
 *
 * @component
 * @returns {JSX.Element} - composant Dashboard rendu
 */
function Dashboard () {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const {userId} = useParams();

    /**
     * Liste des métriques utilisateur incluant la clé, l'unité, l'image et le libellé.
     * @constant {Array<Object>}
     */
    const um = [
        {"key" : "calorieCount", unit: "kCal", img: "/src/assets/calories-icon.png", text: "Calories"},
        {"key" : "proteinCount", unit: "g", img: "/src/assets/protein-icon.png", text: "Protéines"},
        {"key" : "carbohydrateCount", unit: "g", img: "/src/assets/carbs-icon.png", text: "Glucides"},
        {"key" : "lipidCount", unit: "g", img: "/src/assets/fat-icon.png", text: "Lipides"}
    ]

    useEffect(() => {
        /**
         * Récupère les données utilisateur depuis l'API et met à jour le state.
         * @async
         * @function fetchData
         * @returns {Promise<void>} - la promesse ne retourne aucune valeur
         */
        async function fetchData () {
            try {
                setLoading(true);
                const userData = await getUser(userId);
                setUser(userData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            };
        }
        fetchData();
    }, [userId]);

    if (loading) return <div className={styles.dashboard__loading}>Loading...</div>;
    if (error) return <div>Error : {error}</div>;
    if (!user) return <div>No data available</div>;

    return (
        <>
            <Header />
            <div className={styles.dashboard}>
                <SideBar />
                <div className={styles.dashboard__content}>
                    <div className={styles.dashboard__intro}>
                        <div className={styles.dashboard__hello}>
                            Bonjour <span className={styles.dashboard__firstName}>{user.firstName}</span>
                        </div>
                        <div className={styles.dashboard__text}>
                            Félicitation ! Vous avez explosé vos objectifs hier 👏
                        </div>
                    </div>
                    <div className={styles.dashboard__data}>
                        <div className={styles.dashboard__graphics}>
                            <div className={styles.dashboard__activityChart}>
                                <ActivityChart data={user.activity}/>
                            </div>
                            <div className={styles.dashboard__otherCharts}>
                                <AvgSessionsChart data={user.averageSessions}/>
                                <PerformanceChart data={user.performance}/>
                                <ScoreChart data={user.score}/>
                            </div>
                        </div>
                        <div className={styles.dashboard__keydata}>
                            <KeyData um={um} user={user} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard