/* eslint-disable no-undef */
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis, Legend } from "recharts";
import styles from '../styles/RadialBarChart.module.scss'
import PropTypes from 'prop-types'

function ScoreChart (score) {

    const data = { value: score }

    const LegendGoal = () => {
        const userScore = data.value
        
        return (
        <div className={styles.score_container}>
            <span className={styles.score}>{userScore ? userScore * 100 : 0}%</span>
            <div>
            <p className={styles.description}>de votre objectif</p>
            </div>
        </div>
        )
    }

    return (
        <div className={styles.goal_container}>
        <h3>Score</h3>
        <ResponsiveContainer>
            <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="80%"
            outerRadius="90%"
            barSize={15}
            data={data}
            startAngle={90}
            endAngle={360 + 90}
            >
            <PolarAngleAxis type="number" domain={[0, 1]} tick={false} />
            <RadialBar
                minAngle={15}
                dataKey="value"
                fill="red"
                cornerRadius={20}
            />
            <Legend
                width={180}
                height={180}
                layout="vertical"
                verticalAlign="middle"
                align="center"
                content={<LegendGoal />}
            />
            <circle cx="50%" cy="50%" fill="white" r="33%"></circle>
            </RadialBarChart>
        </ResponsiveContainer>
        </div>
    )
}

ScoreChart.propTypes = {
  score: PropTypes.any
}

export default ScoreChart