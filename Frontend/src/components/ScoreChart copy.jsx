import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from "recharts";
import styles from '../styles/ScoreChart.module.scss'
import PropTypes from 'prop-types'

const ScoreChart = (score) => {
  console.log(".data : ", score.data)
  console.log(typeof score)
  const data = [{ name: "Progression", value: Number(score.data * 100) }];
  console.log("data : ", data)
  return (
    <div style={{
      width: "100%",
      height: "300px",
      backgroundColor: "#FBFBFB",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative"
    }}>
      {/* ✅ Ajout d'un cercle blanc en arrière-plan */}
      <div style={{
        position: "absolute",
        width: "230px",
        height: "230px",
        backgroundColor: "#FFFFFF", // ✅ Cercle blanc
        borderRadius: "50%", // ✅ Cercle parfait
        zIndex: 0
      }}></div>

      <ResponsiveContainer width={300} height={300}>
        <RadialBarChart
          cx="50%" cy="50%"
          innerRadius="85%" // Positionne la barre rouge
          outerRadius="100%" // Utilisation complète de l'espace
          startAngle={90} // Part du haut
          endAngle={90 + ( data[0].value * 3.6)}
          barSize={10}
          data={data}
        >
          <RadialBar
            dataKey="value"
            fill="#FF0000"
            cornerRadius={5}
          />

          <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
};

ScoreChart.propTypes = {
  score: PropTypes.object
}

export default ScoreChart;
