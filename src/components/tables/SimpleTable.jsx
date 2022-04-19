import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const SimpleTable = ({ columns, data }) => (
  <TableContainer style={{ padding: "20px" }} component={Paper}>
    <Table size="small">
      <TableHead>
        <TableRow>
          {columns.map(({ title, align }) => (
            <TableCell align={align || "left"}>{title}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row) => (
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            {columns.map(({ name, align }) => (
              <TableCell align={align || "left"}>{row[name]}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default SimpleTable;
