import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  styled,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import get, { TYPE } from "../apis/get";
import uploadPhoto from "../apis/uploadPhoto";
import CenterBox from "../components/CenterBox";
import DefaultLayout from "../containers/DefaultLayout";
import currentDate from "../utils/currentDate";

const Input = styled("input")({
  display: "none",
});

const PhotoPage = () => {
  const [bakeOffTitle, setBakeOffTitle] = useState();
  const [participantData, setParticipantData] = useState();
  const [entrantId, setEntrantId] = useState(0);
  const [selectedFile, setSelectedFile] = useState();
  const [imagePreview, setImagePreview] = useState();

  useEffect(() => {
    get(
      TYPE.LATEST_BAKE_OFF,
      ({ bakeoffs }) => {
        if (bakeoffs[0].date !== currentDate()) {
          return; // No Bake Offs - Dont Set Title
        }
        const title = bakeoffs[0].title;
        setParticipantData(bakeoffs[0].participants);
        setBakeOffTitle(title);
      },
      (errorData) => {
        console.log(errorData); //TODO: Handle Error
      }
    );
  }, []);

  const handleEntrantChange = (e) => {
    setEntrantId(e.target.value);
  };

  const handleFileChange = (e) => {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    uploadPhoto(
      entrantId,
      selectedFile,
      () => {
        setEntrantId(0);
        setSelectedFile();
      },
      () => {
        console.log("error");
      }
    );
  };

  const Title = () => (
    <CenterBox height={100}>
      <Typography variant="h5" gutterBottom component="div">
        {bakeOffTitle}
      </Typography>
    </CenterBox>
  );

  return (
    <>
      {bakeOffTitle ? (
        <DefaultLayout>
          <CenterBox height="100%">
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                height: "100%",
              }}
            >
              <Title />
              <CenterBox width="50%">
                <FormControl fullWidth>
                  <InputLabel>Entrant</InputLabel>
                  <Select
                    value={entrantId}
                    label="Entrant"
                    onChange={handleEntrantChange}
                    required
                  >
                    {participantData.map(({ entrantId }) => (
                      <MenuItem value={entrantId}>{`${entrantId}`}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </CenterBox>
              {!!entrantId && (
                <>
                  <CenterBox>
                    <label htmlFor="contained-button-file">
                      <Input
                        accept="image/*"
                        id="contained-button-file"
                        type="file"
                        onChange={handleFileChange}
                      />
                      <Button variant="contained" component="span">
                        Choose Photo
                      </Button>
                    </label>
                  </CenterBox>
                </>
              )}
              {!!entrantId && !!selectedFile && (
                <>
                  <CenterBox>
                    <img height={325} src={imagePreview} />
                  </CenterBox>
                  <CenterBox>
                    <label htmlFor="contained-button-submit">
                      <Input
                        id="contained-button-submit"
                        type="submit"
                        onClick={handleSubmit}
                      />
                      <Button variant="contained" component="span">
                        Upload
                      </Button>
                    </label>
                  </CenterBox>
                </>
              )}
            </Box>
          </CenterBox>
        </DefaultLayout>
      ) : (
        <DefaultLayout>
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              height: "100%",
            }}
          >
            <CenterBox>No Active Bakeoff</CenterBox>
          </Box>
        </DefaultLayout>
      )}
    </>
  );
};

export default PhotoPage;
