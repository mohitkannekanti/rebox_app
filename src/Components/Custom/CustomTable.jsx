import React, { forwardRef } from "react";
import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import PropTypes from "prop-types";
import LinearProgress from "@material-ui/core/LinearProgress";

const CustomTable = ({ data, columns, ...props }) => {
  return (
    <>
      <MaterialTable
        columns={columns}
        data={data}
        localization={{
          pagination: {
            labelDisplayedRows: "{from}-{to} of {count}",
          },
          body: {
            emptyDataSourceMessage: "No records to display",
          },
        }}
        options={{
          exportButton: true,
          exportFileName: "Export Table",
          showTitle: false,
          search: true,
          pageSize: 10,
          pageSizeOptions: [10, 20, 30, 50, 75, 100],
          toolbar: true,
          paging: true,
        }}
        components={{
          OverlayLoading: (props) => (
            <>
              <LinearProgress />
            </>
          ),
        }}
      />
    </>
  );
};
export default CustomTable;

CustomTable.propTypes = {
  data: PropTypes.array.isRequired,
  cols: PropTypes.array.isRequired,
};
