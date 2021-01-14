import SimpleCard from "../components/dataCell";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FilterBtn from "../components/FilterBtn";
import SortBtn from "../components/SortBtn";
import { getUserData } from "../redux/UserReducer";
import { getFilters } from "../redux/AppReducer";
import { FormControlLabel, makeStyles } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import { Button } from "@material-ui/core";
import moment from "moment";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
    button: {
        border: "1px solid black",
        margin: "1% 1%",
    },
    root: {
        display: "flex",
        flexWrap: "wrap",
    },
}));

function App() {
    const classes = useStyles();
    const history = useHistory();

    const [dataToDisplay, setDataToDisplay] = useState();
    const [isArchive, setIsArchive] = useState(false);
    const data = useSelector(getUserData);
    const filter = useSelector(getFilters);
    const [sortBy, setSortBy] = useState(null);

    useEffect(() => {
        const filteredDataRole =
            filter.app !== "all"
                ? data.filter((user) => {
                      return user.role === filter.app;
                  })
                : data;

        let filteredData = filteredDataRole.filter((user) => {
            return user.isArchive === isArchive;
        });
        if (sortBy) {
            filteredData = filteredData.sort(
                sortBy == "NAME" ? sortByName : sortByAge
            );
        }
        setDataToDisplay(filteredData);
    }, [data, filter, isArchive, sortBy]);

    const sortByName = (a, b) => {
        if (a.name < b.name) {
            console.log("-1");
            return -1;
        }
        if (a.name > b.name) {
            console.log("1");
            return 1;
        }
        return 0;
    };

    const sortByAge = (a, b) => {
        const aMoment = moment(a.birthday, "DD.MM.YYYY");
        const bMoment = moment(b.birthday, "DD.MM.YYYY");
        return bMoment.diff(aMoment);
    };
    const lastUser = data.reduce((prev, current) => {
        return prev.id > current.id ? prev : current;
    });
    const newUserId = Number(lastUser.id) + 1;
    const redirectToAddUserPage = () => {
        history.push(`/add_user/${newUserId}`);
    };

    return (
        <div>
            <div className={classes.root}>
                <SortBtn
                    onClickSortName={() => {
                        if (sortBy == "NAME") {
                            setDataToDisplay((oldDataToDisplay) => [
                                ...oldDataToDisplay.reverse(),
                            ]);
                        } else {
                            setSortBy("NAME");
                        }
                    }}
                    onClickSortAge={() => {
                        if (sortBy == "AGE") {
                            setDataToDisplay((oldDataToDisplay) => [
                                ...oldDataToDisplay.reverse(),
                            ]);
                        } else {
                            setSortBy("AGE");
                        }
                    }}
                />
                <FilterBtn />
                <FormControlLabel
                    style={{ margin: "1%" }}
                    value='name'
                    control={
                        <Checkbox
                            checked={isArchive}
                            value=''
                            onClick={() => setIsArchive(!isArchive)}
                        />
                    }
                    label='Архивированные'
                ></FormControlLabel>
                <Button
                    className={classes.button}
                    onClick={redirectToAddUserPage}
                >
                    Добавить юзера
                </Button>
            </div>
            <div className='App' style={{ display: "flex", flexWrap: "wrap" }}>
                {dataToDisplay &&
                    dataToDisplay.map((user) => {
                        return (
                            <div key={user.id}>
                                <SimpleCard id={user.id} user={user} />
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}

export default App;
