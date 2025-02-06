import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import styles from '../styles/Activities.module.scss'
import PropTypes from 'prop-types'

function Activities(activities) {

  console.log("Activities : ", activities)

  const datas = activities.data.map((activity, index) => ({
    day: index + 1,
    kilogram: activity.kilogram,
    calories: activity.calories,
  }));

  return (
    <div className={styles.activities}>
      <ResponsiveContainer width={835} height={320}>
        <BarChart
          data={datas}
          margin={{
            top: 30,
            right: 0,
            left: 0,
            bottom: 30,
          }}
          barCategoryGap={26}
          barGap={5}
        >
          <CartesianGrid 
            strokeDasharray="2 2"
            vertical="false" 
          />
          <XAxis 
            dataKey="day"
          />
          <YAxis
            orientation="right" 
          />
          <Tooltip />
          <Legend 
            align="right" 
            verticalAlign="top"
            iconType="circle"
            iconSize={10}
            wrapperStyle={{ top: 30, right: 5 }}
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