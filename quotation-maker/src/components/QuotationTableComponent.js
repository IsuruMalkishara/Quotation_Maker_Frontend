import React, { useContext,useState,useEffect ,useImperativeHandle, forwardRef} from 'react';
import { Table, Button } from 'react-bootstrap';
import SummaryTableComponent from './SummaryTableComponent';
import { DataContext } from '../context/DataContext';

const QuotationTableComponent = forwardRef( (props,ref)=> {

  

    // quotation table data array
  const [rows, setRows] = useState([
    { id: 1, description: '', rate: '', qty: '', value: 0 },
    { id: 2, description: '', rate: '', qty: '', value: 0 },
    { id: 3, description: '', rate: '', qty: '', value: 0 },
    { id: 4, description: '', rate: '', qty: '', value: 0 },
    { id: 5, description: '', rate: '', qty: '', value: 0 },
  ]);

  const { dispatch } = useContext(DataContext);

 // tatal Qty/SqFt
 const totalQty = parseFloat(
  rows.reduce((sum, row) => sum + 1 * row.qty, 0).toFixed(2)
);
 
 // total value in RS
 const totalValue = parseFloat(
  rows.reduce((sum, row) => sum + 1 * row.value, 0).toFixed(2)
);

 // summary table data
 const grandTotal = parseFloat(
   rows.reduce((sum, row) => sum + 1 * row.value, 0).toFixed(2)
 );
 const advancedTotal = parseFloat((grandTotal * 0.8).toFixed(2));
 const balancedTotal = parseFloat((grandTotal - advancedTotal).toFixed(2));

 
 useEffect(() => {
  
  const fetchedData = {
    totalQty: totalQty,
    grandTotal: grandTotal,
    advancedTotal:advancedTotal,
    balancedTotal:balancedTotal,
    tableData: rows,
  };


  dispatch({ type: 'UPDATE_QUOTATION_DATA', payload: fetchedData });
}, [dispatch, totalQty,grandTotal, advancedTotal,balancedTotal, rows]);

useImperativeHandle(ref, () => ({
  add: add ,
  addProducts: addProducts 
}));



  //insert description to array
  const handleDescriptionCellChange = (event, rowId) => {
    const value = event.target.value;

    //update description cell
    const updatedRows = rows.map((row) => {
      if (row.id === rowId) {
        return { ...row, description: value };
      }
      return row;
    });
    setRows(updatedRows);
  };

  
  //insert rate and qty to array
  const handleCellChange = (event, rowId, field) => {
    const value = event.target.value;
  
    const decimalRegex = /^\d+(\.\d{0,2})?$/;
    if (!decimalRegex.test(value) || Number(value) < 0) {
      return;
    }
  
    let updatedRows;
  
    if (field === 'rate' || field === 'qty') {
      const rate = field === 'rate' ? parseFloat(value) : rows[rowId - 1].rate;
      const qty = field === 'qty' ? parseFloat(value) : rows[rowId - 1].qty;
      const calculatedValue = (rate * qty).toFixed(2);
  
      updatedRows = rows.map((row) => {
        if (row.id === rowId) {
          return { ...row, [field]: value, value: calculatedValue };
        }
        return row;
      });
    } else {
      updatedRows = rows.map((row) => {
        if (row.id === rowId) {
          return { ...row, [field]: value };
        }
        return row;
      });
    }
  
    setRows(updatedRows);
  };
  
  
 
  //add new row to the table
  const handleAddRow = () => {
    const newRow = { id: rows.length + 1, description: '', rate: '', qty: '', value: 0 };
    setRows([...rows, newRow]);
  };

  //add mesurement data to row
  const add=(measurementType,totalSqFt)=>{
    
    console.warn("New mesurement added to the quotation table");
    console.warn(measurementType);
    let lastDataInsertedRowId=-1;
   
    for(let i=0;i<rows.length;i++){
      if(rows[i].description!=='' || rows[i].rate!=='' || rows[i].qty!==''){
       lastDataInsertedRowId=i;
      }
      console.warn("row: "+lastDataInsertedRowId); 
    }
    console.warn("last data insert row: "+lastDataInsertedRowId);

    if(lastDataInsertedRowId===rows.length-1){
     
      const newRow = { id: rows.length+1, description: '', rate: '', qty: '', value: 0 };
    setRows([...rows, newRow]);

    // Assign measurementType and totalSqFt to the new row
    const updatedRows = [...rows, newRow].map((row) => {
      if (row.id === rows.length+1 ) {
        return { ...row, description: measurementType, qty: totalSqFt };
      }
      return row;
    });

    setRows(updatedRows);

    }else{
       
      const updatedRows = rows.map((row) => {
        if (row.id === lastDataInsertedRowId+2) {
          return { ...row, description: measurementType, qty: totalSqFt };
        }
        return row;
      });
  
      setRows(updatedRows);
    }



  }

  //add product
  const addProducts=(selectedProducts)=>{
    
    console.warn("New product added to the quotation table");
    console.warn(selectedProducts);
    for(let j=0;j<selectedProducts.length;j++){
    let lastDataInsertedRowId=-1;
   
    for(let i=0;i<rows.length;i++){
      if(rows[i].description!=='' || rows[i].rate!=='' || rows[i].qty!==''){
       lastDataInsertedRowId=i;
      }
      console.warn("row: "+lastDataInsertedRowId); 
    }
    console.warn("last data insert row: "+lastDataInsertedRowId);

    if(lastDataInsertedRowId===rows.length-1){
     
      const newRow = { id: rows.length+1, description: '', rate: '', qty: '', value: 0 };
    setRows([...rows, newRow]);

    // Assign measurementType and totalSqFt to the new row
    const updatedRows = [...rows, newRow].map((row) => {
      if (row.id === rows.length+1 ) {
        return { ...row, description: selectedProducts[j].name };
      }
      return row;
    });

    setRows(updatedRows);

    }else{
       
      const updatedRows = rows.map((row) => {
        if (row.id === lastDataInsertedRowId+2) {
          return { ...row, description: selectedProducts[j].name };
        }
        return row;
      });
  
      setRows(updatedRows);
    }

  }

  }

  return (
    <div>
      <Table striped bordered>
        <thead>
          <tr>
            <th>No</th>
            <th>Description</th>
            <th>Rate Rs</th>
            <th>Qty/SqFt</th>
            <th>Value in Rs</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>
                <input
                  type="text"
                  value={row.description}
                  onChange={(event) => handleDescriptionCellChange(event, row.id, 'description')}
                  style={{ textAlign:'center',width:'100%' }}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.rate}
                  onChange={(event) => handleCellChange(event, row.id, 'rate')}
                  style={{ textAlign:'right',width:'100%' }}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.qty}
                  onChange={(event) => handleCellChange(event, row.id, 'qty')}
                  style={{ textAlign:'right' ,width:'100%'}}
                />
              </td>
              <td>
              <input
                  type="text"
                  value={row.value}
                  onChange={(event) => handleCellChange(event, row.id, 'value')}
                  style={{ textAlign:'right',width:'100%' }}
                />
                </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3">Total:</td>
            <td style={{ textAlign:'right' }}>{totalQty.toFixed(2)}</td>
            <td style={{ textAlign:'right' }}>{totalValue.toFixed(2)}</td>
          </tr>
        </tfoot>
      </Table>
      <Button id='button' variant="primary" onClick={handleAddRow} style={{ width: '200px' }}>
        + Add New Line
      </Button>

      {/* summary table */}
      <div style={{ marginTop:'20px' }}>
      <SummaryTableComponent 
      grand={grandTotal.toFixed(2)}
      advanced={advancedTotal.toFixed(2)}
      balanced={balancedTotal.toFixed(2)} />
      </div>
    </div>
  );
});

export default QuotationTableComponent;
