import React, { useEffect, useState } from "react";
import DefaultLayout from "../containers/DefaultLayout";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import archive from "../data/archive";
import Table from "../components/Table";

const columns = [
  { title: "Baker Id", field: "bakerId", type: "numeric" },
  { title: "Baker Name", field: "name" },
  {
    title: "Appearance Score ",
    field: "appearance",
    type: "numeric",
  },
  {
    title: "Taste Score ",
    field: "taste",
    type: "numeric",
  },
  {
    field: "total",
    title: "Total Score",
    type: "numeric",
  },
];

const ArchivePage = () => {
  const [date, setDate] = useState();
  const [data, setData] = useState([]);

  useEffect(() => {
    //TODO: Get archive data (API Call)
    setData(archive);
  }, []);

  return (
    <DefaultLayout>
      <Box
        display="flex"
        width="100%"
        height={100}
        alignItems="center"
        justifyContent="center"
      >
        <Box
          display="flex"
          width="50%"
          height={100}
          alignItems="center"
          justifyContent="center"
        >
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Competition</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={date}
              label="Competition"
              onChange={({ target }) => setDate(target.value)}
            >
              {data.map((e) => (
                <MenuItem value={e.date}>{`${e.date} - ${e.title}`}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
      {date && (
        <Table
          title="Scores"
          columns={columns}
          data={data
            .filter((e) => e.date === date)[0]
            .scores.map((item) => ({
              ...item,
              total: item.appearance + item.taste,
            }))}
        />
      )}
    </DefaultLayout>
  );
};

export default ArchivePage;
