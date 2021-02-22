import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    cardHeader: {
        display: "flex",
        zIndex: "10",
        "& .paper": {
            textAlign: 'left',
            background: 'blue',
            position: "relative",
            padding: "20px 8px",
            zIndex: "15",
            width: "95%",
            margin: "auto",
        },
        "& .title": {
            color: '#fff',
        },
        subheader: {
            color: '#fff'
        },
    },
    cardHeaderIcon: {
        "& .paper": {
            width: "auto",
            padding: '16px',
            margin: "0",
            "& *": {
                color: "#fff"
            }
        }
    },
    CardHeaderVisible: {
        "& .paper": {
            display: "flex",
            flexDirection: "space-between",
            flexWrap: 'wrap',
        }
    }
}));