import React, { useEffect } from "react";
import Table from "./Table";
import add, { TYPE } from "../apis/add";
import get from "../apis/get";

const bakersColumns = [
  { title: "Baker Id", field: "bakerId", type: "numeric", editable: "never" },
  {
    title: "Name",
    field: "bakerName",
    validate: (rowData) =>
      !rowData.bakerName ||
      rowData.bakerName.length > 28 ||
      rowData.bakerName.length < 3
        ? "Must be between 3 and 28"
        : true,
  },
];

const BakersTable = ({ bakersData, setBakersData }) => {
  useEffect(
    () =>
      get(
        TYPE.BAKERS,
        ({ bakers }) => {
          setBakersData(bakers);
        },
        (errorData) => {
          console.log(errorData); //TODO: Handle Error
        }
      ),
    [setBakersData]
  );

  const tableEditBakersData = {
    onRowAdd: (newData) =>
      new Promise((resolve, reject) =>
        setTimeout(
          () =>
            add(
              TYPE.BAKERS,
              newData.bakerName,
              () => {
                setBakersData([
                  ...bakersData,
                  {
                    id:
                      bakersData.length === 0
                        ? 1
                        : Math.max(...bakersData.map(({ id }) => id)) + 1, //TODO: Read id from response
                    name: newData.bakerName,
                  },
                ]);
                resolve();
              },
              () => {
                reject();
              }
            ),
          1000
        )
      ),
    onRowUpdate: (newData, oldData) =>
      new Promise((resolve, reject) => reject()), //TODO: Implement
    // new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     const dataUpdate = [...bakersData];
    //     const index = oldData.tableData.id;
    //     dataUpdate[index] = newData;
    //     setBakersData([...dataUpdate]);
    //     //TODO: Update Baker (API Call)
    //     resolve();
    //   }, 1000);
    // }),
    onRowDelete: (oldData) => new Promise((resolve, reject) => reject()), //TODO: Implement
    // new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     const dataDelete = [...bakersData];
    //     const index = oldData.tableData.id;
    //     dataDelete.splice(index, 1);
    //     setBakersData([...dataDelete]);
    //     //TODO: Delete Baker (API Call)
    //     resolve();
    //   }, 1000);
    // }),
  };

  return (
    <>
      {bakersData && (
        <Table
          title="Bakers"
          columns={bakersColumns}
          data={bakersData.map((baker) => ({
            bakerId: baker.id,
            bakerName: baker.name,
          }))}
          editable={tableEditBakersData}
          options={{ actionsColumnIndex: -1 }}
        />
      )}
    </>
  );
};

export default BakersTable;
