import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis, Legend } from "recharts";
import styles from '../styles/ScoreChart.module.scss'
import PropTypes from 'prop-types'

function ScoreChart (score) {

  const data = { value: score }

  console.log("score : ", score)
  console.log(typeof score)
  console.log("data : ", data)

  return (
    <div className={styles.score}>
      <ResponsiveContainer
        width="100%" 
        height="100%"
        style={{ backgroundColor: "#FBFBFB", borderRadius: 5 }}
      >
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="80%"
          outerRadius="100%"
          barSize={15}
          data={data}
          startAngle={90}
          endAngle={360 + 90}
        >
          {/* <Legend
            width={180}
            height={180}
            layout="vertical"
            verticalAlign="middle"
            align="center"
          /> */}
          <circle 
            cx="50%" 
            cy="50%" 
            fill="#FFFFFF" 
            r="33%">
          </circle>
          <RadialBar
          // minAngle={15}
          dataKey="value"
          fill="#FF0000"
          cornerRadius={20}
          />
          <PolarAngleAxis 
            type="number" 
            domain={[0, 1]} 
            tick={false} 
          />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>

  );
};

ScoreChart.propTypes = {
  score: PropTypes.object
}

export default ScoreChart;
