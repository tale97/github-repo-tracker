import React from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";

class FilterBar extends React.Component {
  render() {
    return (
      <TextField
        id="outlined-basic"
        variant="outlined"
        label="Filter tracked repositories"
        onChange={this.props.filterFieldInput}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    );
  }
}

export default FilterBar;
