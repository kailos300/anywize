import React, { useEffect, useRef, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import MaterialTable from "material-table";
import { useTranslation } from "react-i18next";
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
//helpers
import { CURRENT_TOURS_COLUMNS } from "constants/ui-constants"
import { getColumns } from "util/table-utils";
import { mapTableData } from "util/helpers";


//Actions
import { selectCurrent, selectRouteStatus, getCurrentRoutes } from 'redux/slices/routeSlice';




const useStyles = makeStyles({
    _container: {
        backgroundColor: "#121212",
        padding: "60px 130px",
        minHeight: "100vh",
        "& .MuiInputBase-root": {
            color: "#F5F5F5",

        },
        "& .MuiPaper-elevation2": {
            boxShadow: "none",
        },
        "& .MuiTableCell-root": {
            border: "none",
            color: "white",
            fontSize: "12px",
            width: "unset !important"
        },
        "& .MuiTableSortLabel-root:hover": {
            color: "#F5F5F5",
        },
        "& .MuiTablePagination-root": {
            border: "none",
            color: "white",
        },
        "& .MuiPaper-root ": {
            backgroundColor: "#121212",
            color: "white",
        },
        "& .MuiInput-underline:before": {
            borderBottom: "1px solid #525252",
        },
        "& .MuiInput-underline:hover:before": {
            borderBottom: "1px solid #525252",
        },
        "& .MuiIconButton-root": {
            color: "#F5F5F5",
        },
        "& .MuiSvgIcon-root": {
            color: "#F5F5F5",
        },
        "& .MuiTypography-root": {
            color: "#F5F5F5",
        },
    },
    _tourdetailbar: {
        background: '#6F9CEB',
        width: '255px',
        height: '70px',
        position: 'absolute',
        right: 0,
        marginTop: '-240px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: ' space-around',
        color: 'black',
        "&::before": {
            content: '""',
            height: 0,
            width: 0,
            position: 'absolute',
            left: '46%',
            bottom: '-40px',
            border: '20px solid transparent',
            borderTopColor: '#6F9CEB',
            // borderRightColor: '#DA362A',
        }
    },
    _codetext: {
        fontSize: '15px',
    },
    _codedetail: {
        fontSize: '15px',
        fontWeight: 'bold',
    },
    _1F1F1F: {
        background: '#1F1F1F',
    },
    _525252: {
        background: '#525252',
    },
    _textalignright: {
        textAlign: 'right',

    },
    _edit: {
        background: '#6F9CEB',
        borderRadius: '50%',
        padding: '2px',
        width: '13px',
        height: '13px',
    },
    _pointer: {
        cursor: 'pointer'
    },
    _width111: '111px',
    _fontsize12: {
        fontSize: '12px',
        cursor: 'pointer'
    }
});
const CurrentTours = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const tableRef = useRef();
    const { t } = useTranslation("common");
    const routes = useSelector(selectCurrent);
    const [tabledata, settableData] = useState(routes)
    const loading = useSelector(selectRouteStatus);
    const myDivToFocus = useMemo(() => Array(tabledata.length).fill(0).map(i => React.createRef()), [tabledata.length]);

    useEffect(() => {
        if (!routes.length) {
            dispatch(getCurrentRoutes())

        }
        settableData(routes)
    }, [dispatch, routes])
    const scroll = (scrollOffset, rowData) => {
        myDivToFocus[rowData.tableData.id].current.scrollLeft += scrollOffset;
    };
    const markFavourite = (e, rowData) => {
        let newData = tableRef.current.state.data
        newData.map((item, index) => {
            if (index === rowData.tableData.id) {
                item.is_favourite = !item.is_favourite
                if (item.is_favourite) {
                    array_move(newData, index, 0)
                }
                else if (!item.is_favourite) {
                    array_move(newData, index, newData.length - 1)
                }
            }
            return item;
        })
        settableData(newData)


    }

    function array_move(arr, old_index, new_index) {
        if (new_index >= arr.length) {
            var k = new_index - arr.length + 1;
            while (k--) {
                arr.push(undefined);
            }
        }
        arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
        return arr;
    };
    if (loading) return <div className={clsx(classes._container, '')}><div className="loading">Loading..</div></div>;
    return (
        <div className={clsx(classes._container, '')}>
            <MaterialTable
                tableRef={tableRef}
                data={mapTableData(tabledata)}
                columns={getColumns(CURRENT_TOURS_COLUMNS(tableRef, markFavourite), t)}
                options={{
                    paging: false,
                    detailPanelColumnAlignment: 'right',
                    header: false,
                    searchFieldAlignment: "left",
                    showTitle: false,
                    cellStyle: {
                        color: 'white',
                        border: 'none',
                        font: 'normal normal normal 12px/24px Roboto',

                    },
                    rowStyle: rowData => {
                        if (rowData.tableData.id % 2 === 0) {
                            return { backgroundColor: ' #1F1F1F ' };
                        }
                        else {
                            return { backgroundColor: '#525252' };

                        }
                    }

                }}

                detailPanel={[
                    {

                        icon: () => <ExpandMoreIcon />,
                        openIcon: () => <ExpandLessIcon />,
                        render: rowData => {
                            return (
                                <div style={{ padding: '15px', background: rowData.tableData.id % 2 === 0 ? ' #1F1F1F ' : '#525252' }}>
                                    <div style={{ width: '5%', float: 'left', margin: '25px 0', textAlign: 'center' }}>
                                        <DoubleArrowIcon onClick={() => scroll(-12000, rowData)} className={classes._fontsize12} style={{ transform: 'rotate(180deg)' }} />
                                        <NavigateBeforeIcon onClick={() => scroll(-100, rowData)} className={classes._fontsize12} />
                                    </div>
                                    <div style={{ width: '5%', float: 'right', margin: '25px 0', textAlign: 'center' }}>
                                        <NavigateNextIcon onClick={() => scroll(100, rowData)} className={classes._fontsize12} />
                                        <DoubleArrowIcon onClick={() => scroll(12000, rowData)} className={classes._fontsize12} />
                                    </div>
                                    <div ref={myDivToFocus[rowData.tableData.id]} className={'hide-scrollbar'} style={{ maxWidth: '90%', overflow: 'scroll', scrollBehavior: 'smooth' }}>
                                        <div >
                                            <ProgressBar
                                                className={'margin-30'}
                                                percent={100}
                                                width={`${(rowData.Orders.length - 1) * 10}%`}
                                                height={2}
                                                filledBackground="#6F9CEB"
                                                unfilledBackground=""
                                            >
                                                {
                                                    rowData.Orders.map((data, index) => <Step transition="scale">
                                                        {({ accomplished }) => (
                                                            <div style={{ filter: `grayscale(${accomplished ? 0 : 40}%)` }}>
                                                                <div style={{ marginTop: '-14px', position: 'absolute', textAlign: "center", width: '100%' }}>{index}</div>

                                                                <div style={{ background: rowData.tableData.id % 2 === 0 ? ' #1F1F1F ' : '#525252' }} className={data.delivered_at !== null ? 'ball' : 'ball-open'}></div>
                                                                <div style={{
                                                                    position: 'absolute', marginTop: '5px', width: '50px', textOverflow: 'ellipsis',
                                                                    whiteSpace: 'nowrap',
                                                                    overflow: 'hidden',
                                                                }}>{data.description}</div>
                                                            </div>
                                                        )}
                                                    </Step>
                                                    )
                                                }
                                            </ProgressBar>
                                        </div>
                                    </div>
                                </div>

                            )
                        }

                    }
                ]}
            // icons={{ DetailPanel: () => <ExpandLessIcon /> }}
            // openIcon={{ DetailPanel: () => <ExpandMoreIcon /> }}
            />
        </div>
    )
}
export default CurrentTours;
