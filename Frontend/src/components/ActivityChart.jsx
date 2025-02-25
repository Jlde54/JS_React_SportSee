import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import styles from '../styles/ActivityChart.module.scss'
import PropTypes from 'prop-types'

/**
 * ActivityChart Component - Displays a bar chart representing a user's daily activity
 *
 * @component
 * @param {Object} activities - user's activity data
 * @param {Array<Object>} activities.data - activities.data - array containing activity data
 * @returns {JSX.Element} - rendered ActivityChart component
 */
function ActivityChart(activities) {
  /**
   * Formats the activity data for the chart
   * @constant
   * @type {Array<Object>}
   */
  const data = activities.data.map((activity) => ({
    day: activity.day.split("-")[2],
    kilogram: activity.kilogram,
    calories: activity.calories,
  }));

  /**
   * Component for displaying the tooltip
   *
   * @component
   * @param {Object} props - component properties
   * @param {boolean} props.active - indicates if the tooltip is active
   * @param {Array<Object>} props.payload - contains the values of the bars under the cursor
   * @returns {JSX.Element|null} - tooltip content or null if inactive
   */
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className={styles.activities__tooltip}>
          <p>{`${payload[0].value} kg`}</p>
          <p className={styles.activities__tooltip_p}>{`${payload[1].value} kcal`}</p>
        </div>
      );
    }
    return null;
  }

  return (
    <div className={styles.activities}>
      <h3 className={styles.activities__title}>Activité quotidienne</h3>
      <ResponsiveContainer 
        width="100%" 
        height="100%"
      >
        <BarChart
          data={data}
          margin={{
            top: 30,
            right: 0,
            left: 0,
            bottom: 30,
          }}
          barGap={5}
          barSize={7} 
        >
          <CartesianGrid 
            strokeDasharray="2 2"
            vertical={false}
          />
          <XAxis 
            dataKey="day"
            tickLine={false}
            tickMargin={15}
            tick={{
              fill: "#9B9EAC",
              fontSize: 14,
              fontWeight: 500
            }}
            tickFormatter={(day) => parseInt(day, 10)}
          />
          <YAxis
            orientation="right" 
            tickCount={3}
            axisLine={false}
            tickLine={false}
            tickMargin={15}
            tick={{
              fill: "#9B9EAC",
              fontSize: 14,
              fontWeight: 500
            }}
          />
          <Tooltip
            content={<CustomTooltip />}
          />
          <Legend 
            align="right" 
            verticalAlign="top"
            layout="horizontal" 
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ 
              top: -16, 
              right: 5, 
              color: "#74798C", 
              fontSize: 14,
            }}
            formatter={(value) => (
              <span style={{ color: "#74798C",verticalAlign: "middle" }}>{value}</span>
            )}

          />
          <Bar
            layout="vertical"
            dataKey="kilogram"
            name="Poids (kg)"
            fill="#282D30" 
            radius={[3, 3, 0, 0]} 
          />
          <Bar
            layout="vertical"
            dataKey="calories"
            name="Calories brûlées (kCal)"
            fill="#E60000" 
            radius={[3, 3, 0, 0]} 
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

ActivityChart.propTypes = {
  activities: PropTypes.array,
  active:PropTypes.bool,
  payload:PropTypes.object
}

export default ActivityChart