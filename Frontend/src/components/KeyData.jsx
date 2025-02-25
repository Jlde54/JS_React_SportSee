import styles from '../styles/KeyData.module.scss'
import PropTypes from 'prop-types'

/**
 * KeyData Component - Displays key metrics representing the calories, proteins, carbohydrates, and lipids consumed by the user
 *
 * @component
 * @param {Array<Object>} um - array containing the key metrics
 * @param {Object} user - user's data
 * @returns {JSX.Element} - rendered KeyData component
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