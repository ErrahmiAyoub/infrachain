import Dashboard from "@material-ui/icons/Dashboard";
import CreateIcon from '@material-ui/icons/Create';
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import PlaylistAddcheckIcon from '@material-ui/icons/PlaylistAddCheck'
// core components/views for Admin layout
import HomePage from "../views/CI/Accueil.js";
import SaisirDemande from "../views/CI/SaisirDemande";
import ListeDemandes from "../views/CI/ListeDemandes/ListeDemandes";
import ListeDemandesRM from "../views/REM/ListeDI/ListeDemandeRM";
import ListeOT from "../views/REM/ListeOT/ListeOT";
import ListeOTTech from "../views/Tech/ListeOT/ListeOT";
import HomePageRM from "../views/REM/Accueil/Accueil";

const dashboardRoutes = [
    {
        path: "/",
        name: "Tableau de bord",
        icon: Dashboard,
        component: HomePage,
        owner: "ci"
    },
    {
        path: "/demande",
        name: "Saisir demande ",
        icon: CreateIcon,
        component: SaisirDemande,
        owner: "ci"
    },
    {
        path: "/listeDemandes",
        name: "Demandes d'intervention",
        icon: LibraryBooks,
        component: ListeDemandes,
        owner: "ci"
    },
    {
        path: "/",
        name: "Tableau de bord",
        icon: Dashboard,
        component: HomePageRM,
        owner: "rem"
    },
    {
        path: "/listeDemandesRM",
        name: "Demandes d'intervention",
        icon: LibraryBooks,
        component: ListeDemandesRM,
        owner: "rem"
    },
    {
        path: "/ListeOT",
        name: "Ordres de travail",
        icon: PlaylistAddcheckIcon,
        component: ListeOT,
        owner: "rem"
    },
    {
        path: "/",
        name: "Ordres de travails",
        icon: PlaylistAddcheckIcon,
        component: ListeOTTech,
        owner: "tec"
    },

];

export default dashboardRoutes;
