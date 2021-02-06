import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

interface IProps {
  columns: ITableColumn[];
  showEditColumn?: boolean;
  showDeleteColumn?: boolean;
  onSorting: (field: string, order: string) => void;
}

const TableHeaders: React.FC<IProps> = (props: IProps) => {
  const { columns, showEditColumn, showDeleteColumn, onSorting } = props;

  const [sortingField, setSortingField] = React.useState('');
  const [sortingOrder, setSortingOrder] = React.useState('');

  const onSortingChange = (field) => {
    let order;

    if (field === sortingField) {
      if (sortingOrder === '' && (field === sortingField || !sortingField)) {
        order = 'ASC';
      } else if (sortingOrder === 'ASC' && field === sortingField) {
        order = 'DESC';
      } else {
        order = '';
      }
    } else {
      order = 'ASC';
    }

    setSortingOrder(order);
    setSortingField(field);
    onSorting(field, order);
  };

  const setIcon = (order: string): IconName => {
    if (order === 'ASC') {
      return 'sort-amount-up';
    }
    if (order === 'DESC') {
      return 'sort-amount-down';
    }
    return 'sort-amount-up';
  };

  return (
    <TableHead>
      <TableRow>
        {columns.map((column, index) => {
          return (
            column.showColumn && (
              <TableCell
                id={column.key.toLowerCase()}
                key={column.key}
                className="column cursor-pointer"
                onClick={() => (column.sortable ? onSortingChange(column.key) : null)}
              >
                {sortingField && sortingField === column.key ? (
                  <FontAwesomeIcon
                    icon={['fas', setIcon(sortingOrder)]}
                    size="lg"
                    className={`text-base mr-1 ${sortingOrder === '' ? 'text-gray-600' : 'text-blue-600'}`}
                  />
                ) : (
                  column.sortable && (
                    <FontAwesomeIcon
                      icon={['fas', 'sort-amount-up']}
                      size="lg"
                      className=" text-gray-600 text-base mr-2"
                    />
                  )
                )}
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
