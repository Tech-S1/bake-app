import React, { useState, useEffect } from "react";
import createBakeOff from "../apis/createBakeOff";
import getBakers from "../apis/getBakers";
import getJudges from "../apis/getJudges";
import getLatestBakeOff from "../apis/getLatestBakeOff";
import updateBakeOff from "../apis/updateBakeOff";
import CenterBox from "../components/CenterBox";
import Table from "../components/Table";
import TitleInputBox from "../components/TitleInputBox";
import DefaultLayout from "../containers/DefaultLayout";
import bakers from "../data/bakers";
import judges from "../data/judges";
import currentDate from "../utils/currentDate";

const bakersColumns = [
  { title: "Baker Id", field: "bakerId", type: "numeric" },
  {
    title: "Name",
    field: "name",
    validate: (rowData) =>
      !rowData.name || rowData.name.length > 28 || rowData.name.length < 3
        ? "Must be between 3 and 28"
        : true,
  },
  {
    title: "Description",
    field: "description",
    validate: (rowData) =>
      !rowData.description ||
      rowData.description.length > 30 ||
      rowData.description.length < 1
        ? "Must be between 1 and 30"
        : true,
  },
];

const judgesColumns = [
  { title: "Judge Id", field: "judgeId", type: "numeric" },
  {
    title: "Name",
    field: "judgeName",
    validate: (rowData) =>
      !rowData.judgeName ||
      rowData.judgeName.length > 28 ||
      rowData.judgeName.length < 3
        ? "Must be between 3 and 28"
        : true,
  },
];

const ConfigurePage = () => {
  const [bakeOffTitle, setBakeOffTitle] = useState();
  const [bakeOffTitleSaved, setBakeOffTitleSaved] = useState();
  const [bakersData, setBakersData] = useState();
  const [judgesData, setJudgesData] = useState();

  useEffect(() => {
    getLatestBakeOff(
      (successData) => {
        console.log(currentDate());
        if (successData.bakeoffs[0].date !== currentDate()) {
          return;
        }
        setBakeOffTitle(successData.bakeoffs[0].title);
        setBakeOffTitleSaved(successData.bakeoffs[0].title);
      },
      (errorData) => {
        console.log(errorData); //TODO: Handle Error
      }
    );
    getJudges(
      (successData) => {
        setJudgesData(successData.judges);
      },
      (errorData) => {
        console.log(errorData); //TODO: Handle Error
      }
    );
    getBakers(
      (successData) => {
        setBakersData(successData.bakers);
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
      createBakeOff(
        bakeOffTitle,
        () => setBakeOffTitleSaved(bakeOffTitle),
        (errorData) => {
          console.log(errorData); //TODO: Handle Error
        }
      );
    } else {
      updateBakeOff(
        bakeOffTitle,
        () => setBakeOffTitleSaved(bakeOffTitle),
        (errorData) => {
          console.log(errorData); //TODO: Handle Error
        }
      );
    }
  };

  const handleSetNewTitle = ({ target }) => setBakeOffTitle(target.value);

  const tableEditBakersData = {
    onRowAdd: (newData) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          setBakersData([...bakersData, newData]);
          //TODO: Add Baker (API Call)
          resolve();
        }, 1000);
      }),
    onRowUpdate: (newData, oldData) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          const dataUpdate = [...bakersData];
          const index = oldData.tableData.id;
          dataUpdate[index] = newData;
          setBakersData([...dataUpdate]);
          //TODO: Update Baker (API Call)
          resolve();
        }, 1000);
      }),
    onRowDelete: (oldData) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          const dataDelete = [...bakersData];
          const index = oldData.tableData.id;
          dataDelete.splice(index, 1);
          setBakersData([...dataDelete]);
          //TODO: Delete Baker (API Call)
          resolve();
        }, 1000);
      }),
  };

  const tableEditJudgesData = {
    onRowAdd: (newData) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          setJudgesData([...judgesData, newData]);
          //TODO: Add Judge (API Call)
          resolve();
        }, 1000);
      }),
    onRowUpdate: (newData, oldData) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          const dataUpdate = [...judgesData];
          const index = oldData.tableData.id;
          dataUpdate[index] = newData;
          setJudgesData([...dataUpdate]);
          //TODO: Update Judges (API Call)
          resolve();
        }, 1000);
      }),
    onRowDelete: (oldData) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          const dataDelete = [...judgesData];
          const index = oldData.tableData.id;
          dataDelete.splice(index, 1);
          setJudgesData([...dataDelete]);
          //TODO: Delete Judge (API Call)
          resolve();
        }, 1000);
      }),
  };

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
          {bakersData && (
            <Table
              title="Bakers"
              columns={bakersColumns}
              data={bakersData.map((baker) => ({
                bakerId: baker.id,
                name: baker.name,
              }))}
              editable={tableEditBakersData}
            />
          )}
          <CenterBox />
          {judgesData && (
            <Table
              title="Judges"
              columns={judgesColumns}
              data={judgesData.map((judge) => ({
                judgeId: judge.id,
                judgeName: judge.name,
              }))}
              editable={tableEditJudgesData}
            />
          )}
        </>
      )}
    </DefaultLayout>
  );
};

export default ConfigurePage;
