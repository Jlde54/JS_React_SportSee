import styles from '../styles/KeyData.module.scss'
import PropTypes from 'prop-types'

/**
 * Composant KeyData - Affiche les métriques clés représentant les calories, protéines, glucides, lipides consommés par l'utilisateur
 *
 * @component
 * @param {Array<Object>} um - tableau contenant les métrics clés
 * @param {Object} user - données l'utilisateur
 * @returns {JSX.Element} - composant KeyData rendu
 */
function KeyData({um, user}) {
  return (
    <div className={styles.keyData}>
      {um.map((item) => (
        <div key={item.key} className={styles.keyData__activity}>
            <img className={styles.keyData__activity_img} src={item.img} alt={`Logo ${item.text}`} />
            <div className={styles.keyData__activity_content}>
                <p className={styles.keyData__activity_content_p1}>{user.keyData[item.key]}{item.unit}</p>
                <p className={styles.keyData__activity_content_p2}>{item.text}</p>
            </div>
        </div>
    ))}
    </div>
  );
}

KeyData.propTypes = {
  um: PropTypes.array,
  user: PropTypes.object
}

export default KeyData