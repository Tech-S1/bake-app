import React, { useState } from "react";
import create, { TYPE as CREATE_TYPE } from "../../apis/create";
import deleteParticipant from "../../apis/deleteParticipant";
import update, { TYPE as UPDATE_TYPE } from "../../apis/update";
import ImageModal from "../ImageModal";
import { singleRowOptions } from "./options";
import Table from "./Table";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

const descriptionValidator = (rowData) =>
  !rowData.description ||
  rowData.description.length > 28 ||
  rowData.description.length < 3
    ? "Must be between 3 and 28"
    : true;

const columns = [
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
    validate: descriptionValidator,
  },
];

const columnsMapper = ({ column, bakersData }) => {
  if (column.field === "name") {
    const obj = {};
    bakersData
      .map((data) => data.name)
      .forEach((name) => {
        obj[name] = name;
      });
    return { ...column, lookup: obj };
  }
  return column;
};

const ParticipantTable = ({
  participantData,
  setParticipantData,
  bakersData,
}) => {
  const editable = {
    onRowAdd: (newData) =>
      new Promise((resolve, reject) =>
        setTimeout(() => {
          const entrantId =
            participantData.length === 0
              ? 1
              : Math.max(...participantData.map(({ entrantId }) => entrantId)) +
                1;
          return create(
            CREATE_TYPE.PARTICIPANT,
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
      new Promise((resolve, reject) => {
        setTimeout(() => {
          return update(
            UPDATE_TYPE.PARTICIPANT,
            {
              entrantId: oldData.entrantId,
              bakerId: bakersData.filter(
                (baker) => baker.name === newData.name
              )[0].id,
              description: newData.description,
            },
            () => {
              const dataUpdate = [...participantData];
              const index = oldData.tableData.id;
              dataUpdate[index] = newData;
              setParticipantData([...dataUpdate]);
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
          return deleteParticipant(
            oldData.entrantId,
            () => {
              const dataDelete = [...participantData];
              const index = oldData.tableData.id;
              dataDelete.splice(index, 1);
              setParticipantData([...dataDelete]);
              resolve();
            },
            () => {
              reject();
            }
          );
        }, 1000);
      }),
  };

  const [entrantId, setEntrantId] = useState();

  return (
    <>
      <ImageModal
        entrantId={entrantId}
        clearEntrantId={() => setEntrantId()}
        upload={true}
      />

      {bakersData && participantData && (
        <Table
          title="Participants"
          columns={columns.map((column) =>
            columnsMapper({ column, bakersData })
          )}
          data={participantData}
          editable={editable}
          options={singleRowOptions}
          actions={[
            {
              icon: () => <PhotoCameraIcon />,
              onClick: (event, rowData) => setEntrantId(rowData.entrantId),
            },
          ]}
        />
      )}
    </>
  );
};

export default ParticipantTable;
