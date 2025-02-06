const apiUrl = "http://localhost:3000/user/";
const localUrl = "../../mockedData/data.json";

export async function fetchUserData(userId) {
    return fetchData(`${apiUrl}/${userId}`, localUrl, userId);
}

export async function fetchActivities(userId) {
    return fetchData(`${apiUrl}/${userId}`, localUrl, userId, "activity");
}

export async function fetchAvgSessions(userId) {
    return fetchData(`${apiUrl}/${userId}`, localUrl, userId, "averageSessions");
}

export async function fetchPerformance(userId) {
    return fetchData(`${apiUrl}/${userId}`, localUrl, userId, "performance");
}

export async function fetchData(apiUrl, localUrl, userId, key = null) {
    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`Erreur API : ${response.status}`);
        }
        const userData = await response.json();
        return userData;

    } catch (error) {
        console.warn("⚠️ Impossible d’accéder à l’API => utilisation des données locales…", error.message);

        // Chargement des données locales en cas d’échec
        try {
            const localResponse = await fetch(localUrl);

            if (!localResponse.ok) {
                throw new Error(`Erreur lors du chargement des données locales : ${localResponse.status}`);
            }
            const mockedData = await localResponse.json();

            const user = mockedData.users.find(user => Number(user.id) === Number(userId));
            console.log("user fetchUserData :", user)

            if (!user) throw new Error("Utilisateur non trouvé dans les données locales.");
            return key ? user[key] : user;

        } catch (jsonError) {
            console.error("❌ Échec du chargement des données locales :", jsonError.message);
            throw new Error("Impossible de récupérer les données.");
        }
    }
}