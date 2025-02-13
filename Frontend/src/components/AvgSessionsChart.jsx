import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Rectangle } from "recharts"
import styles from '../styles/AvgSessionsChart.module.scss'
import PropTypes from 'prop-types'

function AvgSessionsChart(avgSessions) {

  const days = ["L", "M", "M", "J", "V", "S", "D"]

  const datas = avgSessions.data.map((session) => ({
    day: days[session.day - 1],
    session: session.sessionLength
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className={styles.avgSessions__tooltip}>
          <p>{`${payload[0].value} min`}</p>
        </div>
      );
    }
    return null;
  }

  const CustomCursor = (props) => {
    const { points, width, height, stroke } = props;
    const { x, y } = points[0];
    const { x1, y1 } = points[1];
    console.log(props);
    return (
      <Rectangle
        fill="rgba(0, 0, 0, 0.2)"
        stroke="rgba(0, 0, 0, 0.2)"
        x={x}
        y={y}
        width={width}
        height={height}
      />
    );
  };

  return (
    <div className={styles.avgSessions}>
      <ResponsiveContainer 
        width="100%" 
        height="100%"
        style={{ backgroundColor: "#FF0000", borderRadius: 5 }}
      >
        <LineChart
          width={258} 
          height={263}
          data={datas}
          margin={{ top: 50, right: 10, left: 10, bottom: 10 }}
        >
          <text 
            x={20} y={20} 
            fill="#FFFFFF"
            opacity={0.6}
            fontSize={15} 
            fontWeight={500}
          >
            Durée moyenne des sessions
          </text>
          <CartesianGrid
            vertical={false}
            horizontal={false}
          />
          <XAxis 
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tickMargin={10}
            tick={{
              fill: "#FFFFFF",
              fontSize: 12,
              fontWeight: 500,
              opacity: 0.6
            }}
            padding={{ left: 10, right: 10 }}
          />
          {/* <YAxis
            axisLine={false}
            tickLine={false}
            tick={false}
          /> */}
          <Tooltip
            content={<CustomTooltip />}
            cursor={<CustomCursor />}
          />
          <Line
            type="monotone" 
            dataKey="session" 
            stroke="#FFFFFF"
            dot={false}
            isAnimationActive={false}
            domain={[(dataMin) => dataMin - 5, (dataMax) => dataMax + 5]} 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

AvgSessionsChart.propTypes = {
  avgSessions: PropTypes.string,
  active:PropTypes.string,
  payload:PropTypes.string,
  points:PropTypes.number, 
  width:PropTypes.number, 
  height:PropTypes.number, 
  stroke:PropTypes.number
}

export default AvgSessionsChart