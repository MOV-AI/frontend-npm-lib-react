import React, { Component } from "react";
import PropTypes from "prop-types";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {
  List,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache
} from "react-virtualized";

class LogsList extends Component {
  cache = new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: 50
  });

  renderRow = ({ index, key, style, parent }) => {
    return (
      <CellMeasurer
        key={key}
        cache={this.cache}
        parent={parent}
        columnIndex={0}
        rowIndex={index}
      >
        <ListItem
          key={index}
          style={{
            ...style,
            paddingTop: 2,
            paddingBottom: 2,
            backgroundColor: index % 2 === 0 ? "#262626" : "#202020"
          }}
        >
          <ListItemText
            primary={this.props.logsData[index]}
            primaryTypographyProps={{
              style: { fontSize: "0.9rem" }
            }}
            style={{ marginTop: 0, marginBottom: 0 }}
          />
        </ListItem>
      </CellMeasurer>
    );
  };

  componentDidMount() {}

  render() {
    return (
      <AutoSizer>
        {({ height, width }) => (
          <List
            className="List"
            width={width}
            height={height}
            rowHeight={this.cache.rowHeight}
            rowRenderer={this.renderRow}
            rowCount={this.props.logsData.length}
            deferredMeasurementCache={this.cache}
            style={{ fontSize: "0.5rem" }}
          ></List>
        )}
      </AutoSizer>
    );
  }
}

export default LogsList;

LogsList.propTypes = {
  robotSelected: PropTypes.string
};
