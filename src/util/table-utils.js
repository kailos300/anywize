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


export const getActions = (tableTitle, callbackOnDelete, addHandler, editHandler) => {
  let actions = [];
  if (tableTitle == 'ORDERS') {
    actions.push(
      {
        icon: 'add',
        tooltip: 'Add',
        iconProps: { style: { color: "#ADADAD", background: '#1F1F1F' } },
        isFreeAction: true,
        onClick: addHandler,
        position: "row"
      },

      {
        icon: 'edit',
        tooltip: 'edit',
        // iconProps: { style: { color: "#ADADAD", background: '#1F1F1F' } },
        onClick: editHandler,
        position: "row"
      },
      {
        icon: 'delete',
        tooltip: 'Delete',
        position: 'row',
        onClick: callbackOnDelete,
      },
      {
        icon: () => { return (<><span style={{ fontSize: '18px', color: '#6F9CEB' }}>Start Tour/s</span> <PlayCircleOutlineIcon style={{ marginLeft: '10px', color: '#6F9CEB', height: '22px', width: '22px' }} /></>) },
        tooltip: 'Start Tours',
        iconProps: { style: { color: "#ADADAD", background: '#1F1F1F' } },
        isFreeAction: true,
        // onClick: addHandler,
        position: "row"
      },
    );
    return;
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
