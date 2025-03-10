import { LineChart, Line, XAxis, CartesianGrid, Tooltip, ResponsiveContainer, Rectangle } from "recharts"
import styles from '../styles/AvgSessionsChart.module.scss'
import PropTypes from 'prop-types'

/**
 * AvgSessionsChart Component - Displays a line chart representing the average session duration
 *
 * @component
 * @param {Object} avgSessions - user's average session data
 * @param {Array<Object>} avgSessions.data - array containing session data
 * @returns {JSX.Element} - rendered AvgSessionsChart component
 */
function AvgSessionsChart(avgSessions) {
  /**
   * Abbreviated days of the week
   * @constant
   * @type {Array<string>}
   */
  const days = ["L", "M", "M", "J", "V", "S", "D"]

  /**
   * Formats the average session data for the chart
   * @constant
   * @type {Array<Object>}
   */
  const data = avgSessions.data.map((session) => ({
    day: days[session.day - 1],
    session: session.sessionLength
  }));

  /**
   * Component for displaying the tooltip
   *
   * @component
   * @param {Object} props - propriétés du composant
   * @param {boolean} props.active - indique si le tooltip est actif
   * @param {Array<Object>} props.payload - contient les valeurs de la session sous la souris.
   * @returns {JSX.Element|null} - contenu du tooltip ou null si inactif.
   */
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

  /**
   * Component for displaying the semi-transparent rectangle
   *
   * @component
   * @param {Object} props - cursor properties
   * @param {Array<Object>} props.points - chart coordinates hovered by the mouse
   * @param {number} props.width - width of the rectangle to draw
   * @param {number} props.height - height of the rectangle to draw
   * @returns {JSX.Element} - rectangle to be drawn
   */
  const CustomCursor = (props) => {
    const { points, width, height } = props;
    const { x } = points[0];
    return (
      <Rectangle
        fill="rgba(0, 0, 0, 0.2)"
        stroke="rgba(0, 0, 0, 0.2)"
        x={x}
        y={0}
        width={width}
        height={height+points[1].y}
      />
    );
  };

  return (
    <div className={styles.avgSessions}>
      <ResponsiveContainer 
        width="100%" 
        height="100%"
      >
        <LineChart
          data={data}
          margin={{ top: 50, right: 10, left: 10, bottom: 10 }}
        >
          <text 
            x={20} 
            y={25} 
            fill="#FFFFFF"
            opacity={0.6}
            fontSize={11} 
            fontWeight={500}
          >Durée moyenne des
          </text>
          <text 
            x={20} 
            y={45} 
            fill="#FFFFFF"
            opacity={0.6}
            fontSize={11} 
            fontWeight={500}
          >sessions
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
            padding={{ 
              left: 10, 
              right: 10 
            }}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={<CustomCursor />}
          />
          <Line
            type="monotone" 
            dataKey="session" 
            stroke="#FFFFFF"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

AvgSessionsChart.propTypes = {
  avgSessions: PropTypes.array,
  active:PropTypes.bool,
  payload:PropTypes.object,
  points:PropTypes.object, 
  width:PropTypes.number, 
  height:PropTypes.number,
}

export default AvgSessionsChart