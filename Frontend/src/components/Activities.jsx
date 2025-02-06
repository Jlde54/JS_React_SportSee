import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import styles from '../styles/Activities.module.scss'
import PropTypes from 'prop-types'

function Activities(activities) {

  const datas = activities.data.map((activity, index) => ({
    day: index + 1,
    kilogram: activity.kilogram,
    calories: activity.calories,
  }));

  return (
    <div className={styles.activities}>
      <h3 className={styles.activities__title}>Activité quotidienne</h3>
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
          barCategoryGap="0%"
          barGap={5}
        >
          <CartesianGrid 
            strokeDasharray="2 2"
            vertical={false}
          />
          <XAxis 
            dataKey="day"
            tickLine={false}
            tickMargin={15}
            // scale="band"
            padding={{ left: 0, right: 0 }}
          />
          <YAxis
            orientation="right" 
            tickCount={3}
            axisLine={false}
            tickLine={false}
            tickMargin={15}
          />
          <Tooltip />
          <Legend 
            align="right" 
            verticalAlign="top"
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ top: -30, right: 10 }}
          />
          <Bar
            layout="vertical"
            dataKey="kilogram"
            name="Poids (kg)"
            fill="#282D30" 
            barSize={7} 
            radius={[3, 3, 0, 0]} 
            activeBar={<Rectangle fill="rgba(196, 196, 196, 0.5" />} 
          />
          <Bar
            layout="vertical"
            dataKey="calories"
            name="Calories brûlées (kCal)"
            fill="#E60000" 
            barSize={7} 
            radius={[3, 3, 0, 0]} 
            activeBar={<Rectangle 
            fill="rgba(196, 196, 196, 0.5" />} 
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

Activities.propTypes = {
  activities: PropTypes.string.isRequired
}

export default Activities