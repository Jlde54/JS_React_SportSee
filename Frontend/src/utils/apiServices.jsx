const apiUrl = "http://localhost:3000/user/";
const localUrl = "../../mockedData/data.json";

export async function fetchUserData(userId) {

    console.log("userId fetchUserData :", userId)

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`Erreur API : ${response.status}`);
        }
        const userData = await response.json();
        return userData.data;

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
            return {
                id: user.id,
                userInfos: user.userInfos
            };

        } catch (jsonError) {
            console.error("❌ Échec du chargement des données locales :", jsonError.message);
            throw new Error("Impossible de récupérer les données.");
        }
    }
}

export async function fetchUseractivities(userId) {
    const apiUrl = `http://localhost:3000/user/${userId}/activity`;
    const localUrl = "../../mockedData/data.json";

    console.log("userId fetchUseractivities :", userId)

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`Erreur API : ${response.status}`);
        }
        const userData = await response.json();
        return userData.data;

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
            console.log("user fetchUseractivities :", user)

            if (!user) throw new Error("Utilisateur non trouvé dans les données locales.");
            return {
                activities: user.activity
            };

        } catch (jsonError) {
            console.error("❌ Échec du chargement des données locales :", jsonError.message);
            throw new Error("Impossible de récupérer les données.");
        }
    }
}