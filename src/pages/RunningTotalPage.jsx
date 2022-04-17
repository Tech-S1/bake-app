import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import get, { TYPE } from "../apis/get";
import CenterBox from "../components/CenterBox";
import Table from "../components/Table";
import DefaultLayout from "../containers/DefaultLayout";
import Typography from "@mui/material/Typography";
import mapBakerToTable from "../utils/mapBakerToTable";
import EventsSimpleTable from "../components/EventsSimpleTable";

const totalColumns = [
  { title: "Baker Id", field: "id", type: "numeric" },
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

const RunningTotalPage = () => {
  const [totalsData, setTotalsData] = useState([]);

  useEffect(
    () =>
      get(
        TYPE.TOTALS,
        ({ bakers }) => {
          setTotalsData(bakers);
        },
        (errorData) => {
          console.log(errorData); //TODO: Handle Error
        }
      ),
    []
  );

  const detailsRow = ({ rowData }) => {
    const rows = totalsData.filter((item) => rowData.id === item.id)[0];
    return rows.events.length === 0 ? (
      <CenterBox height={50}>No Bakeoffs</CenterBox>
    ) : (
      <EventsSimpleTable rows={rows} />
    );
  };

  return (
    <DefaultLayout>
      {totalsData && (
        <>
          <Stack direction="row" spacing={2}>
            <CenterBox>
              <Typography variant="h3" gutterBottom component="div">
                Running Totals
              </Typography>
            </CenterBox>
          </Stack>
          <Table
            title="Totals"
            columns={totalColumns}
            data={totalsData.map(mapBakerToTable)}
            detailPanel={detailsRow}
            options={{
              detailPanelType: "single",
              paging: false,
            }}
          />
          <CenterBox height={50} />
        </>
      )}
    </DefaultLayout>
  );
};

export default RunningTotalPage;
