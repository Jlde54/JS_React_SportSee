/**
 * Classe représentant un utilisateur
 */
export class User {
    /**
     * Instance de User.
     * @param {Object} data - données de l'utilisateur
     */
    constructor(data) {
        /**
         * @property {number} id - identifiant
         */
        this.id = data.id;
        /**
         * @property {string} firstName - prénom
         */
        this.firstName = data.userInfos?.firstName || "Inconnu";
        /**
         * @property {string} lastName - nom de famille
         */
        this.lastName = data.userInfos?.lastName || "Inconnu";
        /**
         * @property {number} age - âge
         */
        this.age = data.userInfos?.age || 0;
        /**
         * @property {number} score - score
         */
        this.score = data.todayScore ?? data.score ?? 0;
        /**
         * @property {Object} keyData - données clés (calories, protéines, glucides, lipides)
         */
        this.keyData = this.formatKeyData(data.keyData);
        /**
         * @property {Array<Object>} activity - historique d'activité
         */
        this.activity = this.formatActivity(data.activity);
        /**
         * @property {Array<Object>} averageSessions - durée moyenne des sessions
         */
        this.averageSessions = this.formatAverageSessions(data.averageSessions);
        /**
         * @property {Array<Object>} performance - indicateurs de performance
         */
        this.performance = this.formatPerformance(data.performance);
    }

    /**
     * Formate les données clés de l'utilisateur
     * @param {Object} keyData - données clés brutes
     * @returns {Object} - données clés formatées
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
     * Formate les données d'activité de l'utilisateur
     * @param {Array<Object>} activity - données brutes d'activité
     * @returns {Array<Object>} - données d'activité formatées
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
     * Formate les sessions moyennes de l'utilisateur
     * @param {Array<Object>} averageSessions - données brutes des sessions moyennes
     * @returns {Array<Object>} - sessions moyennes formatées
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
     * Formate les données de performance de l'utilisateur
     * @param {Object} performance - données brutes de performance
     * @returns {Array<Object>} - données de performance formatées
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