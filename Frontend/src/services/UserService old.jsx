import { User } from '../models/ModelUser.jsx';

const apiUrl = "http://localhost:3000/user/";
const localUrl = "../../mockedData/data.json";

/**
 * Classe UserService - Récupération des données utilisateur depuis l'API ou les données mockées
 */
export class UserService {
    /**
     * Récupère les données utilisateur depuis l'API ou les données mockées
     * 
     * @param {string} userId - ID de l'utilisateur
     * @returns {Promise<User>} - promesse résolvant une instance de User
     * @throws {Error} - Si les données utilisateur ne peuvent pas être récupérées
     */
    static async getUser(userId) {
        try {
            // Récupération des différentes parties des données utilisateur
            const userInfo = await this.fetchData(`${apiUrl}${userId}`, localUrl, userId);
            const userActivity = await this.fetchData(`${apiUrl}${userId}/activity`, localUrl, userId, "activity");
            const userSessions = await this.fetchData(`${apiUrl}${userId}/average-sessions`, localUrl, userId, "averageSessions");
            const userPerformance = await this.fetchData(`${apiUrl}${userId}/performance`, localUrl, userId, "performance");

            if (!userInfo || !userInfo.data) {
                throw new Error(`Données utilisateur ${userId} introuvables.`);
            }

            // Fusion de toutes les données en un seul objet
            const completeUserData = {
                ...userInfo.data,
                activity: userActivity?.data?.sessions || [],
                averageSessions: userSessions?.data?.sessions || [],
                performance: userPerformance?.data || { data: [], kind: {} }
            };

            return new User(completeUserData);
        } catch (error) {
            console.error(`Erreur lors de la récupération de l'utilisateur ${userId}:`, error.message);
            throw error;
        }
    }
     /**
     * Récupère les données utilisateur depuis l'API ou utilise les données mockées si l'API est inaccessible
     * 
     * @param {string} apiUrl - URL de l'endpoint API
     * @param {string} localUrl - chemin des données mockées
     * @param {string} userId - ID de l'utilisateur à récupérer
     * @param {string} [dataType="user"] - type de données à récupérer (ex: "user", "activity", "averageSessions", "performance")
     * @returns {Promise<Object>} - promesse résolvant les données utilisateur demandées
     * @throws {Error} - Si ni l'API ni les données mockées ne sont accessibles
     */
    static async fetchData(apiUrl, localUrl, userId, dataType = "user") {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error(`Erreur API : ${response.status}`);
            const apiData = await response.json();
            return apiData;
        } catch (error) {
            console.warn(`API non accessible pour ${dataType}, basculement vers les données mockées...`, error.message);
            try {
                const localResponse = await fetch(localUrl);
                if (!localResponse.ok) throw new Error(`Erreur locale : ${localResponse.status}`);
                const mockedData = await localResponse.json();

                const user = mockedData.users.find(user => Number(user.id) === Number(userId));

                if (!user) {
                    throw new Error(`Utilisateur ${userId} introuvable dans le mock.`);
                }

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