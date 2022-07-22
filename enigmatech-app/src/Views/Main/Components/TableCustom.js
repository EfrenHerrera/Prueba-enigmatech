import React, { useEffect } from 'react'
import { makeStyles } from '@mui/styles';
import { Card, IconButton, Box, Pagination, Container, TextField } from '@mui/material';
import { DataGrid, 
    GridOverlay, 
    useGridApiRef, useGridApiContext, 
    gridPageCountSelector,
    gridPageSelector,
    useGridSelector,} from '@mui/x-data-grid';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { useSearch } from 'Hooks/useSearch';
import DrawerCustom from './DrawerCustom';

const useStyles = makeStyles((theme) => ({
    '@global': {
        '.ant-empty-img-1': {
            fill: theme.palette.mode === 'light' ? '#aeb8c2' : '#262626',
        },
        '.ant-empty-img-2': {
            fill: theme.palette.mode === 'light' ? '#f5f5f7' : '#595959',
        },
        '.ant-empty-img-3': {
            fill: theme.palette.mode === 'light' ? '#dce0e6' : '#434343',
        },
        '.ant-empty-img-4': {
            fill: theme.palette.mode === 'light' ? '#fff' : '#1c1c1c',
        },
        '.ant-empty-img-5': {
            fillOpacity: theme.palette.mode === 'light' ? '0.8' : '0.08',
            fill: theme.palette.mode === 'light' ? '#f5f5f5' : '#fff',
        },
    },
    cardRoot: {
        height: '79vh',
        flexDirection: 'column',
        '& .super-app-theme--header': {
            display: 'flex',
            paddingLeft: 15,
            "&:hover": {
                color: theme.palette.primary.main,
            }
        },
    },
    label: {
        marginTop: theme.spacing(1),
    },
    cardHeader: {
        backgroundColor: "initial",
    },
    cardActionsRoot: {
        paddingBottom: "1.5rem!important",
        paddingTop: "1.5rem!important",
        borderTop: "0!important",
    },
    containerRoot: {
        // [theme.breakpoints.down("md")]: {
        //   paddingLeft: "39px",
        //   paddingRight: "39px",
        // },
    },
    tableRoot: {
        marginBottom: "0!important",
    },
    tableCellRoot: {
        verticalAlign: "middle",
        paddingLeft: "1.5rem",
        paddingRight: "1.5rem",
        borderTop: "0",
    },
    tableCellRootHead: {
        backgroundColor: theme.palette.gray[100],
        color: theme.palette.gray[600],
    },
    tableCellRootBodyHead: {
        textTransform: "unset!important",
        fontSize: ".8125rem",
    },
    textField:{
        color: theme.palette.primary.main
    },
    linearProgressRoot: {
        height: "3px!important",
        width: "120px!important",
        margin: "0!important",
    },
    bgGradientError: {
        background:
            "linear-gradient(87deg," +
            theme.palette.error.main +
            ",#f56036)!important",
    },
    bgGradientSuccess: {
        background:
            "linear-gradient(87deg," +
            theme.palette.success.main +
            ",#2dcecc)!important",
    },
    bgGradientPrimary: {
        background:
            "linear-gradient(87deg," +
            theme.palette.primary.main +
            ",#825ee4)!important",
    },
    bgGradientInfo: {
        background:
            "linear-gradient(87deg," +
            theme.palette.info.main +
            ",#1171ef)!important",
    },
    bgGradientWarning: {
        background:
            "linear-gradient(87deg," +
            theme.palette.warning.main +
            ",#fbb140)!important",
    },
    bgPrimary: {
        backgroundColor: theme.palette.primary.main,
    },
    bgPrimaryLight: {
        backgroundColor: theme.palette.primary.light,
    },
    bgError: {
        backgroundColor: theme.palette.error.main,
    },
    bgErrorLight: {
        backgroundColor: theme.palette.error.light,
    },
    bgWarning: {
        backgroundColor: theme.palette.warning.main,
    },
    bgWarningLight: {
        backgroundColor: theme.palette.warning.light,
    },
    bgInfo: {
        backgroundColor: theme.palette.info.main,
    },
    bgInfoLight: {
        backgroundColor: theme.palette.info.light,
    },
    bgSuccess: {
        backgroundColor: theme.palette.success.main,
    },
    verticalAlignMiddle: {
        verticalAlign: "middle",
    },
    avatarRoot: {
        width: "36px",
        height: "36px",
        fontSize: ".875rem",
    },
}));

function CustomNoRowsOverlay() {
    const classes = useStyles();

    return (
        <GridOverlay className={classes.root}>
            <svg
                width="120"
                height="100"
                viewBox="0 0 184 152"
                aria-hidden
                focusable="false"
            >
                <g fill="none" fillRule="evenodd">
                    <g transform="translate(24 31.67)">
                        <ellipse
                            className="ant-empty-img-5"
                            cx="67.797"
                            cy="106.89"
                            rx="67.797"
                            ry="12.668"
                        />
                        <path
                            className="ant-empty-img-1"
                            d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
                        />
                        <path
                            className="ant-empty-img-2"
                            d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
                        />
                        <path
                            className="ant-empty-img-3"
                            d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
                        />
                    </g>
                    <path
                        className="ant-empty-img-3"
                        d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
                    />
                    <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
                        <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
                        <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
                    </g>
                </g>
            </svg>
            <div className={classes.label}>Vacío</div>
        </GridOverlay>
    );
}

function CustomPagination() {
    const apiRef = useGridApiContext();
    
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

    const classes = useStyles();
    return (
        <Pagination
            count={pageCount}
            page={page + 1}
            className={classes.root}
            variant="outlined"
            color="primary"
            onChange={(event, value) => apiRef.current.setPage(value - 1)}
        />
    );
}

function CustomToolbar(props) { 
    const classes = useStyles();
    
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginRight: 15, marginLeft: 15, marginTop: 5, marginBottom: 5 }}>
            <TextField
                variant="standard"
                value={props.value}
                onChange={props.onChange}
                placeholder="Search…"
                className={classes.textField}
                InputProps={{
                    startAdornment: <SearchOutlinedIcon fontSize="small" color="primary" />,
                    endAdornment: (
                        <IconButton
                            title="Clear"
                            aria-label="Clear"
                            size="small"
                            style={{ visibility: props.value ? 'visible' : 'hidden' }}
                            onClick={props.clearSearch}
                        >
                            <ClearOutlinedIcon fontSize="small" />
                        </IconButton>
                    ),
                }}
            />
        </div>
    );
}

function escapeRegExp(value) {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}
const TableCustom = ({
    data,
    drawerComponent: Drawer,
    drawerComponentEdit: DrawerEdit,
    isEditing,
    handleCloseEdit
}) => {
    
    const classes = useStyles();
    const apiRef = useGridApiRef();
    const [searchText, setSearchText] = React.useState('');
    const [rows, setRows] = React.useState([]);
    const [load, setLoad] = React.useState(true);
    const [, , isCreating, , , , , handleOpen, handleClose] = useSearch();

    useEffect(() => {
        setLoad(false)
        setRows(data.rows)
    }, [data.rows])

    const requestSearch = (searchValue) => {
        setSearchText(searchValue);
        const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
        const filteredRows = data.rows.filter((row) => {
            return Object.keys(row).some((field) => {
                return searchRegex.test(row[field].toString());
            });
        });
        setRows(filteredRows);
    };

    const handleRowEditStart = (params, event) => {
        event.defaultMuiPrevented = true;
    };

    const handleRowEditStop = (params, event) => {
        event.defaultMuiPrevented = true;
    };

    return (
        <>
            <Container
                maxWidth={false}
                component={Box}
                className={classes.root}>
                <Card classes={{ root: classes.cardRoot }}>
                    <DataGrid
                        rows={rows}
                        columns={data.columns}
                        apiRef={apiRef}
                        pagination
                        editMode="row"
                        onRowEditStart={handleRowEditStart}
                        onRowEditStop={handleRowEditStop}
                        rowHeight={38}
                        loading={load}
                        pageSize={10}
                        rowsPerPageOptions={[5]}
                        components={{
                            Pagination: CustomPagination,
                            NoRowsOverlay: CustomNoRowsOverlay,
                            Toolbar: CustomToolbar,
                        }}
                        componentsProps={{
                            toolbar: {
                                value: searchText,
                                onChange: (event) => requestSearch(event.target.value),
                                clearSearch: () => requestSearch(''),
                                Add: handleOpen,
                            },
                        }}
                    />
                    <DrawerCustom
                        handleDrawerClose={handleClose}
                        isOpen={isCreating}
                        component={Drawer} />
                        
                    <DrawerCustom
                        handleDrawerClose={handleCloseEdit}
                        isOpen={isEditing}
                        component={DrawerEdit} />
                        
                </Card>
            </Container>
        </>
    )
}

export default TableCustom;