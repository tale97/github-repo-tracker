import React from "react";
import SearchField from "./SearchField";
import FilterBar from "./FilterBar";

class SearchFunction extends React.Component {
  render() {
    const {
      searchFieldInput,
      handleOnSubmit,
      onClickRefresh,
      filterFieldInput,
      onClickSearchFunction,
      onClickFilterFunction,
    } = this.props;

    switch (this.props.searchFunctionType) {
      case "search":
        return (
          <SearchField
            searchFieldInput={searchFieldInput}
            handleOnSubmit={handleOnSubmit}
            onClickRefresh={onClickRefresh}
            onClickSearchFunction={onClickSearchFunction}
            onClickFilterFunction={onClickFilterFunction}
          />
        );
      case "filter":
        return (
          <FilterBar
            filterFieldInput={filterFieldInput}
            onClickSearchFunction={onClickSearchFunction}
            onClickFilterFunction={onClickFilterFunction}
          />
        );
      default:
        return null;
    }
  }
}

export default SearchFunction;
