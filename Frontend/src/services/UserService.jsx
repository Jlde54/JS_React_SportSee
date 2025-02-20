import { User } from '../models/ModelUser.jsx';

const apiUrl = "http://localhost:3000/user/";
const localUrl = "../../mockedData/data.json";

/**
 * Récupère toutes les données utilisateur (infos, activité, sessions moyennes, performances).
 * Si l'API échoue, bascule automatiquement vers les données locales.
 * 
 * @param {string} userId - ID de l'utilisateur.
 * @returns {Promise<User>} - Instance complète de l'utilisateur.
 * @throws {Error} - Si les données ne peuvent pas être récupérées.
 */
export async function getUser(userId) {
    try {

        // Récupération séquentielle des données depuis l'API
        const userInfo = await fetchData(`${apiUrl}${userId}`);
        const userActivity = await fetchData(`${apiUrl}${userId}/activity`);
        const userSessions = await fetchData(`${apiUrl}${userId}/average-sessions`);
        const userPerformance = await fetchData(`${apiUrl}${userId}/performance`);

        return mergeUserData(userInfo, userActivity, userSessions, userPerformance);
    } catch (error) {
        // Fallback unique vers les données locales
        console.warn(`API non accessible, basculement vers les données mockées...`, error.message);
        return await fetchLocalUser(userId);
    }
}

/**
 * Effectue une requête fetch vers une URL donnée.
 * 
 * @param {string} url - URL à interroger.
 * @returns {Promise<Object>} - Données retournées par l'API.
 * @throws {Error} - Si la requête échoue.
 */
async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Erreur API : ${response.status}`);
    return await response.json();
}

/**
 * Récupère toutes les données utilisateur à partir des données mockées en un seul appel.
 * 
 * @param {string} userId - ID de l'utilisateur.
 * @returns {Promise<User>} - Instance complète de l'utilisateur.
 * @throws {Error} - Si l'utilisateur n'est pas trouvé.
 */
async function fetchLocalUser(userId) {
    const response = await fetch(localUrl);
    if (!response.ok) throw new Error(`Erreur locale : ${response.status}`);
    const mockedData = await response.json();

    const user = mockedData.users.find(user => Number(user.id) === Number(userId));
    if (!user) throw new Error(`Utilisateur ${userId} introuvable dans le mock.`);

    return mergeUserData(
        { data: user },
        { data: { sessions: user.activity || [] } },
        { data: { sessions: user.averageSessions || [] } },
        { data: user.performance || { data: [], kind: {} } }
    );
}

/**
 * Assemble toutes les données de l'utilisateur dans une instance unique.
 * 
 * @param {Object} userInfo - Informations principales de l'utilisateur.
 * @param {Object} userActivity - Données d'activité quotidienne.
 * @param {Object} userSessions - Données des sessions moyennes.
 * @param {Object} userPerformance - Données de performance.
 * @returns {User} - Instance complète de l'utilisateur.
 */
function mergeUserData(userInfo, userActivity, userSessions, userPerformance) {
    const completeUserData = {
        ...userInfo.data,
        activity: userActivity?.data?.sessions || [],
        averageSessions: userSessions?.data?.sessions || [],
        performance: userPerformance?.data || { data: [], kind: {} }
    };

    return new User(completeUserData);
}
