import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

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
