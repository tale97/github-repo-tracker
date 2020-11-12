import React from "react";
import TextField from "@material-ui/core/TextField";

class SearchField extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TextField
        id="outlined-basic"
        label="Paste repo url here..."
        variant="outlined"
        onChange={this.props.searchFieldInput}
      />
    );
  }
}

export default SearchField;
