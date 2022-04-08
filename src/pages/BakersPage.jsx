import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";
import Table from "../components/Table";
import TitleInputBox from "../components/TitleInputBox";
import DefaultLayout from "../containers/DefaultLayout";
import bakers from "../data/bakers";

const columns = [
  { title: "Baker Id", field: "bakerId", type: "numeric" },
  {
    title: "Name",
    field: "name",
    validate: (rowData) =>
      rowData.name.length > 28 || rowData.name.length < 3
        ? "Must be between 3 and 28"
        : true,
  },
  {
    title: "Description",
    field: "description",
    validate: (rowData) =>
      rowData.description.length > 30 || rowData.description.length < 1
        ? "Must be between 1 and 30"
        : true,
  },
];

const BakersPage = () => {
  const [title, setTitle] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    //TODO: Get latest title (API Call)
    // setTitle("test");
    //TODO: Get latest users (API Call)
    setData(bakers);
  }, []);

  const saveTitle = () => {
    //TODO: Set latest title (API Call)
    console.log(`Save Title: ${title}`);
  };

  const setNewTitle = ({ target }) => setTitle(target.value);

  const edit = {
    onRowAdd: (newData) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          setData([...data, newData]);
          //TODO: Add Baker (API Call)
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
          //TODO: Update Baker (API Call)
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
          //TODO: Delete Baker (API Call)
          resolve();
        }, 1000);
      }),
  };

  return (
    <DefaultLayout>
      <Box
        display="flex"
        width="100%"
        height={100}
        alignItems="center"
        justifyContent="center"
      >
        <TitleInputBox
          value={title}
          handleChange={setNewTitle}
          handleSave={saveTitle}
        />
      </Box>
      <Table title="Bakers" columns={columns} data={data} editable={edit} />
    </DefaultLayout>
  );
};

export default BakersPage;
