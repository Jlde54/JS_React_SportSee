import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import styles from '../styles/ActivityChart.module.scss'
import PropTypes from 'prop-types'

function ActivityChart(avgSessions) {

  const datas = avgSessions.data.map((activity, index) => ({
    day: index + 1,
    kilogram: activity.kilogram,
    calories: activity.calories,
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className={styles.avgSessions__tooltip}>
          <p>{`${payload[0].value} kg`}</p>
          <p className={styles.avgSessions__tooltip_p}>{`${payload[1].value} kcal`}</p>
        </div>
      );
    }
    return null;
  }

  return (
    <div className={styles.avgSessions}>
      <h3 className={styles.avgSessions__title}>Activité quotidienne</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={702} 
          height={145}
          data={datas}
          margin={{
            top: 30,
            right: 0,
            left: 0,
            bottom: 30,
          }}
          barGap={5}
          barCategoryGap="5%"
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
            // scale="point"
            padding={{ left: 10, right: 0 }}
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
            // itemGap={50}
            wrapperStyle={{ 
              top: -30, 
              right: 10, 
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
            // barSize={7} 
            radius={[3, 3, 0, 0]} 
            // activeBar={<Rectangle fill="rgba(196, 196, 196, 0.5" />} 
          />
          <Bar
            layout="vertical"
            dataKey="calories"
            name="Calories brûlées (kCal)"
            fill="#E60000" 
            // barSize={7} 
            radius={[3, 3, 0, 0]} 
            // activeBar={<Rectangle 
            // fill="rgba(196, 196, 196, 0.5" />} 
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

ActivityChart.propTypes = {
  avgSessions: PropTypes.string,
  active:PropTypes.string,
  payload:PropTypes.string
}

export default ActivityChart