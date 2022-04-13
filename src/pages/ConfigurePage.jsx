import React, { useState, useEffect } from "react";
import get, { TYPE } from "../apis/get";
import updateBakeOff, { ACTION } from "../apis/updateBakeOff";
import BakersTable from "../components/BakersTable";
import CenterBox from "../components/CenterBox";
import JudgesTable from "../components/JudgesTable";
import ParticipantTable from "../components/ParticipantTable";
import TitleInputBox from "../components/TitleInputBox";
import DefaultLayout from "../containers/DefaultLayout";
import currentDate from "../utils/currentDate";

const ConfigurePage = () => {
  const [bakeOffTitle, setBakeOffTitle] = useState();
  const [bakeOffTitleSaved, setBakeOffTitleSaved] = useState();
  const [participantData, setParticipantData] = useState();
  const [bakersData, setBakersData] = useState();
  const [judgesData, setJudgesData] = useState();

  useEffect(() => {
    get(
      TYPE.LATEST_BAKE_OFF,
      ({ bakeoffs }) => {
        if (bakeoffs[0].date !== currentDate()) {
          return; // No Bake Offs - Dont Set Title
        }
        const title = bakeoffs[0].title;
        setBakeOffTitle(title);
        setBakeOffTitleSaved(title);
        setParticipantData(bakeoffs[0].participants);
      },
      (errorData) => {
        console.log(errorData); //TODO: Handle Error
      }
    );
  }, [bakeOffTitleSaved]);

  const saveTitle = () => {
    if (!bakeOffTitle || bakeOffTitle.trim().length === 0) {
      //TODO: Error no title
      return;
    }
    if (!bakeOffTitleSaved) {
      updateBakeOff(
        ACTION.CREATE,
        bakeOffTitle,
        bakeOffTitle,
        () => setBakeOffTitleSaved(bakeOffTitle),
        (errorData) => {
          console.log(errorData); //TODO: Handle Error
        }
      );
    } else {
      updateBakeOff(
        ACTION.UPDATE,
        bakeOffTitle,
        () => setBakeOffTitleSaved(bakeOffTitle),
        (errorData) => {
          console.log(errorData); //TODO: Handle Error
        }
      );
    }
  };

  const handleSetNewTitle = ({ target }) => setBakeOffTitle(target.value);

  return (
    <DefaultLayout>
      <CenterBox height={100}>
        <TitleInputBox
          value={bakeOffTitle}
          handleChange={handleSetNewTitle}
          handleSave={saveTitle}
        />
      </CenterBox>
      {!!bakeOffTitleSaved && (
        <>
          <ParticipantTable
            participantData={participantData}
            setParticipantData={setParticipantData}
            judgesData={judgesData}
            bakersData={bakersData}
          />
          <CenterBox />
          <BakersTable bakersData={bakersData} setBakersData={setBakersData} />
          <CenterBox />
          <JudgesTable judgesData={judgesData} setJudgesData={setJudgesData} />
        </>
      )}
    </DefaultLayout>
  );
};

export default ConfigurePage;
