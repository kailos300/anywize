import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
export const getColumns = (columns, t) => {
  let updatedColumns = [];
  for (let column of columns) {
    updatedColumns.push({
      title: t(column.title),
      field: column.field,
      render: column.render
    });
  }

  return updatedColumns;
};


export const getActions = (tableTitle, callbackOnDelete, addHandler, editHandler, startTour) => {
  let actions = [];
  if (tableTitle == 'ORDERS') {
    actions.push(
      {
        icon: () => { return (<><span style={{ fontSize: '16px', fontWeight: 'normal', color: startTour() ? '#6F9CEB' : '#ADADAD' }}>Start Tour/s</span> <PlayCircleOutlineIcon style={{ marginLeft: '10px', color: startTour() ? '#6F9CEB' : '#ADADAD', height: '22px', width: '22px', marginRight: '15px' }} /></>) },
        tooltip: 'Start Tours',
        iconProps: { style: { color: "#ADADAD", background: '#1F1F1F' } },
        isFreeAction: true,
        // onClick: addHandler,
        position: "row"
      },
      {
        icon: 'add',
        tooltip: 'Add',
        iconProps: { style: { color: "#ADADAD", background: '#1F1F1F' } },
        isFreeAction: true,
        onClick: addHandler,
        position: "row"
      },

    );
    return actions;
  }
  actions.push(
    {
      icon: 'add',
      tooltip: 'Add',
      iconProps: { style: { color: "#ADADAD", background: '#1F1F1F' } },
      isFreeAction: true,
      onClick: addHandler,
      position: "row"
    },

  );


  return actions;
};
