Dashboard Sportif - Front-End
+++++++++++++++++++++++++++++
Bienvenue dans le projet Dashboard analytique de coaching sportif ! Ce projet est une application React permettant de visualiser les performances et activités des utilisateurs à travers des graphiques interactifs.

Technologies utilisées :
**********************
React.js
Recharts (Visualisation des données)
SCSS (Gestion du style)
React Router (Gestion de la navigation)
Fetch API (Récupération des données)
PropTypes (Validation des props)

Structure du projet :
*******************
/mockedData
│── /data.json                  # Données mockées
/src
│── /assets                     # Images et icônes
│── /components                 # Composants UI
│   ├── ActivityChart.jsx       # Graphique : activités quotidiennes sous forme de BarChart
│   ├── AvgSessionsChart.jsx    # Graphique : durée moyenne des sessions sous forme de LineChart
│   ├── PerformanceChart.jsx    # Graphique : analyse des performances sous forme de RadarChart
│   ├── ScoreChart.jsx          # Graphique : score global de l'utilisateur sous forme de RadialBarChart
│   ├── Header.jsx              # Header : logo SportSee et barre de navigation 
│   ├── SideBar.jsx             # SideBar : copyright et accès à des pages spécifiques
│── /models
│   ├── ModelUser.js            # Classe de modélisation des données
│── /services
│   ├── UserService.js          # Service pour récupérer et formater les données
│── /styles                     # Styles SCSS
│── /pages
│   ├── Dashboard.jsx           # Page Dashboard présentant les résultat sportifs de l'utilisateur
│   ├── Home.jsx                # Page d'accueil permettant de choisir l'utilisateur
│── main.jsx                    # Entrée principale de l’application
│── App.jsx                     # Composant principal contenant le routage
│── README.md                   # Documentation du projet

Installation et exécution :
*************************
Prérequis
---------
Node.js
npm ou yarn

Installation
------------
Backend : voir le README du backend
Frontend :
- npm create vite@latest (React + JS)
- npm install
- npm install react-router-dom
- npm install -D sass
- npm install recharts

Lancement du projet
-------------------
npm run dev

Fonctionnalités :
***************
- Affichage des performances utilisateur sous forme de graphiques en utilisant React.
- Récupération des données via une API externe ou des données mockées avec fetch.

Gestion des données :
*******************
Les données utilisateur sont chargées via un service centralisé :
- UserService.js : gère l’accès aux données (API ou mock).
- ModelUser.js : standardise les données avant de les transmettre aux composants.
Avantage : La source des données peut être modifiée sans impacter les composants.



