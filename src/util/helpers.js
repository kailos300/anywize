/**
 * Map redux data to a new array compatible
 * with material-table props.
 * https://stackoverflow.com/questions/65396030/using-material-table-with-redux-state
 * @param data
 */
 export const mapTableData = (data) => data.map(item => Object.assign({}, item));