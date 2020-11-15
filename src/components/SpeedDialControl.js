import React from "react";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import RefreshIcon from "@material-ui/icons/Refresh";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import ArrowDropDownCircleIcon from "@material-ui/icons/ArrowDropDownCircle";
import AllOutIcon from "@material-ui/icons/AllOut";
import "../styles/SpeedDialControl.scss";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";

class SpeedDialControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSpeedDialOpen: false,
      isSpeedDialHidden: false,
      speedDialDirection: "up",
    };
  }
  actions = [
    {
      icon: <DeleteForeverIcon color="primary" />,
      name: "Untrack All",
      onClick: this.props.deleteAllRepos,
    },
    {
      icon: <RefreshIcon color="primary" />,
      name: "Refresh All",
      onClick: this.props.getAllReposLatestReleases,
    },
  ];

  onCloseSpeedDial = () => {
    this.setState({ isSpeedDialOpen: false });
  };

  onOpenSpeedDial = () => {
    this.setState({ isSpeedDialOpen: true });
  };

  onHiddenChange = (event) => {
    this.setState({ isSpeedDialHidden: event.target.checked });
  };

  onClickSpeedDialAction = (callBackAction) => {
    this.onCloseSpeedDial();
    callBackAction();
  };

  render() {
    const {
      speedDialDirection,
      isSpeedDialHidden,
      isSpeedDialOpen,
    } = this.state;

    return (
      <SpeedDial
        className={"speed-dial-control"}
        ariaLabel="macro-control"
        hidden={isSpeedDialHidden}
        icon={
          <SpeedDialIcon
            icon={<AllOutIcon />}
            openIcon={<ArrowDropUpIcon />}
            style={{ color: "white" }}
          />
        }
        onClose={this.onCloseSpeedDial}
        onOpen={this.onOpenSpeedDial}
        open={isSpeedDialOpen}
        direction={speedDialDirection}
        openIcon={<ArrowDropDownCircleIcon />}
      >
        {this.actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.onClick}
            tooltipOpen
            style={{ whiteSpace: "nowrap" }}
          />
        ))}
      </SpeedDial>
    );
  }
}

export default SpeedDialControl;
