import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import BeenhereIcon from "@material-ui/icons/Beenhere";
import "../styles/ToolBar.scss";
import Tooltip from "@material-ui/core/Tooltip";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import GitHubIcon from "@material-ui/icons/GitHub";

class ToolBar extends React.Component {
  onClickGitHubIcon = (link) => {
    window.open(link, "_blank");
  };

  render() {
    const { repo, onClickCheckMark, onClickTrashIcon } = this.props;
    return (
      <Grid className="tool-bar" justify="flex-end" container direction="row">
        <Grid item className="delete-button">
          <Tooltip title="Untrack repository">
            <IconButton
              aria-label="delete"
              onClick={() => onClickTrashIcon(repo)}
            >
              <VisibilityOffIcon />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item className="check-button">
          <Tooltip title="Mark repository as seen">
            <IconButton
              aria-label="check"
              onClick={() => onClickCheckMark(repo.name)}
            >
              <BeenhereIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Go to GitHub page">
            <IconButton
              aria-label="github"
              onClick={() => this.onClickGitHubIcon(repo.githubLink)}
            >
              <GitHubIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    );
  }
}

export default ToolBar;
