import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import DefaultLayout from "../containers/DefaultLayout";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import getLatestBakeOff from "../apis/getLatestBakeOff";
import { qrEnabled } from "../constants";
import CenterBox from "../components/CenterBox";
import Donate from "../components/Donate";
import ToggleSwitch from "../components/ToggleSwitch";

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
  const [title, setTitle] = useState("");
  const [showName, setShowName] = useState(false);
  const [homeData, setHomeData] = useState([]);

  useEffect(() => {
    getLatestBakeOff(
      (successData) => {
        setTitle(successData.bakeoffs[0].title);
        setHomeData(
          successData.bakeoffs[0].participants.map((participant) => ({
            bakerId: participant.entrantId,
            name: participant.name,
            appearance: participant.results
              .map((result) => result.appearance)
              .reduce((prev, next) => prev + next),
            taste: participant.results
              .map((result) => result.taste)
              .reduce((prev, next) => prev + next),
            total:
              participant.results
                .map((result) => result.appearance)
                .reduce((prev, next) => prev + next) +
              participant.results
                .map((result) => result.taste)
                .reduce((prev, next) => prev + next),
          }))
        );
      },
      (errorData) => {
        console.log(errorData); //TODO: Handle Error
      }
    );
  }, []);

  return (
    <DefaultLayout>
      <Stack direction="row" spacing={2}>
        <CenterBox>
          {qrEnabled === "true" && <Donate url="www.google.com" />}
        </CenterBox>
        <CenterBox>
          <Typography variant="h3" gutterBottom component="div">
            {title}
          </Typography>
        </CenterBox>
        <CenterBox>
          {qrEnabled === "true" && <Donate url="www.google.com" />}
        </CenterBox>
      </Stack>
      <Table
        title="Scores"
        columns={[showName ? bakerNameCol : bakerIdCol, ...scoreColumns]}
        data={homeData}
      />
      <CenterBox height={50}>
        <ToggleSwitch
          text="Show Names"
          enabled={showName}
          setEnabled={setShowName}
        />
      </CenterBox>
    </DefaultLayout>
  );
};

export default HomePage;
