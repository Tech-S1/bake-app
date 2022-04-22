import React from "react";
import MaterialTable from "@material-table/core";

const Table = ({
  title,
  columns,
  data,
  editable,
  detailPanel,
  options,
  width,
  padding,
  actions,
}) => (
  <div style={{ maxWidth: width || "100%", padding: padding || "0 50px" }}>
    <MaterialTable
      title={title}
      columns={columns}
      data={data}
      editable={editable}
      detailPanel={detailPanel}
      options={options}
      actions={actions}
    />
  </div>
);

export default Table;
