import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts"
import styles from '../styles/PerformanceChart.module.scss'
import PropTypes from 'prop-types'

function PerformanceChart(performance) {

  const datas = performance.data.data.map((perf) => ({
    kind: performance.data.kind[perf.kind],
    value: perf.value
  }));

  return (
    <div className={styles.performance}>
      <ResponsiveContainer 
        width="100%" 
        height="100%"
        style={{ backgroundColor: "#000000", borderRadius: 5 }}
      >
        <RadarChart
          cx="50%" 
          cy="50%"
          data={datas}
        >
          <PolarGrid
          />
          <PolarAngleAxis 
            dataKey="kind" 
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
  performance: PropTypes.string
}

export default PerformanceChart