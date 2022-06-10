import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import background from "../background.png";
import axios from "axios";
import { Avatar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const columns = [
  { id: "name", label: "Name" },
  { id: "gender", label: "Gender" },
  {
    id: "city",
    label: "City",
  },
  {
    id: "state",
    label: "State",
  },
  {
    id: "country",
    label: "Country",
  },
];

export default function Homepage() {
  const [rows, setRows] = React.useState([]);

  const fetchdata = async () => {
    const data = await axios.get("https://randomuser.me/api/?results=10");
    // console.log(data?.data?.results);
    const temp = (data?.data?.results).map((obj, idx) => {
      let name = obj?.name?.first + " " + obj?.name?.last;
      let gender = obj?.gender;
      let city = obj?.location?.city;
      let state = obj?.location?.state;
      let country = obj?.location?.country;
      let picture = obj?.picture?.thumbnail;
      let data = obj;
      return { name, gender, city, state, country, idx, picture, data };
    });
    setRows([...temp]);
  };
  const navigate = useNavigate();
  const handleClick = (row) => {
    navigate("/user", { state: { data: row.data } });
  };
  React.useEffect(() => {
    fetchdata();
  }, []);
  //   console.log("roes = ", rows);

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
      <div style={{ height: "90vh" }}>
        <Paper
          style={{ margin: "4rem 4rem", height: "70vh", borderRadius: "11px" }}
        >
          <TableContainer
            className="container"
            style={{ height: "100%", borderRadius: "11px" }}
          >
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.idx}
                      onClick={() => handleClick(row)}
                      style={{ cursor: "pointer" }}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ textTransform: "capitalize" }}
                          >
                            {column.id == "name" ? (
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <Avatar src={row?.picture}></Avatar>
                                <Typography style={{ paddingLeft: "1rem" }}>
                                  {value}
                                </Typography>
                              </div>
                            ) : (
                              value
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    </div>
  );
}
