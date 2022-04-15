import React from "react";
import MaterialTable from "@material-table/core";

const Table = ({ title, columns, data, editable, detailPanel, options }) => {
  return (
    <div style={{ maxWidth: "100%", padding: "0 50px" }}>
      <MaterialTable
        title={title}
        columns={columns}
        data={data}
        editable={editable}
        detailPanel={detailPanel}
        options={options}
      />
    </div>
  );
};

export default Table;
// {
//   actionsColumnIndex: -1,
//   detailPanelType: "single",
//   paging: false,
// }
