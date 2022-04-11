import React, { useEffect, useState } from "react";
import DefaultLayout from "../containers/DefaultLayout";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import archive from "../data/archive";
import Table from "../components/Table";
import CenterBox from "../components/CenterBox";
import getAllBakeOffs from "../apis/getAllBakeOffs";
import mapParticipantToTable from "../utils/mapParticipantToTable";

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
  const [date, setDate] = useState();
  const [archiveData, setArchiveData] = useState([]);

  useEffect(() => {
    getAllBakeOffs(
      (successData) => {
        setArchiveData(successData.bakeoffs);
      },
      (errorData) => {
        console.log(errorData); //TODO: Handle Error
      }
    );
  }, []);

  return (
    <DefaultLayout>
      <CenterBox height={100}>
        <CenterBox width="50%" height={100}>
          <FormControl fullWidth>
            <InputLabel>Competition</InputLabel>
            <Select
              value={date}
              label="Competition"
              onChange={({ target }) => setDate(target.value)}
            >
              {archiveData.map((archiveDataItem) => (
                <MenuItem
                  value={archiveDataItem.date}
                >{`${archiveDataItem.date} - ${archiveDataItem.title}`}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </CenterBox>
      </CenterBox>
      {date && (
        <Table
          title="Scores"
          columns={archiveColumns}
          data={archiveData
            .filter((archiveDataItem) => archiveDataItem.date === date)[0]
            .participants.map(mapParticipantToTable)}
        />
      )}
    </DefaultLayout>
  );
};

export default ArchivePage;
