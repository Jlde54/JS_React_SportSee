import { User } from '../models/ModelUser.jsx';

const apiUrl = "http://localhost:3000/user/";
const localUrl = "../../mockedData/data.json";

export class UserService {
    // Récupération de l'utilisateur depuis l'API ou depuis les données mockées
    static async getUser(userId) {
        try {
            console.log(`Fetching user ${userId} from API...`);
            // Récupération des différentes parties des données utilisateur
            const userInfo = await this.fetchData(`${apiUrl}${userId}`, localUrl, userId);
            const userActivity = await this.fetchData(`${apiUrl}${userId}/activity`, localUrl, userId, "activity");
            const userSessions = await this.fetchData(`${apiUrl}${userId}/average-sessions`, localUrl, userId, "averageSessions");
            const userPerformance = await this.fetchData(`${apiUrl}${userId}/performance`, localUrl, userId, "performance");

            if (!userInfo || !userInfo.data) {
                throw new Error(`Données utilisateur ${userId} introuvables.`);
            }

            // Fusionner toutes les données dans un seul objet
            const completeUserData = {
                ...userInfo.data,
                activity: userActivity?.data?.sessions || [],
                averageSessions: userSessions?.data?.sessions || [],
                performance: userPerformance?.data || { data: [], kind: {} }
            };

            console.log("Complete User Data:", completeUserData);

            return new User(completeUserData);
        } catch (error) {
            console.error(`Erreur lors de la récupération de l'utilisateur ${userId}:`, error.message);
            throw error;
        }
    }
    // Récupération des données utilisateur depuis l'API ou depuis les données mockées
    static async fetchData(apiUrl, localUrl, userId, dataType = "user") {
        try {
            console.log(`Trying API call: ${apiUrl}`);
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error(`Erreur API : ${response.status}`);
            const apiData = await response.json();

            console.log(`Data from API (${dataType}) :`, apiData);
            return apiData;
        } catch (error) {
            console.warn(`API non accessible pour ${dataType}, basculement vers les données mockées...`, error.message);
            try {
                console.log(`Trying local mock data: ${localUrl}`);
                const localResponse = await fetch(localUrl);
                if (!localResponse.ok) throw new Error(`Erreur locale : ${localResponse.status}`);
                const mockedData = await localResponse.json();

                console.log("Mocked Data:", mockedData);
                const user = mockedData.users.find(user => Number(user.id) === Number(userId));

                if (!user) {
                    throw new Error(`Utilisateur ${userId} introuvable dans le mock.`);
                }
                console.log(`User Data (${dataType}): `, user);

                switch (dataType) {
                    case "activity":
                        return { data: { sessions: user.activity || [] } };
                    case "averageSessions":
                        return { data: { sessions: user.averageSessions || [] } };
                    case "performance":
                        return { data: user.performance || { data: [], kind: {} } };
                    default:
                        return { data: user };
                }

            } catch (jsonError) {
                console.error(`Échec du chargement des données locales pour ${dataType}: `, jsonError.message);
                throw new Error("Impossible de récupérer les données.");
            }
        }
    }
}