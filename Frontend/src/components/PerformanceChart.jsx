import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts"
import styles from '../styles/PerformanceChart.module.scss'
import PropTypes from 'prop-types'

/**
 * Composant PerformanceChart - Affiche un graphique radar représentant la performance de l'utilisateur
 *
 * @component
 * @param {Object} performance - données de performance de l'utilisateur
 * @param {Array<Object>} performance.data - tableau contenant les valeurs de performance
 * @returns {JSX.Element} - composant PerformanceChart rendu
 */
function PerformanceChart(performance) {

  /**
   * Formate les données de performance pour le graphique
   * @constant
   * @type {Array<Object>}
   */
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