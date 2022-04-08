import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import DefaultLayout from "../containers/DefaultLayout";
import { Box } from "@mui/system";
import scores from "../data/scores";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";

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
  const [title, setTitle] = useState("");
  const [showName, setShowName] = useState(false);

  useEffect(() => {
    //TODO: Get latest scores (API Call)
    setData(scores);
    //TODO: Get latest title (API Call)
    setTitle("Test Bake Off");
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
        <Typography variant="h3" gutterBottom component="div">
          {title}
        </Typography>
      </Box>
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
