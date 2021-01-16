import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import { TablePagination } from '@material-ui/core';
import TableRow from '@material-ui/core/TableRow';
import { camelCaseToNormalString } from 'Utils/commonUtil';
import { getTableData } from 'Services/api';
import { isEmpty } from 'lodash-es';
import { faEye, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import './index.css';

const TableComponent = (props: {
  data?: any;
  url?: string;
  queryParams?: any;
  headerTitles?: any;
  rowsPerPageOptions?: number[];
  showEditColumn?: boolean;
  showDeleteColumn?: boolean;
  enablePagination?: boolean;
  serverSidePagination?: boolean;
  emptyRecordsMessage?: string;
  loadRecordsMessage?: string;
}): JSX.Element => {
  const {
    data,
    url = '/',
    queryParams,
    headerTitles,
    rowsPerPageOptions = [5, 10, 25, 50, 100],
    showEditColumn,
    showDeleteColumn,
    enablePagination,
    serverSidePagination,
    emptyRecordsMessage,
    loadRecordsMessage,
  } = props;

  const [computedData, setComputedData] = React.useState(data);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [count, setCount] = React.useState(0);
  const [page, setPage] = React.useState(0);
  const [columns, setColumns] = React.useState<ITableColumn[]>([]);
  const [tableLoad, setTableLoad] = React.useState(false);
  const [showingTableHeaders, setShowingTableHeaders] = React.useState(headerTitles);

  const setColumnHeaders = (dataSet) => {
    const cols: ITableColumn[] = [];

    Object.entries(dataSet[0]).forEach(([key]) => {
      if (showingTableHeaders) {
        if (showingTableHeaders[key]) {
          cols.push({
            key,
            label: showingTableHeaders[key].replace(/&amp;/g, '+'),
            showColumn: true,
          });
        }
      } else {
        cols.push({
          key,
          label: camelCaseToNormalString(key).toUpperCase(),
          showColumn: true,
        });
      }
    });

    setColumns(cols);
  };

  const loadTableData = () => {
    setTableLoad(true);
    const filterQuery: ITableFilterPayload = { offset: page, limit: rowsPerPage };

    getTableData(url, { ...filterQuery, ...queryParams })
      .then((res) => {
        if (isEmpty(columns)) {
          if (!isEmpty(res.headerTitle)) {
            setShowingTableHeaders({ answer: res.headerTitle });
            setColumnHeaders(res.results);
          } else {
            setColumnHeaders(res.results);
          }
        }
        setComputedData(res.results);
        setCount(res.totalCount);
        setTableLoad(false);
      })
      .catch((err) => {
        console.log(JSON.parse(err.message).message);
      });
  };

  React.useEffect(() => {
    if (serverSidePagination && enablePagination) {
      loadTableData();
    }
  }, [page, rowsPerPage]);

  const fetchRows = React.useMemo(() => {
    if (serverSidePagination && enablePagination) {
      return computedData;
    }
    setComputedData(data);
    if (isEmpty(columns)) {
      setColumnHeaders(data);
    }

    setCount(computedData.length);

    // Current Page slice
    return enablePagination ? computedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : computedData;
  }, [data, computedData, page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    if (event.target.value >= count) {
      setPage(0);
    }
  };

  const onViewUpdateRow = (row: Record<string, unknown>): void => {
    alert(row);
  };

  const onDeleteRow = (row: Record<string, unknown>): void => {
    alert(row);
  };

  return (
    <div id="tablePaginated">
      <TableContainer component={Paper} elevation={0} className="cardContent">
        <Table aria-label="simple table">
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
          {isEmpty(computedData) ? (
            <TableBody>
              <TableRow>
                <TableCell>{emptyRecordsMessage}</TableCell>
              </TableRow>
            </TableBody>
          ) : tableLoad ? (
            <TableBody>
              <TableRow>
                <TableCell>
                  <div style={{ padding: '100px', color: '#000000', width: '100%', textAlign: 'center' }}>
                    {loadRecordsMessage}
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {fetchRows.map((row, rowIndex) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={rowIndex}>
                    {columns.map((column, columnIndex) => {
                      return (
                        column.showColumn && (
                          <TableCell style={{ color: column.textColor ? column.textColor : '' }} key={columnIndex}>
                            {row[column.key]}
                          </TableCell>
                        )
                      );
                    })}
                    {showEditColumn && showDeleteColumn && (
                      <TableCell align="right">
                        <FontAwesomeIcon
                          icon={faEye}
                          size="lg"
                          id="viewIcon"
                          onClick={() => {
                            onViewUpdateRow(row);
                          }}
                        />
                        <FontAwesomeIcon
                          icon={faTimesCircle}
                          size="lg"
                          id="deleteIcon"
                          className="ml-1"
                          onClick={() => {
                            onDeleteRow(row);
                          }}
                        />
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      {enablePagination && (
        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component="div"
          count={count || 0}
          rowsPerPage={rowsPerPage || 5}
          page={page || 0}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      )}
    </div>
  );
};

TableComponent.defaultProps = {
  data: [],
  url: '/',
  queryParams: {},
  headerTitles: {},
  rowsPerPageOptions: [5, 10, 25, 50, 100],
  showEditColumn: true,
  showDeleteColumn: true,
  enablePagination: true,
  serverSidePagination: true,
  emptyRecordsMessage: 'No data available at this time',
  loadRecordsMessage: 'Table loading...',
};

export default TableComponent;
