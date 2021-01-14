import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router";

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        margin: 10,
    },
    bullet: {
        display: "inline-block",
        margin: "0 2px",
        transform: "scale(0.8)",
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});
export default function SimpleCard({ user }) {
    const classes = useStyles();
    console.log("props", user);
    const history = useHistory();
    const id = user.id;
    const handleRedirect = () => {
        history.push(`/update/${id}`);
    };

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography
                    className={classes.title}
                    color='textSecondary'
                    gutterBottom
                >
                    {user.role}
                </Typography>
                <Typography variant='h6' component='h2'>
                    {user.name}
                </Typography>
                <Typography variant='h6' component='h2'>
                    {user.birthday}
                </Typography>
                <Typography className={classes.pos} color='textSecondary'>
                    {user.phone}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size='small' onClick={handleRedirect}>
                    Редактировать
                </Button>
            </CardActions>
        </Card>
    );
}
