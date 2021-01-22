import React from 'react';
import { toast } from 'react-toastify';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import { TablePagination, Grid } from '@material-ui/core';
import TableRow from '@material-ui/core/TableRow';
import { camelCaseToNormalString } from 'Utils/commonUtil';
import { getTableData, deleteTableRecordById } from 'Services/api';
import { isEmpty } from 'lodash-es';
import { faEye, faTimesCircle, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import Modal from 'Components/modal';
import ConfirmDialog from 'Components/confirm-dialog';
import Search from '../search';
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
  createUpdateForm?: React.ReactNode;
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
    createUpdateForm: CreateUpdateForm,
  } = props;

  const [computedData, setComputedData] = React.useState(data);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [count, setCount] = React.useState(0);
  const [page, setPage] = React.useState(0);
  const [search, setSearch] = React.useState('');
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
            label: showingTableHeaders[key],
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
    const filterQuery: ITableFilterPayload = { offset: page, limit: rowsPerPage, searchTerm: search };

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
        toast.error('Fail to load table data!');
      });
  };

  React.useEffect(() => {
    if (serverSidePagination && enablePagination) {
      loadTableData();
    }
  }, [page, rowsPerPage, search]);

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
  }, [data, computedData, page, rowsPerPage, search]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    if (event.target.value >= count) {
      setPage(0);
    }
  };

  const onDeleteRecord = (id: string): void => {
    deleteTableRecordById(`${url}/${id}`)
      .then((res) => {
        loadTableData();
      })
      .catch((err) => {
        toast.error('Fail to delete the record!');
      });
  };

  const AddButton: React.FC = () => (
    <FontAwesomeIcon id="viewModal" icon={faUserPlus} size="lg" className="iconTheme ml-1" title="View more detail" />
  );

  const UpdateButton: React.FC = () => (
    <FontAwesomeIcon id="viewModal" icon={faEye} size="lg" className="iconTheme ml-1" title="View more detail" />
  );

  const DeleteButton: React.FC = () => (
    <FontAwesomeIcon icon={faTimesCircle} size="lg" id="deleteIcon" className="ml-1" />
  );

  return (
    <div id="tablePaginated">
      <Grid className="p0">
        <Grid container direction="row" justify="flex-end" alignItems="center">
          <Grid className="pb-8">
            <Grid item xs={4} className="items-end flex">
              <Modal
                dialogTitle="Add Employee"
                dialogDescription="Add worker or manager into the office"
                maxWidth="xs"
                modalActionNode={<AddButton />}
              >
                <CreateUpdateForm loadTable={loadTableData} />
              </Modal>
              <Search
                onSearch={(value) => {
                  setSearch(value);
                  setPage(0);
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
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
                        <Modal
                          dialogTitle="Edit Employee"
                          dialogDescription="Edit worker or manager into the office"
                          maxWidth="xs"
                          modalActionNode={<UpdateButton />}
                        >
                          <CreateUpdateForm selectedId={row._id} loadTable={loadTableData} />
                        </Modal>
                        <ConfirmDialog
                          title="Confirm delete"
                          content="Do you want to delete this record?"
                          onConfirm={() => {
                            onDeleteRecord(row._id);
                          }}
                          confirmDialogActionNode={<DeleteButton />}
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
  createUpdateForm: undefined,
};

export default TableComponent;
