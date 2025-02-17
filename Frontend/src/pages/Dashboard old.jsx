import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { fetchUserData, fetchactivities, fetchavgSessions, fetchPerformance } from '../services/api.jsx';
import styles from '../styles/Dashboard.module.scss'
import Header from '../components/Header.jsx'
import ActivityChart from '../components/ActivityChart.jsx'
import AvgSessionsChart from '../components/AvgSessionsChart.jsx'
import PerformanceChart from '../components/PerformanceChart.jsx'
import ScoreChart from '../components/ScoreChart.jsx'
import SideBar from '../components/SideBar.jsx'

function Dashboard () {
    const [data, setData] = useState(null);
    const [activity, setActivity] = useState([]);
    const [avgSessions, setAvgSessions] = useState([]);
    const [performance, setPerformance] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const {userId} = useParams();

    const um = [
        {"key" : "calorieCount", unit: "kCal", img: "/src/assets/calories-icon.png", text: "Calories"},
        {"key" : "proteinCount", unit: "g", img: "/src/assets/protein-icon.png", text: "Protéines"},
        {"key" : "carbohydrateCount", unit: "g", img: "/src/assets/carbs-icon.png", text: "Glucides"},
        {"key" : "lipidCount", unit: "g", img: "/src/assets/fat-icon.png", text: "Lipides"}
    ]

    useEffect(() => {
        async function getData () {
            try {
                setLoading(true);
                const userData = await fetchUserData(userId);
                const userActivity = await fetchactivities(userId);
                const useravgSessions = await fetchavgSessions(userId);
                const userPerformance = await fetchPerformance(userId);
                setData(userData);
                setActivity(userActivity || []);
                setAvgSessions(useravgSessions || []);
                setPerformance(userPerformance || {});
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
                        <div className={styles.dashboard__text}>
                            Félicitation ! Vous avez explosé vos objectifs hier 👏
                        </div>
                    </div>
                    <div className={styles.dashboard__data}>
                        <div className={styles.dashboard__graphics}>
                            <div className={styles.dashboard__activityChart}>
                                <ActivityChart data={activity}/>
                            </div>
                            <div className={styles.dashboard__otherCharts}>
                                <AvgSessionsChart data={avgSessions}/>
                                <PerformanceChart data={performance}/>
                                <ScoreChart data={data.todayScore || data.score}/>
                            </div>
                        </div>
                        <div className={styles.dashboard__keydata}>
                            {um.map((item) => (
                                <div key={item.key} className={styles.dashboard__activity}>
                                    <img className={styles.dashboard__activity_img} src={item.img} alt={`Logo ${item.text}`} />
                                    <div className={styles.dashboard__activity_content}>
                                        <p className={styles.dashboard__activity_content_p1}>{data.keyData[item.key]}{item.unit}</p>
                                        <p className={styles.dashboard__activity_content_p2}>{item.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard