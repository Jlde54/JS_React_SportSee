import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { fetchUserData } from '../utils/apiServices.jsx';
import styles from '../styles/Dashboard.module.scss'
import Header from '../components/Header.jsx'
import Sessions from '../components/Sessions.jsx'
import Calories from '../components/Calories.jsx'
import SideBar from '../components/SideBar.jsx'
// import mockedData from '../../mockedData/data.json'

function Dashboard () {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const {userId} = useParams();

    useEffect(() => {
        async function getData () {
            try {
                setLoading(true);
                const userData = await fetchUserData(userId);
                setData(userData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            };
        }

        getData();
    }, [userId]);

    if (loading) return <div className={styles.dashboard__loading}>Loading...</div>;
    if (error) return <div>Error : {error}</div>;
    if (!data) return <div>No data available</div>;

    return (
        <>
            <Header />
            <div className={styles.dashboard}>
                <SideBar />
                <div className={styles.dashboard__content}>
                    <div className={styles.dashboard__intro}>
                        <div className={styles.dashboard__hello}>
                            Bonjour {data?.userInfos?.firstName ? (
                            <span className={styles.dashboard__firstName}>{data.userInfos.firstName}</span>
                        ) : (
                            "utilisateur"
                        )}
                        </div>
                        <div className={styles.dashboarde__text}>
                            Félicitation ! Vous avez explosé vos objectifs hier 👏
                        </div>
                    </div>
                    <div className={styles.dashboard__graphics}>
                        <Sessions />
                        <Calories />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard