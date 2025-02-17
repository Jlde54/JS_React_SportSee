import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from "recharts";
import styles from '../styles/ScoreChart.module.scss'
import PropTypes from 'prop-types'

function ScoreChart (score) {

  const data = [{ name: "Progression", value: Number(score.data * 100) }];
  
  return (
    <div className={styles.score}>
      <h3 className={styles.score__title}>Score</h3>
      <ResponsiveContainer 
        width="100%" 
        height="100%">
        <RadialBarChart
          cx="50%" 
          cy="50%"
          innerRadius="70%"
          outerRadius="100%"
          startAngle={90}
          endAngle={360 + 90}
          barSize={10}
          data={data}
        >
          <circle 
            cx="50%" 
            cy="50%" 
            fill="#FFFFFF" 
            r="33%">
          </circle>
          <RadialBar
            dataKey="value"
            fill="#FF0000"
            cornerRadius={5}
          />

          <PolarAngleAxis 
            type="number" 
            domain={[0, 100]} 
            tick={false} 
          />
          <text 
            x="50%" 
            y="45%" 
            textAnchor="middle" 
            dominantBaseline="middle" 
            fontSize="2vw" 
            fontWeight="700"
            fill="#282D30"
          >
            {score.data * 100}%
          </text>
          <text 
            x="50%" 
            y="55%"
            textAnchor="middle" 
            dominantBaseline="middle" 
            fontSize="1vw" 
            fontWeight="500" 
            fill="#74798C"
          >
            <tspan x="50%" dy="0">de votre</tspan>
            <tspan x="50%" dy="20">objectif</tspan>
          </text>
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
};

ScoreChart.propTypes = {
  score: PropTypes.number
}

export default ScoreChart;
