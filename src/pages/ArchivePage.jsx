import React, { useEffect, useState } from "react";
import DefaultLayout from "../containers/DefaultLayout";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Table from "../components/tables/Table";
import CenterBox from "../components/CenterBox";
import mapParticipantToTable from "../utils/mapParticipantToTable";
import get, { TYPE } from "../apis/get";
import SimpleTable from "../components/tables/SimpleTable";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import ImageModal from "../components/ImageModal";

const archiveColumns = [
  { title: "Entrant Id", field: "bakerId", type: "numeric" },
  { title: "Baker Name", field: "name" },
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

const headers = [
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

const ArchivePage = () => {
  const [selectedDate, setSelectedDate] = useState();
  const [allBakeOffs, setAllBakeOffs] = useState([]);

  useEffect(
    () =>
      get(
        TYPE.ALL_BAKE_OFFS,
        ({ bakeoffs }) => {
          setAllBakeOffs(bakeoffs);
        },
        (errorData) => {
          console.log(errorData); //TODO: Handle Error
        }
      ),
    []
  );

  const detailsRow = ({ rowData }) => {
    const rows = allBakeOffs
      .filter(({ date }) => date === selectedDate)[0]
      .participants.filter((item) => rowData.bakerId === item.entrantId)[0];
    return rows.results.length === 0 ? (
      <CenterBox height={50}>No Scores</CenterBox>
    ) : (
      <SimpleTable
        columns={headers}
        data={rows.results.map((row) => ({
          ...row,
          total: row.appearance + row.taste,
        }))}
      />
    );
  };

  const [entrantId, setEntrantId] = useState();

  return (
    <DefaultLayout>
      <ImageModal
        entrantId={entrantId}
        clearEntrantId={() => setEntrantId()}
        selectedDate={selectedDate}
      />
      <CenterBox height={100}>
        <CenterBox width="50%" height={100}>
          <FormControl fullWidth>
            <InputLabel>Competition</InputLabel>
            <Select
              value={selectedDate}
              label="Competition"
              onChange={({ target }) => setSelectedDate(target.value)}
            >
              {allBakeOffs.map(({ date, title }) => (
                <MenuItem value={date}>{`${date} - ${title}`}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </CenterBox>
      </CenterBox>
      {selectedDate && (
        <Table
          title="Scores"
          columns={archiveColumns}
          data={allBakeOffs
            .filter(({ date }) => date === selectedDate)[0]
            .participants.map(mapParticipantToTable)}
          detailPanel={detailsRow}
          options={{
            actionsColumnIndex: -1,
            detailPanelType: "single",
            paging: false,
          }}
          actions={[
            {
              icon: () => <PhotoCameraIcon />,
              onClick: (event, rowData) => setEntrantId(rowData.bakerId),
            },
          ]}
        />
      )}
      <CenterBox height={100} />
    </DefaultLayout>
  );
};

export default ArchivePage;
