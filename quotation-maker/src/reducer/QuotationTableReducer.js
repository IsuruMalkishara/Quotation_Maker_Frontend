export const initialState = {
    totalQty: 0,
    grandTotal:0,
    advancedTotal: 0,
    balancedTotal:0,
    tableData: [],
  };
  
  export const reducer = (state, action) => {
    switch (action.type) {
      case 'UPDATE_QUOTATION_DATA':
        return {
          ...state,
          totalQty: action.payload.totalQty,
          grandTotal:action.payload.grandTotal,
          advancedTotal: action.payload.advancedTotal,
          balancedTotal:action.payload.balancedTotal,
          tableData: action.payload.tableData,
        };
      default:
        return state;
    }
  };
  