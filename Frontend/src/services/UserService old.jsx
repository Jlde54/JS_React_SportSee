import { User } from '../models/ModelUser.jsx';

const apiUrl = "http://localhost:3000/user/";
const localUrl = "../../mockedData/data.json";

export class UserService {
    static async getUser(userId) {
        const rawData = await this.fetchData(`${apiUrl}/${userId}`, localUrl, userId);
        return new User(rawData);
    }

    static async fetchData(apiUrl, localUrl, userId) {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error(`Erreur API : ${response.status}`);
            return await response.json();
        } catch (error) {
            console.warn("⚠️ Impossible d’accéder à l’API => utilisation des données locales…", error.message);
            try {
                const localResponse = await fetch(localUrl);
                if (!localResponse.ok) throw new Error(`Erreur locale : ${localResponse.status}`);
                const mockedData = await localResponse.json();
                const user = mockedData.users.find(user => Number(user.id) === Number(userId));
                if (!user) throw new Error("Utilisateur non trouvé dans les données locales.");
                return user;
            } catch (jsonError) {
                console.error("❌ Échec du chargement des données locales :", jsonError.message);
                throw new Error("Impossible de récupérer les données.");
            }
        }
    }
}