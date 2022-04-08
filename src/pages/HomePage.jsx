import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import DefaultLayout from "../containers/DefaultLayout";
import { Box } from "@mui/system";
import scores from "../data/scores";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

const bakerIdCol = { title: "Baker Id", field: "bakerId", type: "numeric" };
const bakerNameCol = { title: "Baker Name", field: "name" };

const columns = [
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

const HomePage = () => {
  const [data, setData] = useState([]);
  const [showName, setShowName] = useState(false);

  useEffect(() => {
    //TODO: Get latest scores (API Call)
    setData(scores);
  }, []);

  return (
    <DefaultLayout>
      <Box
        display="flex"
        width="100%"
        height={50}
        alignItems="center"
        justifyContent="center"
      >
        <FormControlLabel
          control={
            <Switch
              checked={showName}
              onChange={({ target }) => setShowName(target.checked)}
            />
          }
          label="Show Names"
        />
      </Box>
      <Table
        title="Scores"
        columns={[showName ? bakerNameCol : bakerIdCol, ...columns]}
        data={data.map((item) => ({
          ...item,
          total: item.appearance + item.taste,
        }))}
      />
    </DefaultLayout>
  );
};

export default HomePage;
