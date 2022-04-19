import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import get, { TYPE } from "../apis/get";
import CenterBox from "../components/CenterBox";
import Table from "../components/tables/Table";
import DefaultLayout from "../containers/DefaultLayout";
import Typography from "@mui/material/Typography";
import mapBakerToTable from "../utils/mapBakerToTable";
import SimpleTable from "../components/tables/SimpleTable";

const totalColumns = [
  { title: "Baker Id", field: "id", type: "numeric", hidden: "true" },
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

const headers = [
  {
    title: "Bakeoff",
    name: "bakeoffDescription",
  },
  {
    title: "Description",
    name: "description",
  },
  {
    title: "Entrant Id",
    align: "right",
    name: "entrantId",
  },
  {
    title: "Total Appearance Score",
    align: "right",
    name: "totalAppearance",
  },
  {
    title: "Total Taste Score",
    align: "right",
    name: "totalTaste",
  },
  {
    title: "Total Score",
    align: "right",
    name: "total",
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
    console.log(rows.events);

    return rows.events.length === 0 ? (
      <CenterBox height={50}>No Bakeoffs</CenterBox>
    ) : (
      <SimpleTable
        columns={headers}
        data={rows.events.map((event) => ({
          ...event,
          total: event.totalAppearance + event.totalTaste,
        }))}
      />
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
