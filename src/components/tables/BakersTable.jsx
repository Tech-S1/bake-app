import React from "react";
import Table from "./Table";
import add, { TYPE as ADD_TYPE } from "../../apis/add";
import update, { TYPE as UPDATE_TYPE } from "../../apis/update";
import deleteBaker from "../../apis/deleteBaker";
import { singleRowOptions } from "./options";

const bakerNameValidator = (rowData) =>
  !rowData.bakerName ||
  rowData.bakerName.length > 28 ||
  rowData.bakerName.length < 3
    ? "Must be between 3 and 28"
    : true;

const columns = [
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
    validate: bakerNameValidator,
  },
];

const dataMapper = (baker) => ({
  bakerId: baker.id,
  bakerName: baker.name,
});

const BakersTable = ({ bakersData, setBakersData }) => {
  const editable = {
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
          columns={columns}
          data={bakersData.map(dataMapper)}
          editable={editable}
          options={singleRowOptions}
          padding="0px"
        />
      )}
    </>
  );
};

export default BakersTable;
