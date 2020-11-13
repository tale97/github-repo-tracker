import React from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Grid from "@material-ui/core/Grid";
import BeenhereIcon from "@material-ui/icons/Beenhere";
import "../styles/ToolBar.scss";

class ToolBar extends React.Component {
  render() {
    const { repo, onClickCheckMark, onClickTrashIcon } = this.props;
    return (
      <Grid className="tool-bar" justify="flex-end" container direction="row">
        <Grid item className="delete-button">
          <IconButton
            aria-label="delete"
            onClick={() => onClickTrashIcon(repo)}
          >
            <DeleteIcon />
          </IconButton>
        </Grid>
        <Grid item className="check-button">
          <IconButton
            aria-label="check"
            onClick={() => onClickCheckMark(repo.name)}
          >
            <BeenhereIcon />
          </IconButton>
        </Grid>
      </Grid>
    );
  }
}

export default ToolBar;
