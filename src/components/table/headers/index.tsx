import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

interface IProps {
  columns: ITableColumn[];
  showEditColumn?: boolean;
  showDeleteColumn?: boolean;
}

const TableHeaders = (props: IProps): JSX.Element => {
  const { columns, showEditColumn, showDeleteColumn } = props;

  return (
    <TableHead>
      <TableRow>
        {columns.map((column, index) => {
          return (
            column.showColumn && (
              <TableCell key={column.key} className="column">
                {column.label}
              </TableCell>
            )
          );
        })}
        {(showEditColumn || showDeleteColumn) && (
          <TableCell align="right" className="column">
            Action
          </TableCell>
        )}
      </TableRow>
    </TableHead>
  );
};

TableHeaders.defaultProps = {
  showEditColumn: true,
  showDeleteColumn: true,
};

export default TableHeaders;
