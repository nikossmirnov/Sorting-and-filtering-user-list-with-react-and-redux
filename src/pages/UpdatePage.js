import {
    Button,
    FormControl,
    FormControlLabel,
    makeStyles,
    Select,
    TextField,
} from "@material-ui/core";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import moment from "moment";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import MuiPhoneNumber from "material-ui-phone-number";

import React, { useState } from "react";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getUserData, updateUserData } from "../redux/UserReducer";

const useStyles = makeStyles({
    root: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    form: {
        border: "1px solid black",
        margin: "5%",
        borderRadius: "5px",
        padding: "3%",
        marginBottom: "16px",
    },
    button: {
        border: "1px solid black",
        margin: "10% 1% 1% 0%",
    },
    input: {
        margin: "1% 0%",
    },
});

const UpdatePage = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const history = useHistory();
    const params = useParams();
    const data = useSelector(getUserData);

    const i = params.id;
    const user = data.find((x) => x.id == i);
    console.log("userId", user);
    const userBd = moment(user.birthday, "DD.MM.YYYY");
    console.log(userBd);

    const [name, setName] = useState(user.name);
    const [date, setDate] = useState(userBd);
    const [phone, setPhone] = useState(user.phone);
    const [role, setRole] = useState(user.role);
    const [isArchive, setIsArchive] = useState(user.isArchive);

    const handleRedirect = () => {
        dispatch(
            updateUserData({
                ...user,
                name,
                role,
                phone,
                birthday: moment(date).format("DD.MM.YYYY"),
                isArchive,
            })
        );
        history.push("/");
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <div className={classes.root}>
            <FormControl className={classes.form}>
                <TextField
                    id='standard-basic'
                    label={"Имя"}
                    value={name}
                    type={"name"}
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        disableToolbar
                        variant='inline'
                        format='MM/dd/yyyy'
                        margin='normal'
                        label='Дата Рождения'
                        value={date}
                        KeyboardButtonProps={{
                            "aria-label": "change date",
                        }}
                        onChange={(value) => setDate(value)}
                    />
                </MuiPickersUtilsProvider>
                <MuiPhoneNumber
                    className={classes.input}
                    defaultCountry={"ru"}
                    value={phone}
                    onChange={(value) => setPhone(value)}
                />
                <FormControl className={classes.input}>
                    <InputLabel id='demo-controlled-open-select-label'>
                        Должность
                    </InputLabel>
                    <Select
                        className={classes.input}
                        labelId='demo-controlled-open-select-label'
                        id='demo-controlled-open-select'
                        open={open}
                        onClose={handleClose}
                        onOpen={handleOpen}
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <MenuItem value={"driver"}>Drivers</MenuItem>
                        <MenuItem value={"cook"}>Cooks</MenuItem>
                        <MenuItem value={"waiter"}>Waiters</MenuItem>
                    </Select>
                </FormControl>
                <div>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={isArchive}
                                onChange={(e) => setIsArchive(e.target.checked)}
                            />
                        }
                        label='Архивирован'
                    ></FormControlLabel>
                </div>
                <Button
                    className={classes.button}
                    onClick={handleRedirect}
                    type='submit'
                >
                    Подтвердить
                </Button>
            </FormControl>
        </div>
    );
};

export default UpdatePage;
