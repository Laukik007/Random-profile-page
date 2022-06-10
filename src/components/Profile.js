import React from "react";
import { useLocation } from "react-router-dom";
import Title from "./Title";
import background from "../background.png";
import {
  Avatar,
  FormControl,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

const Profile = () => {
  const { state } = useLocation();
  const { data } = state;
  console.log("profiledata", data);

  let myBirthday, today, bday, diff, days;
  let tempday = new Date(data?.dob?.date);
  myBirthday = [tempday.getDate(), tempday.getMonth()];
  today = new Date();
  bday = new Date(today.getFullYear(), myBirthday[1] - 1, myBirthday[0]);
  if (today.getTime() > bday.getTime()) {
    bday.setFullYear(bday.getFullYear() + 1);
  }
  diff = bday.getTime() - today.getTime();
  days = Math.floor(diff / (1000 * 60 * 60 * 24));

  return (
    <div
      style={{
        background: ` linear-gradient(rgba(255,255,255,.5), rgba(255,255,255,.5)),url(${background}) `,
        width: "100vw",
        minHeight: "100vh",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",

        // display: "flex",
        // flexDirection: "column",
        // alignItems: "center",
      }}
    >
      <Title />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={3}
          style={{
            width: "92vw",
          }}
        >
          <Typography sx={{ p: 1 }} variant="h4" align="center">
            Profile
          </Typography>
          <div
            style={{
              padding: "1rem",
              display: " flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <div>
              <Avatar
                alt="Profile Photo"
                src={data?.picture?.large}
                sx={{ width: 100, height: 100 }}
                style={{ height: "18rem", width: "18rem" }}
              />
            </div>
            <FormControl fullWidth variant="outlined">
              {/* <InputLabel htmlFor="my-input">Name</InputLabel> */}
              <TextField
                variant="outlined"
                id="my-input"
                label="Name"
                aria-describedby="my-helper-text"
                readOnly={true}
                type="text"
                value={data?.name?.first + " " + data?.name?.last}
                className="form-control"
                style={{ height: "3rem" }}
                sx={{ m: 1.5 }}
              />
              <TextField
                variant="outlined"
                id="my-input"
                label="Phone "
                aria-describedby="my-helper-text"
                readOnly={true}
                type="text"
                value={data?.phone}
                className="form-control"
                style={{ height: "3rem" }}
                sx={{ m: 1.5 }}
              />
              <TextField
                variant="outlined"
                id="my-input"
                label="Days left for Next Birthday"
                aria-describedby="my-helper-text"
                readOnly={true}
                type="text"
                value={days + " days"}
                className="form-control"
                style={{ height: "3rem" }}
                sx={{ m: 1.5 }}
              />
            </FormControl>
          </div>
        </Paper>
      </div>
    </div>
  );
};

export default Profile;
