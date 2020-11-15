import React from "react";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import RefreshIcon from "@material-ui/icons/Refresh";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import ArrowDropDownCircleIcon from "@material-ui/icons/ArrowDropDownCircle";
import Tooltip from "@material-ui/core/Tooltip";
import AllOutIcon from "@material-ui/icons/AllOut";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import "../styles/SpeedDialControl.scss";

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
      name: "Delete",
      onClick: this.props.deleteAllRepos,
    },
    {
      icon: <RefreshIcon color="primary" />,
      name: "Refresh",
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
        icon={<AllOutIcon />}
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
          />
        ))}
      </SpeedDial>
    );
  }
}

export default SpeedDialControl;
