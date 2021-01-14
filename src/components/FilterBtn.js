import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { useDispatch } from "react-redux";
import { setFilters } from "../redux/AppReducer";

const useStyles = makeStyles((theme) => ({
    button: {
        display: "block",
        marginTop: theme.spacing(2),
    },
    formControl: {
        minWidth: 120,
        margin: "1%",
    },
}));

export default function FilterBtn() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("all");

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const dispatch = useDispatch();
    const filteredValues = (e) => {
        const value = e.target.value;
        setValue(value);
        dispatch(setFilters(value));
    };

    return (
        <FormControl className={classes.formControl}>
            <Select
                labelId='demo-controlled-open-select-label'
                id='demo-controlled-open-select'
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                onChange={filteredValues}
                value={value}
            >
                <MenuItem value={"all"}>Все професии</MenuItem>
                <MenuItem value={"driver"}>Drivers</MenuItem>
                <MenuItem value={"cook"}>Cooks</MenuItem>
                <MenuItem value={"waiter"}>Waiters</MenuItem>
            </Select>
        </FormControl>
    );
}
