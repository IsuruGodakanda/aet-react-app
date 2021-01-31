import './index.css';

import ConfirmDialog from 'Components/confirm-dialog';
import Modal from 'Components/modal';
import { isEmpty } from 'lodash-es';
import React from 'react';
import { toast } from 'react-toastify';
import { deleteTableRecordById, getTableData } from 'Services/api';
import { camelCaseToNormalString } from 'Utils/commonUtil';

import { faEye, faTimesCircle, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, TablePagination } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';

import TableHeaders from './headers';
import Search from './search';

interface IProps {
  setLoader: (status: boolean) => void;
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
}

const TableComponent: React.FC<IProps> = (props: IProps) => {
  const {
    setLoader,
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
  const [sorting, setSorting] = React.useState({ field: '', order: '' });
  const [columns, setColumns] = React.useState<ITableColumn[]>(headerTitles);
  const [tableLoad, setTableLoad] = React.useState(false);

  const setColumnHeaders = (dataSet) => {
    const cols: ITableColumn[] = [];

    Object.entries(dataSet[0]).forEach(([key]) => {
      cols.push({
        key,
        label: camelCaseToNormalString(key).toUpperCase(),
        showColumn: true,
        sortable: false,
      });
    });

    setColumns(cols);
  };

  const loadTableData = () => {
    setTableLoad(true);
    const filterQuery: ITableFilterPayload = { offset: page, limit: rowsPerPage, searchTerm: search };

    getTableData(url, { ...filterQuery, ...queryParams, sortby: sorting.field, sortdirection: sorting.order })
      .then((res) => {
        if (isEmpty(columns)) {
          if (!isEmpty(res.headerTitles)) {
            setColumns(res.results);
          }
        }
        setComputedData(res.results);
        setCount(res.totalCount);
        setTableLoad(false);
      })
      .catch((err) => {
        setTableLoad(false);
        toast.error('Fail to load table data!');
      });
  };

  React.useEffect(() => {
    if (serverSidePagination && enablePagination) {
      loadTableData();
    }
  }, [page, rowsPerPage, search, sorting]);

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
  }, [data, computedData, page, rowsPerPage, search, sorting]);

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
    setLoader(true);

    deleteTableRecordById(`${url}/${id}`)
      .then((res) => {
        setLoader(false);
        loadTableData();
      })
      .catch((err) => {
        setLoader(false);
        toast.error('Fail to delete the record!');
      });
  };

  const AddButton: React.FC = () => (
    <FontAwesomeIcon
      id="viewModal"
      icon={faUserPlus}
      size="lg"
      className="iconTheme ml-1 mr-4"
      title="View more detail"
    />
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
                id="addEmployee"
                dialogTitle="Add Employee"
                dialogDescription="Add worker or manager into the office"
                maxWidth="xs"
                modalActionNode={<AddButton />}
              >
                <CreateUpdateForm loadTable={loadTableData} setLoader={setLoader} />
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
        {isEmpty(computedData) ? (
          <>
            <Table aria-label="simple table">
              <TableHeaders
                columns={columns}
                showEditColumn={showEditColumn}
                showDeleteColumn={showDeleteColumn}
                onSorting={(field, order) => setSorting({ field, order })}
              />
            </Table>
            <Table aria-label="simple table">
              <TableBody>
                <TableRow>{emptyRecordsMessage}</TableRow>
              </TableBody>
            </Table>
          </>
        ) : tableLoad ? (
          <>
            <Table aria-label="simple table">
              <TableHeaders
                columns={columns}
                showEditColumn={showEditColumn}
                showDeleteColumn={showDeleteColumn}
                onSorting={(field, order) => setSorting({ field, order })}
              />
            </Table>
            <Table aria-label="simple table">
              <TableBody>
                <TableRow>
                  <div style={{ padding: '100px', color: '#000000', width: '100%', textAlign: 'center' }}>
                    {loadRecordsMessage}
                  </div>
                </TableRow>
              </TableBody>
            </Table>
          </>
        ) : (
          <Table aria-label="simple table">
            <TableHeaders
              columns={columns}
              showEditColumn={showEditColumn}
              showDeleteColumn={showDeleteColumn}
              onSorting={(field, order) => setSorting({ field, order })}
            />
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
                          id={`editEmployee${row._id}`}
                          dialogTitle="Edit Employee"
                          dialogDescription="Edit worker or manager into the office"
                          maxWidth="xs"
                          modalActionNode={<UpdateButton />}
                        >
                          <CreateUpdateForm selectedId={row._id} loadTable={loadTableData} setLoader={setLoader} />
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
          </Table>
        )}
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
