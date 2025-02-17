export class User {
    constructor(data) {
        this.id = data.id;
        this.firstName = data.userInfos?.firstName || "Inconnu";
        this.lastName = data.userInfos?.lastName || "Inconnu";
        this.age = data.userInfos?.age || 0;
        this.score = data.todayScore ?? data.score ?? 0;
        this.keyData = this.formatKeyData(data.keyData);
        this.activity = this.formatActivity(data.activity);
        this.averageSessions = this.formatAverageSessions(data.averageSessions);
        this.performance = this.formatPerformance(data.performance);
    }

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

    formatActivity(activity) {
        return Array.isArray(activity)
            ? activity.map(a => ({
                day: a.day,
                kilogram: a.kilogram || 0,
                calories: a.calories || 0,
            }))
            : [];
    }

    formatAverageSessions(averageSessions) {
        return Array.isArray(averageSessions)
            ? averageSessions.map(s => ({
                day: s.day || 0,
                sessionLength: s.sessionLength || 0,
            }))
            : [];
    }

    formatPerformance(performance) {
        return performance?.data
            ? performance.data.map(perf => ({
                value: perf.value,
                kind: performance.kind?.[perf.kind] || "Inconnu"
            }))
            : [];
    }
}