import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const EventsSimpleTable = ({ rows }) => {
  return (
    <>
      <TableContainer style={{ padding: "20px" }} component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Bakeoff</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="right">Total Appearance Score</TableCell>
              <TableCell align="right">Total Taste Score</TableCell>
              <TableCell align="right">Total Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.events.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{row.bakeoffDescription}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell align="right">{row.totalAppearance}</TableCell>
                <TableCell align="right">{row.totalTaste}</TableCell>
                <TableCell align="right">
                  {row.totalAppearance + row.totalTaste}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default EventsSimpleTable;
