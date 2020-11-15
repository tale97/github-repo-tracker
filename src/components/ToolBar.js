import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import BeenhereIcon from "@material-ui/icons/Beenhere";
import "../styles/ToolBar.scss";
import Tooltip from "@material-ui/core/Tooltip";
import GitHubIcon from "@material-ui/icons/GitHub";
import DeleteIcon from "@material-ui/icons/Delete";
import BeenhereOutlinedIcon from "@material-ui/icons/BeenhereOutlined";

class ToolBar extends React.Component {
  onClickGitHubIcon = (link) => {
    window.open(link, "_blank");
  };

  render() {
    const { repo, onClickCheckMark, onClickTrashIcon } = this.props;
    return (
      <Grid className="tool-bar" justify="flex-end" container direction="row">
        <Grid item className="github-button">
          <Tooltip title="Go to GitHub page">
            <IconButton
              aria-label="github"
              onClick={() => this.onClickGitHubIcon(repo.githubLink)}
            >
              <GitHubIcon />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item className="delete-button">
          <Tooltip title="Untrack repository">
            <IconButton
              aria-label="delete"
              onClick={() => onClickTrashIcon(repo)}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Grid>
        {this.props.isHighlighted === "highlighted" ? (
          <Grid item className={`check-button bounce`}>
            <Tooltip title="Mark repository as seen">
              <IconButton
                aria-label="check"
                onClick={() => onClickCheckMark(repo.name)}
              >
                <BeenhereOutlinedIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        ) : (
          <Grid item className={`check-button`}>
            <IconButton
              aria-label="check"
              onClick={() => onClickCheckMark(repo.name)}
              color="primary"
              disableRipple="true"
              disableFocusRipple="true"
              style={{ backgroundColor: "transparent", cursor: "default" }}
            >
              <BeenhereIcon />
            </IconButton>
          </Grid>
        )}
      </Grid>
    );
  }
}

export default ToolBar;
