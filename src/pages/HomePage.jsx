import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import DefaultLayout from "../containers/DefaultLayout";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import { qrEnabled } from "../constants";
import CenterBox from "../components/CenterBox";
import Donate from "../components/Donate";
import ToggleSwitch from "../components/ToggleSwitch";
import mapParticipantToTable from "../utils/mapParticipantToTable";
import get, { TYPE } from "../apis/get";
import SimpleTable from "../components/SimpleTable";

const bakerIdCol = { title: "Baker Id", field: "bakerId" };
const bakerNameCol = { title: "Baker Name", field: "name" };

const scoreColumns = [
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

const HomePage = () => {
  const [showName, setShowName] = useState(false);
  const [latestBakeData, setLatestBakeData] = useState();

  useEffect(() => {
    get(
      TYPE.LATEST_BAKE_OFF,
      (successData) => {
        console.log();
        setLatestBakeData(successData.bakeoffs[0]);
      },
      (errorData) => {
        console.log(errorData); //TODO: Handle Error
      }
    );
  }, []);

  return (
    <DefaultLayout>
      {latestBakeData && (
        <>
          <Stack direction="row" spacing={2}>
            <CenterBox>
              {qrEnabled === "true" && <Donate url="www.google.com" />}
            </CenterBox>
            <CenterBox>
              <Typography variant="h3" gutterBottom component="div">
                {latestBakeData.title}
              </Typography>
            </CenterBox>
            <CenterBox>
              {qrEnabled === "true" && <Donate url="www.google.com" />}
            </CenterBox>
          </Stack>
          <Table
            title="Scores"
            columns={[showName ? bakerNameCol : bakerIdCol, ...scoreColumns]}
            data={latestBakeData.participants.map(mapParticipantToTable)}
            detailPanel={({ rowData }) => {
              return (
                <SimpleTable
                  rows={
                    latestBakeData.participants.filter(
                      (item) => rowData.bakerId === item.entrantId
                    )[0]
                  }
                />
              );
            }}
          />
          <CenterBox height={50}>
            <ToggleSwitch
              text="Show Names"
              enabled={showName}
              setEnabled={setShowName}
            />
          </CenterBox>
        </>
      )}
    </DefaultLayout>
  );
};

export default HomePage;
