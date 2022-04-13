import React, { useEffect, useState } from "react";
import DefaultLayout from "../containers/DefaultLayout";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Table from "../components/Table";
import CenterBox from "../components/CenterBox";
import mapParticipantToTable from "../utils/mapParticipantToTable";
import get, { TYPE } from "../apis/get";

const archiveColumns = [
  { title: "Baker Id", field: "bakerId", type: "numeric" },
  { title: "Baker Name", field: "name" },
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

  return (
    <DefaultLayout>
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
        />
      )}
    </DefaultLayout>
  );
};

export default ArchivePage;
