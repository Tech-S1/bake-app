import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const SimpleTable = ({ rows }) => {
  return (
    <>
      <TableContainer style={{ padding: "20px" }} component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Judge Name</TableCell>
              <TableCell align="right">Appearance Score</TableCell>
              <TableCell align="right">Taste Score</TableCell>
              <TableCell align="right">Total Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.results.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{row.judgeName}</TableCell>
                <TableCell align="right">{row.appearance}</TableCell>
                <TableCell align="right">{row.taste}</TableCell>
                <TableCell align="right">
                  {row.appearance + row.taste}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default SimpleTable;
