export async function fetchUserData(userId) {
    const apiUrl = `http://localhost:3000/user/${userId}`;
    const localUrl = "../../mockedData/data.json";

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
            const user = mockedData.users.find(user => user.id === Number(userId));

            if (!user) throw new Error("Utilisateur non trouvé dans les données locales.");
            return user;

        } catch (jsonError) {
            console.error("❌ Échec du chargement des données locales :", jsonError.message);
            throw new Error("Impossible de récupérer les données.");
        }
    }
}