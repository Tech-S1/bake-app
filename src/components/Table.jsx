import React from "react";
import MaterialTable from "@material-table/core";

const Table = ({ title, columns, data, editable, detailPanel }) => {
  return (
    <div style={{ maxWidth: "100%", padding: "0 50px" }}>
      <MaterialTable
        title={title}
        columns={columns}
        data={data}
        editable={editable}
        detailPanel={detailPanel}
      />
    </div>
  );
};

export default Table;
