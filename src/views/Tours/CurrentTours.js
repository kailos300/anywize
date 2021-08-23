import React, { useEffect, useRef, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
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
import { PATHS } from "util/appConstants";

//Actions
import { selectCurrent, selectRouteStatus, getCurrentRoutes, getRoute, selectRoute } from 'redux/slices/routeSlice';
import Loading from 'components/Shared/loading';

//assets
import arrow from '../../assets/img/arrow.svg'
import arrowpanel from '../../assets/img/arrow-panel.svg';

const useStyles = makeStyles({
	_container: {
		backgroundColor: "#121212",
		padding: "60px 130px",
		minHeight: "60vh",
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
		"& .MuiIconButton-root *.MuiSvgIcon-root , .MuiIconButton-root": {
			color: "#F5F5F5",
		},
		"& .MuiTableCell-alignLeft *.MuiSvgIcon-root": {
			color: "#ADADAD",
			width: '22px',
			height: '22px',
			cursor: 'pointer',
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
		cursor: 'pointer',
		height: '8px',
	}
});
const CurrentTours = () => {
	const classes = useStyles();
	const dispatch = useDispatch()
	const history = useHistory();
	const tableRef = useRef();
	const { t } = useTranslation("common");
	const routes = useSelector(selectCurrent);
	const route = useSelector(selectRoute);
	const [tabledata, settableData] = useState(routes)
	const loading = useSelector(selectRouteStatus);
	const myDivToFocus = useMemo(() => Array(tabledata.length).fill(0).map(i => React.createRef()), [tabledata.length]);

	useEffect(() => {
		if (!loading) {
			dispatch(getCurrentRoutes());
		}
	}, []);

	useEffect(() => {
		settableData(routes);
	}, [routes]);

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
	const redirectView = (order, rowData) => {
		history.push({ pathname: `${PATHS.tours.map}/${rowData.id}/${order.customer_id}` });
	}

	if (loading) {
		return <Loading />;
	}
	return (
		<div className={clsx(classes._container, '')}>
			{console.log(tabledata)}
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
						font: 'normal normal normal 18px/24px Roboto',
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
						icon: () => <img src={arrowpanel} style={{
							width: '22px',
							height: ' 10px',
							transform: ' rotate(180deg)'
						}} />,
						openIcon: () => <img src={arrowpanel} style={{
							width: '22px',
							height: ' 10px'
						}} />,
						render: rowData => {
							return (
								<div style={{ padding: '15px', background: rowData.tableData.id % 2 === 0 ? ' #1F1F1F ' : '#525252' }}>
									<>
										<div style={{ width: '5%', float: 'left', margin: '25px 0', textAlign: 'center' }}>
											<div style={{ display: 'inline-block' }} onClick={() => scroll(-12000, rowData)}>
												<img src={arrow} className={classes._fontsize12} style={{ transform: 'rotate(180deg)' }} />
												<img src={arrow} className={classes._fontsize12} style={{ transform: 'rotate(180deg)' }} />
											</div>
											<img src={arrow} onClick={() => scroll(-100, rowData)} className={classes._fontsize12} style={{ marginLeft: '15px', transform: 'rotate(180deg)' }} />
										</div>
										<div style={{ width: '5%', float: 'right', margin: '25px 0', textAlign: 'center' }}>
											<img style={{ marginRight: '15px', }} src={arrow} onClick={() => scroll(12000, rowData)} className={classes._fontsize12} />
											<div style={{ display: 'inline-block' }} onClick={() => scroll(100, rowData)}>
												<img src={arrow} className={classes._fontsize12} />
												<img src={arrow} className={classes._fontsize12} />
											</div>
										</div>
										<div ref={myDivToFocus[rowData.tableData.id]} className={'hide-scrollbar'} style={{ maxWidth: '90%', overflow: 'scroll', scrollBehavior: 'smooth' }}>
											<div >
												<ProgressBar
													className={'margin-30'}
													percent={100}
													width={`${(rowData.pathway.length - 1) * 10}%`}
													height={2}
													filledBackground="#6F9CEB"
													unfilledBackground=""
												>
													{rowData.pathway.map((data, index) => (
														<Step transition="scale">
															{({ accomplished }) => (
																<div style={{ filter: `grayscale(${accomplished ? 0 : 40}%)` }}>
																	<div style={{ marginTop: '-14px', position: 'absolute', textAlign: "center", width: '100%' }}>{index + 1}</div>
																	{console.log(data.Orders.every((o) => o.delivered_at), data.Orders)}

																	<div onClick={() => redirectView(data, rowData)} style={{ background: rowData.tableData.id % 2 == 0 ? ' #1F1F1F ' : '#525252' }} className={
																		(data.Orders.every((o) => o.delivered_at) && !data.goods_back) ? 'ball' :
																			(data.Orders.every((o) => o.delivered_at) && data.goods_back) ? 'red-ball' : data.Orders.every((o) => o.delivered_at) ? 'ball-open' : 'ball-open'
																	}></div>
																	<div style={{
																		position: 'absolute',
																		marginTop: '5px',
																		width: '100px',
																		textOverflow: 'ellipsis',
																		whiteSpace: 'nowrap',
																		overflow: 'hidden',
																	}}>{!data.alias ? data.name : data.alias}</div>
																</div>
															)}
														</Step>
													))
													}
												</ProgressBar>
											</div>
										</div>
									</>
								</div>

							)
						}

					}
				]}
			/>
		</div>
	)
}
export default CurrentTours;
