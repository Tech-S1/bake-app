import React, { useEffect, useState } from "react";
import Table from "../components/tables/Table";
import DefaultLayout from "../containers/DefaultLayout";
import CenterBox from "../components/CenterBox";
import get, { TYPE as GET_TYPE } from "../apis/get";
import currentDate from "../utils/currentDate";
import create, { TYPE as CREATE_TYPE } from "../apis/create";
import update, { TYPE as UPDATE_TYPE } from "../apis/update";
import deleteItem, { TYPE as DELETE_TYPE } from "../apis/delete";

const scoreColumns = [
  {
    title: "Entrant Id",
    field: "entrantId",
    editable: "onAdd",
  },
  {
    title: "Judge Name",
    field: "judgeName",
    editable: "onAdd",
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

const ScoresPage = () => {
  const [scoresData, setScoresData] = useState([]);
  const [judgesData, setJudgesData] = useState();
  const [participantData, setParticipantData] = useState();

  useEffect(() => {
    get(
      GET_TYPE.LATEST_BAKE_OFF,
      ({ bakeoffs }) => {
        if (bakeoffs[0].date !== currentDate()) {
          return; // No Bake Offs - Dont Set Title
        }
        setParticipantData(bakeoffs[0].participants);
      },
      (errorData) => {
        console.log(errorData); //TODO: Handle Error
      }
    );
  }, []);

  useEffect(
    () =>
      get(
        GET_TYPE.JUDGES,
        ({ judges }) => {
          setJudgesData(judges);
        },
        (errorData) => {
          console.log(errorData); //TODO: Handle Error
        }
      ),
    [setJudgesData]
  );

  useEffect(() => {
    get(
      GET_TYPE.LATEST_BAKE_OFF,
      (successData) => {
        console.log();
        setScoresData(
          successData.bakeoffs[0].participants
            .map((participant) => [...participant.results])
            .flat()
        );
      },
      (errorData) => {
        console.log(errorData); //TODO: Handle Error
      }
    );
  }, []);

  const editScoresData = {
    onRowAdd: (newData) =>
      new Promise((resolve, reject) =>
        setTimeout(() => {
          return create(
            CREATE_TYPE.RESULTS,
            {
              entrantId: parseInt(newData.entrantId),
              judgeName: newData.judgeName,
              appearance: newData.appearance,
              taste: newData.taste,
            },
            () => {
              setScoresData([
                ...scoresData,
                {
                  entrantId: newData.entrantId,
                  judgeName: newData.judgeName,
                  appearance: newData.appearance,
                  taste: newData.taste,
                },
              ]);
              resolve();
            },
            () => {
              reject();
            }
          );
        }, 1000)
      ),
    onRowUpdate: (newData, oldData) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          return update(
            UPDATE_TYPE.RESULTS,
            {
              entrantId: parseInt(oldData.entrantId),
              judgeName: oldData.judgeName,
              appearance: newData.appearance,
              taste: newData.taste,
            },
            () => {
              const dataUpdate = [...scoresData];
              const index = oldData.tableData.id;
              dataUpdate[index] = newData;
              setScoresData([...dataUpdate]);
              resolve();
            },
            () => {
              reject();
            }
          );
        }, 1000);
      }),
    onRowDelete: (oldData) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          return deleteItem(
            DELETE_TYPE.RESULTS,
            {
              entrantId: parseInt(oldData.entrantId),
              judgeName: oldData.judgeName,
              appearance: oldData.appearance,
              taste: oldData.taste,
            },
            () => {
              const dataDelete = [...scoresData];
              const index = oldData.tableData.id;
              dataDelete.splice(index, 1);
              setScoresData([...dataDelete]);
              resolve();
            },
            () => {
              reject();
            }
          );
        }, 1000);
      }),
  };

  const validateUnique = (rowData) =>
    rowData.entrantId &&
    rowData.judgeName &&
    scoresData.filter(
      (scoreData) =>
        scoreData.entrantId == rowData.entrantId &&
        scoreData.judgeName == rowData.judgeName
    ).length === 0
      ? true
      : "Unique Combination Needed";

  const mapScoreColumns = (column) => {
    console.log(scoresData);
    if (column.field === "entrantId") {
      const obj = {};
      participantData
        .map((data) => data.entrantId)
        .forEach((element) => {
          obj[element] = element;
        });
      console.log(scoresData);
      return {
        ...column,
        lookup: obj,
        validate: validateUnique,
      };
    }
    if (column.field === "judgeName") {
      const obj = {};
      judgesData
        .map((data) => data.name)
        .forEach((element) => {
          obj[element] = element;
        });
      return { ...column, lookup: obj, validate: validateUnique };
    }
    return column;
  };

  const mapScoreData = (item) => ({
    ...item,
    total: item.appearance + item.taste,
  });

  return (
    <DefaultLayout>
      <CenterBox />
      {judgesData && participantData && (
        <Table
          title="Scores"
          columns={scoreColumns.map(mapScoreColumns)}
          data={scoresData.map(mapScoreData)}
          editable={editScoresData}
          options={{
            actionsColumnIndex: -1,
            detailPanelType: "single",
            paging: false,
          }}
        />
      )}
    </DefaultLayout>
  );
};

export default ScoresPage;
