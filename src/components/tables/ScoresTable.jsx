import React, { useState } from "react";
import Table from "./Table";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import CenterBox from "../../components/CenterBox";
import mapParticipantToTable from "../../utils/mapParticipantToTable";
import SimpleTable from "./SimpleTable";
import { noPaging } from "./options";
import ImageModal from "../ImageModal";

const columnsBakerId = { title: "Entrant Id", field: "bakerId" };
const columnsBakerName = { title: "Baker Name", field: "name" };

const columns = [
  { title: "Description", field: "description" },
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

const simpleColumns = [
  {
    title: "Judge Name",
    name: "judgeName",
  },
  {
    title: "Appearance Score",
    align: "right",
    name: "appearance",
  },
  {
    title: "Taste Score",
    align: "right",
    name: "taste",
  },
  {
    title: "Total Score",
    align: "right",
    name: "total",
  },
];

const simpleTableDataMapper = (row) => ({
  ...row,
  total: row.appearance + row.taste,
});

const detailsRow = ({ rowData, participants }) => {
  const rowResults = participants.filter(
    (item) => rowData.bakerId === item.entrantId
  )[0].results;
  if (rowResults.length === 0) {
    return <CenterBox height={50}>No Scores</CenterBox>;
  }
  return (
    <SimpleTable
      columns={simpleColumns}
      data={rowResults.map(simpleTableDataMapper)}
    />
  );
};

const detailsPanel = ({ participants }) => [
  {
    icon: () => <PersonSearchIcon />,
    render: ({ rowData }) => detailsRow({ rowData, participants }),
  },
];

const ScoresTable = ({ participants, showName }) => {
  const [entrantId, setEntrantId] = useState();
  return (
    <>
      <ImageModal entrantId={entrantId} clearEntrantId={() => setEntrantId()} />

      {participants && (
        <Table
          title="Scores"
          columns={[showName ? columnsBakerName : columnsBakerId, ...columns]}
          data={participants.map(mapParticipantToTable)}
          detailPanel={detailsPanel({ participants })}
          options={noPaging}
          actions={[
            {
              icon: () => <PhotoCameraIcon />,
              onClick: (event, rowData) => setEntrantId(rowData.bakerId),
            },
          ]}
        />
      )}
    </>
  );
};

export default ScoresTable;
