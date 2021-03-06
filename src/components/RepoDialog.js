import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function RepoDialog({ repo, toggleDialogVisibility, open }) {
  const capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  return (
    <div>
      <Dialog
        className="repo-dialog"
        open={open}
        onClose={toggleDialogVisibility}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          style={{ textAlign: "center" }}
        >{`${capitalize(repo.trackingType)} Details`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <b>Repo:</b> {repo.gitHubRepo}
            <br />
            <b>Version:</b> {repo.tagName}
            <br />
            <b>{capitalize(`${repo.trackingType}`)} Title:</b> {repo.title}
            <br />
            <b>Date:</b> {`${repo.releaseDate}`}
            <br />
            <b>Author:</b> {repo.author}
            <br />
            <b>{capitalize(`${repo.trackingType}`)} Notes:</b> {repo.body}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleDialogVisibility} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
