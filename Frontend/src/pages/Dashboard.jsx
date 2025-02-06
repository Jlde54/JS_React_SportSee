import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { fetchUserData, fetchActivities, fetchAvgSessions, fetchPerformance } from '../utils/api.jsx';
import styles from '../styles/Dashboard.module.scss'
import Header from '../components/Header.jsx'
import Activities from '../components/Activities.jsx'
import SideBar from '../components/SideBar.jsx'

function Dashboard () {
    const [data, setData] = useState(null);
    const [activity, setActivity] = useState([]);
    // const [avgSessions, setAvgSessions] = useState([]);
    // const [performance, setPerformance] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const {userId} = useParams();

    useEffect(() => {
        async function getData () {
            try {
                setLoading(true);
                const userData = await fetchUserData(userId);
                const userActivity = await fetchActivities(userId);
                // const userAvgSessions = await fetchAvgSessions(userId);
                // const userPerformance = await fetchPerformance(userId);
                setData(userData);
                setActivity(userActivity || []);
                // setAvgSessions(userAvgSessions || []);
                // setPerformance(userPerformance || {});
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
                            Bonjour <span className={styles.dashboard__firstName}>{data.userInfos.firstName}</span>
                        </div>
                        <div className={styles.dashboarde__text}>
                            Félicitation ! Vous avez explosé vos objectifs hier 👏
                        </div>
                    </div>
                    <Activities data={activity}/>
                </div>
            </div>
        </>
    )
}

export default Dashboard