import React, { useEffect, useRef, useState } from "react";
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
import { CURRENT_ORDER_COLUMNS } from "constants/ui-constants"
import { getColumns, getActions } from "util/table-utils";
import { mapTableData } from "util/helpers";

//
import jsondata from './data.json'





const useStyles = makeStyles({
    _container: {
        backgroundColor: "#121212",
        padding: "60px 130px",
        minHeight: "100vh",
        "& .MuiPaper-elevation2": {
            boxShadow: "none",
        },
        "& .MuiTableCell-root": {
            border: "none",
            color: "white",
            fontSize: "12px",
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
    const tableRef = useRef();
    const myDivToFocus = useRef()
    const { t } = useTranslation("common");

    const classes = useStyles();

    //.current is verification that your element has rendered
    const scroll = (scrollOffset) => {

        myDivToFocus.current.scrollLeft += scrollOffset;
    };
    return (
        <div className={clsx(classes._container, '')}>
            <MaterialTable
                tableRef={tableRef}
                data={mapTableData(jsondata)}
                columns={getColumns(CURRENT_ORDER_COLUMNS(tableRef), t)}
                options={{
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
                        if (rowData.tableData.id % 2 == 0) {
                            return { backgroundColor: ' #1F1F1F ' };
                        }
                        else {
                            return { backgroundColor: '#525252' };
                        }
                    }

                }}

                detailPanel={[
                    {
                        icon: () => <ExpandLessIcon />,
                        openIcon: () => <ExpandMoreIcon />,
                        render: rowData => {
                            return (
                                <div style={{ padding: '15px', background: rowData.tableData.id % 2 == 0 ? ' #1F1F1F ' : '#525252' }}>
                                    <div style={{ width: '5%', float: 'left', margin: '25px 0', textAlign: 'center' }}>
                                        <DoubleArrowIcon onClick={() => scroll(-12000)} className={classes._fontsize12} style={{ transform: 'rotate(180deg)' }} />
                                        <NavigateBeforeIcon onClick={() => scroll(-100)} className={classes._fontsize12} />
                                    </div>
                                    <div style={{ width: '5%', float: 'right', margin: '25px 0', textAlign: 'center' }}>
                                        <NavigateNextIcon onClick={() => scroll(100)} className={classes._fontsize12} />
                                        <DoubleArrowIcon onClick={() => scroll(12000)} className={classes._fontsize12} />
                                    </div>
                                    <div ref={myDivToFocus} className={'hide-scrollbar'} style={{ maxWidth: '90%', overflow: 'scroll', scrollBehavior: 'smooth' }}>
                                        <div >
                                            <ProgressBar

                                                className={'margin-30'}
                                                percent={100}
                                                width={'150%'}
                                                height={2}
                                                filledBackground="#6F9CEB"
                                                unfilledBackground=""
                                            >
                                                {
                                                    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((data, index) => <Step transition="scale">
                                                        {({ accomplished }) => (
                                                            <div style={{ filter: `grayscale(${accomplished ? 0 : 40}%)` }}>
                                                                <div style={{ marginTop: '-14px', position: 'absolute', textAlign: "center", width: '100%' }}>{index}</div>
                                                                <div style={{ background: rowData.tableData.id % 2 == 0 ? ' #1F1F1F ' : '#525252' }} className={'ball-open'}></div>
                                                                <div style={{ position: 'absolute', marginTop: '5px' }}>Alias</div>
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