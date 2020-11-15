import React from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";

class FilterBar extends React.Component {
  constructor() {
    super();
    this.state = {
      anchorEl: null,
    };
  }

  onCloseSearchFunction = () => {
    this.setState({ anchorEl: null });
  };

  onClickSearchFunction = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  render() {
    return (
      <div>
        <Menu
          id="search-function-menu"
          anchorEl={this.state.anchorEl}
          keepMounted
          open={Boolean(this.state.anchorEl)}
          onClose={this.onCloseSearchFunction}
        >
          <MenuItem onClick={this.props.onClickFilterFunction}>Filter</MenuItem>
          <MenuItem onClick={this.props.onClickSearchFunction}>
            Add Repo
          </MenuItem>
        </Menu>
        <TextField
          id="outlined-basic"
          variant="outlined"
          label="Filter tracked repositories by name"
          placeholder="repository name"
          onChange={this.props.filterFieldInput}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton
                  aria-controls="search-type-menu"
                  aria-haspopup="true"
                  onClick={this.onClickSearchFunction}
                >
                  <SearchIcon color="primary" />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>
    );
  }
}

export default FilterBar;
