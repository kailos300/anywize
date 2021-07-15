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

export const getActions = (tableTitle, callbackOnDelete, addHandler) => {
  let actions = [];
  actions.push(
    //   {
    //   icon: 'delete',
    //   tooltip: 'Delete',
    //   position: 'row',
    //   onClick: callbackOnDelete,
    // },
    {
      icon: "add",
      tooltip: "Add",
      iconProps: { style: { color: "#ADADAD", background: "#1F1F1F" } },
      isFreeAction: true,
      onClick: addHandler,
    }
  );

  return actions;
};
