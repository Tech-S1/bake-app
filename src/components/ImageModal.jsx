import React, { useEffect, useState } from "react";
import { Button, CircularProgress, Modal, Paper, styled } from "@mui/material";
import CenterBox from "./CenterBox";
import CancelIcon from "@mui/icons-material/Cancel";
import retrievePhoto from "../apis/retrievePhoto";
import decodeImageUrl from "../utils/decodeImageUrl";
import uploadPhoto from "../apis/uploadPhoto";

const Input = styled("input")({
  display: "none",
});

const ImageModal = ({ entrantId, clearEntrantId, upload, selectedDate }) => {
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!entrantId) return;
    setLoading(true);
    retrievePhoto(
      entrantId,
      selectedDate,
      ({ image }) => {
        image !== undefined ? setImage(decodeImageUrl(image)) : setImage();
        setLoading(false);
      },
      () => {}
    );
  }, [entrantId]);

  const handleFileChange = (e) => {
    setLoading(true);
    uploadPhoto(
      entrantId,
      e.target.files[0],
      () => {
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
          setImage(reader.result);
        };
        setLoading(false);
      },
      () => {
        console.log("error");
      }
    );
  };

  return (
    <Modal open={!!entrantId} onClose={clearEntrantId}>
      <CenterBox>
        <Paper>
          <CancelIcon
            onClick={() => {
              clearEntrantId();
              setImage();
              setLoading(false);
            }}
            style={{
              color: "black",
              float: "right",
              padding: "5px 5px 0px 0px",
            }}
          />
          <CenterBox padding="0px 15px 15px 15px">
            {image && !loading && <img height={325} src={image} />}
            {!image && loading && <CircularProgress />}
            {!image && !loading && <div>No Image</div>}
          </CenterBox>
          {upload && (
            <CenterBox>
              <label htmlFor="contained-button-file">
                <Input
                  accept="image/*"
                  id="contained-button-file"
                  type="file"
                  onChange={handleFileChange}
                />
                <Button variant="contained" component="span">
                  Upload
                </Button>
              </label>
            </CenterBox>
          )}
        </Paper>
      </CenterBox>
    </Modal>
  );
};

export default ImageModal;
