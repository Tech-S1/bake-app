import React, { useEffect } from "react";
import Table from "./Table";
import add, { TYPE as ADD_TYPE } from "../apis/add";
import get, { TYPE as GET_TYPE } from "../apis/get";
import update, { TYPE as UPDATE_TYPE } from "../apis/update";
import deleteItem, { TYPE as DELETE_TYPE } from "../apis/delete";
import deleteBaker from "../apis/deleteBaker";

const bakersColumns = [
  {
    title: "Baker Id",
    field: "bakerId",
    type: "numeric",
    editable: "never",
    hidden: "true",
  },
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
        GET_TYPE.BAKERS,
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
              ADD_TYPE.BAKERS,
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
      new Promise((resolve, reject) => {
        setTimeout(() => {
          return update(
            UPDATE_TYPE.BAKERS,
            {
              oldName: oldData.bakerName,
              newName: newData.bakerName,
            },
            () => {
              const dataUpdate = [...bakersData];
              const index = oldData.tableData.id;
              dataUpdate[index] = {
                id: parseInt(newData.bakerId),
                name: newData.bakerName,
              };
              setBakersData([...dataUpdate]);
              resolve();
            },
            () => {
              reject();
            }
          );
        }, 1000);
      }),
    onRowDelete: (oldData) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          return deleteBaker(
            oldData.bakerName,
            () => {
              const dataDelete = [...bakersData];
              const index = oldData.tableData.id;
              dataDelete.splice(index, 1);
              setBakersData([...dataDelete]);
              resolve();
            },
            () => {
              reject();
            }
          );
        }, 1000);
      }),
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
          options={{
            actionsColumnIndex: -1,
            detailPanelType: "single",
          }}
        />
      )}
    </>
  );
};

export default BakersTable;
