import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import MaterialTable from 'material-table';
import { useTranslation } from 'react-i18next';
import { PATHS } from 'util/appConstants';

//helpers
import { CURRENT_TOURS_COLUMNS } from 'constants/ui-constants'
import { getColumns, getLocalization } from "util/table-utils";
import { mapTableData } from 'util/helpers';
import Loading from 'components/Shared/loading';
import TableExpansionPanel from 'components/Routes/TableExpansionPanel';

import { selectCompleted, selectRouteStatus, getFinisedRoutes } from 'redux/slices/routeSlice';
import arrowpanel from '../../assets/img/arrow-panel.svg';

const useStyles = makeStyles({
	_container: {
		backgroundColor: '#121212',
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
});

const RecentTours = () => {
	const classes = useStyles();
	const history = useHistory();
	const dispatch = useDispatch()
	const tableRef = useRef();
	const { t } = useTranslation();
	const routes = useSelector(selectCompleted);
	const [tabledata, settableData] = useState(routes)
	const loading = useSelector(selectRouteStatus);
	const myDivToFocus = useMemo(() => Array(tabledata.length).fill(0).map(i => React.createRef()), [tabledata.length]);

	useEffect(() => {
		if (!loading) {
			dispatch(getFinisedRoutes());
		}
	}, []); // eslint-disable-line

	useEffect(() => {
		settableData(routes);
	}, [routes]);

	const scroll = (scrollOffset, rowData) => {
		myDivToFocus[rowData.tableData.id].current.scrollLeft += scrollOffset;
	};

	const redirectView = (pathway, rowData) => {
		if (!pathway) {
			return history.push({ pathname: `${PATHS.tours.map}/${rowData.id}` });
		}

		history.push({ pathname: `${PATHS.tours.map}/${rowData.id}/${pathway.id}` });
	};

	if (loading) {
		return (
			<Loading />
		);
	}

	return (
		<div className={clsx(classes._container, '')}>
			<MaterialTable
				tableRef={tableRef}
				data={mapTableData(tabledata)}
				localization={getLocalization(t)}
				columns={getColumns(CURRENT_TOURS_COLUMNS(tableRef, null, redirectView, t), t)}
				options={{
					pageSize: 50,
					pageSizeOptions: [50, 100],
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
						icon: () => <img alt="icon" src={arrowpanel} style={{
							width: '22px',
							height: ' 10px',
							transform: ' rotate(180deg)'
						}} />,
						openIcon: () => <img alt="icon" src={arrowpanel} style={{
							width: '22px',
							height: ' 10px'
						}} />,
						render: rowData => {
							return (
								<TableExpansionPanel
									{...{
										rowData, scroll, redirectView, myDivToFocus,
									}}
								/>
							);
						}
					}
				]}
			/>
		</div>
	)
}
export default RecentTours;
