import React from "react";
import Table from "./Table";
import add, { TYPE } from "../../apis/add";
import update, { TYPE as UPDATE_TYPE } from "../../apis/update";
import { singleRowOptions } from "./options";

const judgeNameValidator = (rowData) =>
  !rowData.judgeName ||
  rowData.judgeName.length > 28 ||
  rowData.judgeName.length < 3
    ? "Must be between 3 and 28"
    : true;

const columns = [
  {
    title: "Judge Id",
    field: "judgeId",
    type: "numeric",
    editable: "never",
    hidden: "true",
  },
  {
    title: "Name",
    field: "judgeName",
    validate: judgeNameValidator,
  },
];

const dataMapper = (judge) => ({
  judgeId: judge.id,
  judgeName: judge.name,
});

const JudgesTable = ({ judgesData, setJudgesData }) => {
  const editable = {
    onRowAdd: (newData) =>
      new Promise((resolve, reject) =>
        setTimeout(
          () =>
            add(
              TYPE.JUDGES,
              newData.judgeName,
              () => {
                setJudgesData([
                  ...judgesData,
                  {
                    id:
                      judgesData.length === 0
                        ? 1
                        : Math.max(...judgesData.map(({ id }) => id)) + 1, //TODO: Read id from response
                    name: newData.judgeName,
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
            UPDATE_TYPE.JUDGES,
            {
              oldName: oldData.judgeName,
              newName: newData.judgeName,
            },
            () => {
              const dataUpdate = [...judgesData];
              const index = oldData.tableData.id;
              dataUpdate[index] = {
                id: newData.judgeId,
                name: newData.judgeName,
              };
              setJudgesData([...dataUpdate]);
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
      {judgesData && (
        <Table
          title="Judges"
          columns={columns}
          data={judgesData.map(dataMapper)}
          editable={editable}
          options={singleRowOptions}
          padding="0px"
        />
      )}
    </>
  );
};

export default JudgesTable;
