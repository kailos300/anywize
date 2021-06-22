export const getColumns = (columns, t) => {
  let updatedColumns = [];
  for (let column of columns) {
    updatedColumns.push({
      title: t(column.title),
      field: column.field,
    });
  }

  return updatedColumns;
};


export const getActions = (tableTitle ,callbackOnDelete) => {
  let actions = [];
  actions.push({
    icon: 'delete',
    tooltip: 'Delete',
    position: 'row',
    onClick: callbackOnDelete,
  });


  return actions;
};