/**
 * Class representing a user
 */
export class User {
    /**
     * Instance of User..
     * @param {Object} data - user's data
     */
    constructor(data) {
        /**
         * @property {number} id - identifier
         */
        this.id = data.id;
        /**
         * @property {string} firstName - first name
         */
        this.firstName = data.userInfos?.firstName || "Inconnu";
        /**
         * @property {string} lastName - last name
         */
        this.lastName = data.userInfos?.lastName || "Inconnu";
        /**
         * @property {number} age - age
         */
        this.age = data.userInfos?.age || 0;
        /**
         * @property {number} score - score
         */
        this.score = data.todayScore ?? data.score ?? 0;
        /**
         * @property {Object} keyData - key data (calories, proteins, carbohydrates, lipids)
         */
        this.keyData = this.formatKeyData(data.keyData);
        /**
         * @property {Array<Object>} activity - activity history
         */
        this.activity = this.formatActivity(data.activity);
        /**
         * @property {Array<Object>} averageSessions - average session duration
         */
        this.averageSessions = this.formatAverageSessions(data.averageSessions);
        /**
         * @property {Array<Object>} performance - performance indicators
         */
        this.performance = this.formatPerformance(data.performance);
    }

    /**
     * Formats the user's key data
     * @param {Object} keyData - raw key data
     * @returns {Object} - formatted key data
     */
    formatKeyData(keyData) {
        return keyData
            ? {
                calorieCount: keyData.calorieCount || 0,
                proteinCount: keyData.proteinCount || 0,
                carbohydrateCount: keyData.carbohydrateCount || 0,
                lipidCount: keyData.lipidCount || 0,
            }
            : { calorieCount: 0, proteinCount: 0, carbohydrateCount: 0, lipidCount: 0 };
    }

    /**
     * Formats the user's activity data
     * @param {Array<Object>} activity - raw activity data
     * @returns {Array<Object>} - formatted activity data
     */
    formatActivity(activity) {
        return Array.isArray(activity)
            ? activity.map(a => ({
                day: a.day,
                kilogram: a.kilogram || 0,
                calories: a.calories || 0,
            }))
            : [];
    }

    /**
     * Formats the user's average sessions
     * @param {Array<Object>} averageSessions - raw average session data
     * @returns {Array<Object>} - formatted average sessions
     */
    formatAverageSessions(averageSessions) {
        return Array.isArray(averageSessions)
            ? averageSessions.map(s => ({
                day: s.day || 0,
                sessionLength: s.sessionLength || 0,
            }))
            : [];
    }

    /**
     * Formats the user's performance data
     * @param {Object} performance - raw performance data
     * @returns {Array<Object>} - formatted performance data
     */
    formatPerformance(performance) {
        return performance?.data
            ? performance.data.map(perf => ({
                value: perf.value,
                kind: performance.kind?.[perf.kind] || "Inconnu"
            }))
            : [];
    }
}