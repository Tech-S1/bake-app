import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import DefaultLayout from "../containers/DefaultLayout";
import { Box } from "@mui/system";
import scores from "../data/scores";

const columns = [
  { title: "Baker Id", field: "bakerId", type: "numeric" },
  {
    title: "Appearance Score ",
    field: "appearance",
    type: "numeric",
    validate: (rowData) =>
      rowData.appearance > 5 || rowData.appearance < 0
        ? "Must be between 0 and 5"
        : true,
  },
  {
    title: "Taste Score ",
    field: "taste",
    type: "numeric",
    validate: (rowData) =>
      rowData.taste > 10 || rowData.taste < 0
        ? "Must be between 0 and 10"
        : true,
  },
  {
    field: "total",
    title: "Total Score",
    editable: "never",
    type: "numeric",
  },
];

const ScoresPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    //TODO: Get latest scores (API Call)
    setData(scores);
  }, []);

  const edit = {
    onRowAdd: (newData) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          setData([...data, newData]);
          //TODO: Add Score (API Call)
          resolve();
        }, 1000);
      }),
    onRowUpdate: (newData, oldData) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          const dataUpdate = [...data];
          const index = oldData.tableData.id;
          dataUpdate[index] = newData;
          setData([...dataUpdate]);
          //TODO: Update Score (API Call)
          resolve();
        }, 1000);
      }),
    onRowDelete: (oldData) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          const dataDelete = [...data];
          const index = oldData.tableData.id;
          dataDelete.splice(index, 1);
          setData([...dataDelete]);
          //TODO: Delete Score (API Call)
          resolve();
        }, 1000);
      }),
  };

  return (
    <DefaultLayout>
      <Box
        display="flex"
        width="100%"
        height={50}
        alignItems="center"
        justifyContent="center"
      ></Box>
      <Table
        title="Scores"
        columns={columns}
        data={data.map((item) => ({
          ...item,
          total: item.appearance + item.taste,
        }))}
        editable={edit}
      />
    </DefaultLayout>
  );
};

export default ScoresPage;
