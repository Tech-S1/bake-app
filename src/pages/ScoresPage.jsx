import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import DefaultLayout from "../containers/DefaultLayout";
import scores from "../data/scores";
import bakers from "../data/bakers";
import judges from "../data/judges";
import CenterBox from "../components/CenterBox";

const scoreColumns = [
  {
    title: "Baker Id",
    field: "bakerId",
    type: "numeric",
  },
  {
    title: "Judge Name",
    field: "judgeName",
  },
  {
    title: "Appearance Score ",
    field: "appearance",
    type: "numeric",
    validate: (rowData) =>
      rowData.appearance > 5 || rowData.appearance < 0
        ? "Must be between 0 and 5"
        : true,
  },
  {
    title: "Taste Score ",
    field: "taste",
    type: "numeric",
    validate: (rowData) =>
      rowData.taste > 10 || rowData.taste < 0
        ? "Must be between 0 and 10"
        : true,
  },
  {
    field: "total",
    title: "Total Score",
    editable: "never",
    type: "numeric",
  },
];

const judgeIdToName = ({ newData, judgesData }) => ({
  ...newData,
  judgeId: judgesData.filter(
    (judge) => judge.judgeName === newData.judgeName
  )[0].judgeId,
  judgeName: null,
});

const ScoresPage = () => {
  const [scoresData, setScoresData] = useState([]);
  const [bakersData, setBakersData] = useState([]);
  const [judgesData, setJudgesData] = useState([]);

  useEffect(() => {
    //TODO: Get latest scores (API Call)
    setScoresData(scores);
    //TODO: Get latest bakers (API Call)
    setBakersData(bakers);
    //TODO: Get latest judges (API Call)
    setJudgesData(judges);
  }, []);

  const editScoresData = {
    onRowAdd: (newData) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          setScoresData([
            ...scoresData,
            judgeIdToName({ newData, judgesData }),
          ]);
          //TODO: Add Score (API Call)
          resolve();
        }, 1000);
      }),
    onRowUpdate: (newData, oldData) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          const dataUpdate = [...scoresData];
          const index = oldData.tableData.id;
          dataUpdate[index] = judgeIdToName({ newData, judgesData });
          setScoresData([...dataUpdate]);
          //TODO: Update Score (API Call)
          resolve();
        }, 1000);
      }),
    onRowDelete: (oldData) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          const dataDelete = [...scoresData];
          const index = oldData.tableData.id;
          dataDelete.splice(index, 1);
          setScoresData([...dataDelete]);
          //TODO: Delete Score (API Call)
          resolve();
        }, 1000);
      }),
  };

  return (
    <DefaultLayout>
      <CenterBox />
      <Table
        title="Scores"
        columns={scoreColumns.map((column) => {
          if (column.field === "bakerId") {
            const obj = {};
            bakersData
              .map((data) => data.bakerId)
              .forEach((element) => {
                obj[element] = element;
              });
            return { ...column, lookup: obj };
          }
          if (column.field === "judgeName") {
            const obj = {};
            judgesData
              .map((data) => data.judgeName)
              .forEach((element) => {
                obj[element] = element;
              });
            return { ...column, lookup: obj };
          }
          return column;
        })}
        data={scoresData
          .map((item) => ({
            ...item,
            total: item.appearance + item.taste,
          }))
          .map((item) => ({
            ...item,
            judgeName: judgesData.filter(
              (judge) => judge.judgeId === item.judgeId
            )[0].judgeName,
          }))}
        editable={editScoresData}
      />
    </DefaultLayout>
  );
};

export default ScoresPage;
