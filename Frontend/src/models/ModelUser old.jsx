export class User {
    constructor(data) {
        this.id = data.id;
        this.firstName = data.userInfos.firstName;
        this.lastName = data.userInfos.lastName;
        this.age = data.userInfos.age;
        this.score = data.todayScore || data.score || 0; // Certaines données utilisent "todayScore", d'autres "score"
        this.keyData = new KeyData(data.keyData);
        this.activity = data.activity.map(a => new Activity(a));
        this.averageSessions = data.averageSessions.map(s => new AverageSession(s));
        this.performance = new Performance(data.performance);
    }
}

export class KeyData {
    constructor(data) {
        this.calorieCount = data.calorieCount;
        this.proteinCount = data.proteinCount;
        this.carbohydrateCount = data.carbohydrateCount;
        this.lipidCount = data.lipidCount;
    }
}

export class Activity {
    constructor(data) {
        this.day = data.day;
        this.kilogram = data.kilogram;
        this.calories = data.calories;
    }
}

export class AverageSession {
    constructor(data) {
        this.day = data.day;
        this.sessionLength = data.sessionLength;
    }
}

export class Performance {
    constructor(data) {
        this.data = data.data.map(p => new PerformanceData(p, data.kind));
    }
}

export class PerformanceData {
    constructor(data, kind) {
        this.value = data.value;
        this.kind = kind[data.kind]; // Traduction des indices de performance en labels
    }
}

// Exemple d'utilisation
// const rawData = {
//     "users": [
//         {
//             "id": 12,
//             "userInfos": {
//                 "firstName": "Karl",
//                 "lastName": "Dovineau",
//                 "age": 31
//             },
//             "todayScore": 0.12,
//             "keyData": {
//                 "calorieCount": 1930,
//                 "proteinCount": 155,
//                 "carbohydrateCount": 290,
//                 "lipidCount": 50
//             },
//             "activity": [
//                 { "day": "2020-07-01", "kilogram": 80, "calories": 240 },
//                 { "day": "2020-07-02", "kilogram": 80, "calories": 220 }
//             ],
//             "averageSessions": [
//                 { "day": 1, "sessionLength": 30 },
//                 { "day": 2, "sessionLength": 23 }
//             ],
//             "performance": {
//                 "data": [
//                     { "value": 80, "kind": 1 },
//                     { "value": 120, "kind": 2 }
//                 ],
//                 "kind": {
//                     "1": "cardio",
//                     "2": "energy"
//                 }
//             }
//         }
//     ]
// };

// const users = rawData.users.map(userData => new User(userData));
// console.log(users);
