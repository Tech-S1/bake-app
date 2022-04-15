import React from "react";
import create, { TYPE } from "../apis/create";
import Table from "./Table";

const participantColumns = [
  {
    title: "Entrant Id",
    field: "entrantId",
    type: "numeric",
    editable: "never",
  },
  {
    title: "Name",
    field: "name",
  },
  {
    title: "Description",
    field: "description",
    validate: (rowData) =>
      !rowData.name || rowData.name.length > 28 || rowData.name.length < 3
        ? "Must be between 3 and 28"
        : true,
  },
];

const ParticipantTable = ({
  participantData,
  setParticipantData,
  bakersData,
}) => {
  const tableEditParticipantData = {
    onRowAdd: (newData) =>
      new Promise((resolve, reject) =>
        setTimeout(() => {
          const entrantId =
            participantData.length === 0
              ? 1
              : Math.max(...participantData.map(({ entrantId }) => entrantId)) +
                1;
          return create(
            TYPE.PARTICIPANT,
            {
              entrantId: entrantId,
              bakerId: bakersData.filter(
                (baker) => baker.name === newData.name
              )[0].id,
              description: newData.description,
            },
            () => {
              setParticipantData([
                ...participantData,
                {
                  entrantId: entrantId, //TODO: Read id from response
                  name: newData.name,
                  description: newData.description,
                },
              ]);
              resolve();
            },
            () => {
              reject();
            }
          );
        }, 1000)
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
      {bakersData && participantData && (
        <Table
          title="Participants"
          columns={participantColumns.map((column) => {
            if (column.field === "name") {
              const obj = {};
              bakersData
                .map((data) => data.name)
                .forEach((element) => {
                  obj[element] = element;
                });
              return { ...column, lookup: obj };
            }
            return column;
          })}
          data={participantData}
          editable={tableEditParticipantData}
          options={{
            actionsColumnIndex: -1,
            detailPanelType: "single",
          }}
        />
      )}
    </>
  );
};

export default ParticipantTable;
