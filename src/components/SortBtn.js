import react from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "1%",
    },
    button: {
        border: "1px solid black",
        margin: "0% 1%",
    },
}));

export default function SortBtn({ onClickSortName, onClickSortAge }) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Button className={classes.button} onClick={onClickSortName}>
                Имя
            </Button>
            <Button className={classes.button} onClick={onClickSortAge}>
                Возраст
            </Button>
        </div>
    );
}
