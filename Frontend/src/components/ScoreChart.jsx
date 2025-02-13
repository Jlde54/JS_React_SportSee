import { RadialBarChart, RadialBar, Legend, ResponsiveContainer, PolarAngleAxis } from "recharts"
import styles from '../styles/ScoreChart.module.scss'
import PropTypes from 'prop-types'

function ScoreChart(score) {

  const data = [{name: "Quart de cercle", value: score * 100 }];

  return (
    <div style={{ width: "100%", height: "300px", backgroundColor: "#F0F0F0", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <ResponsiveContainer width={300} height={300}>
        <RadialBarChart
          innerRadius="80%" // ✅ Rend la barre fine pour un effet cercle
          outerRadius="100%" 
          data={data}
          startAngle={90} // ✅ Part du haut
          endAngle={180} // ✅ Va vers la gauche
        >
          {/* ✅ Ajoute un cercle blanc en fond */}
          <RadialBar
            data={[{ name: "Background", value: 100 }]} // ✅ Valeur fixe correcte
            dataKey="value"
            fill="#FFFFFF" // ✅ Cercle blanc
            background // ✅ Affiche le fond derrière la barre
          />

          {/* ✅ Barre rouge */}
          <RadialBar
            dataKey="value"
            fill="#FF0000" // ✅ Barre rouge
            cornerRadius="50%" // ✅ Arrondit la barre
          />
          {/* ✅ Supprime les axes */}
          <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
}

ScoreChart.propTypes = {
  score: PropTypes.number
}

export default ScoreChart