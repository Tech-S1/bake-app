import React, { useEffect } from "react";
import Table from "./Table";
import add, { TYPE } from "../apis/add";
import get from "../apis/get";

const judgesColumns = [
  {
    title: "Judge Id",
    field: "judgeId",
    type: "numeric",
    editable: "never",
  },
  {
    title: "Name",
    field: "judgeName",
    validate: (rowData) =>
      !rowData.judgeName ||
      rowData.judgeName.length > 28 ||
      rowData.judgeName.length < 3
        ? "Must be between 3 and 28"
        : true,
  },
];

const JudgesTable = ({ judgesData, setJudgesData }) => {
  useEffect(
    () =>
      get(
        TYPE.JUDGES,
        ({ judges }) => {
          setJudgesData(judges);
        },
        (errorData) => {
          console.log(errorData); //TODO: Handle Error
        }
      ),
    [setJudgesData]
  );

  const tableEditJudgesData = {
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
      new Promise((resolve, reject) => reject()), //TODO: Implement
    //   new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //       const dataUpdate = [...judgesData];
    //       const index = oldData.tableData.id;
    //       dataUpdate[index] = newData;
    //       setJudgesData([...dataUpdate]);
    //       //TODO: Update Judges (API Call)
    //       resolve();
    //     }, 1000);
    //   }),

    onRowDelete: (oldData) => new Promise((resolve, reject) => reject()), //TODO: Implement
    //   new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //       const dataDelete = [...judgesData];
    //       const index = oldData.tableData.id;
    //       dataDelete.splice(index, 1);
    //       setJudgesData([...dataDelete]);
    //       //TODO: Delete Judge (API Call)
    //       resolve();
    //     }, 1000);
    //   }),
  };

  return (
    <>
      {judgesData && (
        <Table
          title="Judges"
          columns={judgesColumns}
          data={judgesData.map((judge) => ({
            judgeId: judge.id,
            judgeName: judge.name,
          }))}
          editable={tableEditJudgesData}
          options={{ actionsColumnIndex: -1 }}
        />
      )}
    </>
  );
};

export default JudgesTable;
