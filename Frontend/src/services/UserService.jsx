import { User } from '../models/ModelUser.jsx';

const apiUrl = "http://localhost:3000/user/";
const localUrl = "../../mockedData/data.json";

/**
 * Retrieves all user data (info, activity, average sessions, performance).
 * If the API fails, automatically switches to local data..
 * 
 * @param {string} userId - User ID.
 * @returns {Promise<User>} - Complete user instance.
 * @throws {Error} - If the data cannot be retrieved.
 */
export async function getUser(userId) {
    try {
        // Fetch user data from the API
        const userInfo = await fetchData(`${apiUrl}${userId}`);
        const userActivity = await fetchData(`${apiUrl}${userId}/activity`);
        const userSessions = await fetchData(`${apiUrl}${userId}/average-sessions`);
        const userPerformance = await fetchData(`${apiUrl}${userId}/performance`);

        return mergeUserData(userInfo, userActivity, userSessions, userPerformance);
    } catch (error) {
         // If the API is not accessible, display a warning and use local mock data instead
        console.warn(`API non accessible, basculement vers les données mockées...`, error.message);
        return await fetchLocalUser(userId);
    }
}

/**
 * Performs a fetch request to a given URL.
 * 
 * @param {string} url - URL to query.
 * @returns {Promise<Object>} - Data returned by the API.
 * @throws {Error} - If the request fails.
 */
async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Erreur API : ${response.status}`);
    return await response.json();
}

/**
 * Retrieves all user data from mocked data in a single call.
 * 
 * @param {string} userId - User ID.
 * @returns {Promise<User>} - Complete user instance.
 * @throws {Error} - If the user is not found.
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
 * Merges all user data into a single user instance.
 * 
 * @param {Object} userInfo - Main user information.
 * @param {Object} userActivity - Daily activity data.
 * @param {Object} userSessions - Average session data.
 * @param {Object} userPerformance - Performance data.
 * @returns {User} - Complete user instance.
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
