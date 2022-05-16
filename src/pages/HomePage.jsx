import React, { useEffect, useState } from "react";
import DefaultLayout from "../containers/DefaultLayout";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import { qrEnabled, qrUrl } from "../constants";
import CenterBox from "../components/CenterBox";
import Donate from "../components/Donate";
import ToggleSwitch from "../components/ToggleSwitch";
import get, { TYPE } from "../apis/get";
import ScoresTable from "../components/tables/ScoresTable";

const HomePage = () => {
  const [showName, setShowName] = useState(false);
  const [latestBakeData, setLatestBakeData] = useState();

  useEffect(() => {
    get(
      TYPE.LATEST_BAKE_OFF,
      (successData) => setLatestBakeData(successData.bakeoffs[0]),
      (errorData) => console.log(errorData) //TODO: Handle Error
    );
  }, []);

  const QRCode = () => (
    <CenterBox>{qrEnabled === "true" && <Donate url={qrUrl} />}</CenterBox>
  );

  const Title = () => (
    <CenterBox>
      <Typography variant="h3" gutterBottom component="div">
        {latestBakeData && latestBakeData.title}
      </Typography>
    </CenterBox>
  );

  const Header = () => (
    <Stack direction="row" spacing={2}>
      <QRCode />
      <Title />
      <QRCode />
    </Stack>
  );

  const ShowNamesSwitch = () => (
    <CenterBox height={50}>
      <ToggleSwitch
        text="Show Names"
        enabled={showName}
        setEnabled={setShowName}
      />
    </CenterBox>
  );

  return (
    <DefaultLayout>
      <Header />
      <ScoresTable
        participants={latestBakeData && latestBakeData.participants}
        showName={showName}
      />
      <ShowNamesSwitch />
    </DefaultLayout>
  );
};

export default HomePage;
