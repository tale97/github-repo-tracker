import React from "react";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";

class SearchField extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <form onSubmit={this.props.handleOnSubmit}>
        <TextField
          id="outlined-basic"
          label="Paste repo url here..."
          variant="outlined"
          onChange={this.props.searchFieldInput}
        />
        <Button color="primary" type="submit">
          Add Repo
        </Button>
      </form>
    );
  }
}

export default SearchField;
