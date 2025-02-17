import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts"
import styles from '../styles/PerformanceChart.module.scss'
import PropTypes from 'prop-types'

function PerformanceChart(performance) {
  console.log("performance 2 : ", performance)

  const data = performance.data.map((perf) => ({
    kind: perf.kind,
    value: perf.value
  }));

  return (
    <div className={styles.performance}>
      <ResponsiveContainer 
        width="100%" 
        height="100%"
      >
        <RadarChart
          cx="50%" 
          cy="50%"
          data={data}
          outerRadius="70%"
        >
          <PolarGrid
          />
          <PolarAngleAxis 
            dataKey="kind"
            tick={{
              fontSize: "0.7vw",
              fill: "white"
            }}
          />
          <Radar
            dataKey="value" 
            stroke="#FF0101"
            fill="#FF0101"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

PerformanceChart.propTypes = {
  performance: PropTypes.array.isRequired
}

export default PerformanceChart