import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function RepoDialog({ repo, toggleDialogVisibility, open }) {
  return (
    <div>
      <Dialog
        className="repo-dialog"
        open={open}
        onClose={toggleDialogVisibility}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Release Details"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <b>Repo:</b> {repo.name}
            <br />
            <b>Version:</b> {repo.tagName}
            <br />
            <b>Release Title:</b> {repo.title}
            <br />
            <b>Author:</b> {repo.author}
            <br />
            <b>Release Notes:</b> {repo.body}
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
