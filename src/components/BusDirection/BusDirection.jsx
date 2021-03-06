import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const BusDirection = () => {
  const setBusRouteReducer = useSelector((store) => store.setBusRouteReducer);

  useEffect(() => {
    getBusDirection();
  }, [setBusRouteReducer]); //Figured out it was not calling this state on load so the URL was not passing the selected route to Directions router

  const dispatch = useDispatch();
  const [selectBusDirection, setSelectBusDirection] = useState("");
  const setBusDirection = useSelector((store) => store.getBusDirectionReducer);

  console.log("setBusRouteReducer", setBusRouteReducer); //Data is correct when selecting a bus direction

  const API_URI = "http://localhost:5000";

  const getBusDirection = () => {
    axios({
      method: "GET",
      url: `${API_URI}/api/busRoutes/directions/${setBusRouteReducer}`,
    })
      .then((response) => {
        console.log(response.data);
        dispatch({
          type: "GET_BUS_DIRECTION",
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log("This error" + error);
      });
  };

  const handleChange = (e) => {
    setSelectBusDirection(e.target.value);
    dispatch({ type: "SET_BUS_DIRECTION", payload: e.target.value });
  };

  console.log(selectBusDirection);

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select Direction</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectBusDirection}
          label="Routes"
          onChange={handleChange}
        >
          {setBusDirection.map((direction) => (
            <MenuItem value={direction.Value}>{direction.Text}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default BusDirection;
