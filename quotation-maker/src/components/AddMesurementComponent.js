import React,{useState} from 'react';
import {Button,Table,Modal} from 'react-bootstrap';
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';



const AddMesurementComponent = ({ add, closePopup }) => {

    // mesurement table data array
    const [mesurementRows, setMesurementRows] = useState([
      { id: 1, height: '', width: '', pcs: '', sqFt: 0 },
      { id: 2, height: '', width: '', pcs: '', sqFt: 0  },
      { id: 3, height: '', width: '', pcs: '', sqFt: 0 },
      { id: 4, height: '', width: '', pcs: '', sqFt: 0  },
      { id: 5, height: '', width: '', pcs: '', sqFt: 0  },
      { id: 6, height: '', width: '', pcs: '', sqFt: 0 },
      { id: 7, height: '', width: '', pcs: '', sqFt: 0  },
      { id: 8, height: '', width: '', pcs: '', sqFt: 0 },
      { id: 9, height: '', width: '', pcs: '', sqFt: 0  },
      { id: 10, height: '', width: '', pcs: '', sqFt: 0  },
    ]);

    // tatal pcs
 const totalPcs = parseFloat(
  mesurementRows.reduce((sum, row) => sum + 1 * row.pcs, 0).toFixed(3)
);
 
 // total SqFt
 const totalSqFt = parseFloat(
  mesurementRows.reduce((sum, row) => sum + 1 * row.sqFt, 0).toFixed(3)
);

const [measurementType, setMeasurementType] = useState('');
const [otherOption, setOtherOption] = useState('');



const handleAdd = () => {

  add(mesurementRows, measurementType === 'other' ? otherOption : measurementType,totalPcs,totalSqFt);
};


  //change mesurement type
  const handleMeasurementTypeChange = (event) => {
    const value = event.target.value;
    setMeasurementType(value);
  
    if (value !== 'other') {
      setOtherOption('');
    }
  };
  

  //insert height,width and pcs
  const handleCellChange = (event, rowId, field) => {
    const value = event.target.value;

    const decimalRegex = /^\d+(\.\d{0,2})?$/;
    if (!decimalRegex.test(value) || Number(value) < 0) {
      return;
    }

    let updatedRows;
  
    if (field === 'height' || field === 'width' || field==='pcs') {
      const height = field === 'height' ? parseFloat(value) : mesurementRows[rowId - 1].height;
      const width = field === 'width' ? parseFloat(value) : mesurementRows[rowId - 1].width;
      const pcs = field === 'pcs' ? parseFloat(value) : mesurementRows[rowId - 1].pcs;
      const calculatedValue = ((height * width * pcs)/144).toFixed(3);
  
      updatedRows = mesurementRows.map((row) => {
        if (row.id === rowId) {
          return { ...row, [field]: value, sqFt: calculatedValue };
        }
        return row;
      });
    } else {
      updatedRows = mesurementRows.map((row) => {
        if (row.id === rowId) {
          return { ...row, [field]: value };
        }
        return row;
      });
    }
  
    setMesurementRows(updatedRows);
  };
  

  
 
  //add new row to the table
  const handleAddRow = () => {
    const newRow = { id: mesurementRows.length + 1, height: '', width: '', pcs: '', sqFt: 0 };
    setMesurementRows([...mesurementRows, newRow]);
  };


  return (
    

<Modal show={true} onHide={closePopup} size="m">
      <Modal.Body>
        <div>
        <div className='row'>
                    <div className='col' style={{ textAlign:'right' }}>
                    <IconButton onClick={closePopup}>
                      <CancelIcon />
                    </IconButton>
                    </div>
                </div>
                <div className='row'><div className='col' style={{ textAlign:'center' }}> <h5 style={{ textAlign: 'center' }}>Add Measurement</h5></div></div>
         
          <div className='row'>
  <div className='col' style={{ textAlign: 'center' }}>
    <select
      value={measurementType}
      onChange={handleMeasurementTypeChange}
    >
      <option value=''>Select Measurement Type</option>
      <option value='type1'>Type 1</option>
      <option value='type2'>Type 2</option>
      <option value='type3'>Type 3</option>
      <option value='other'>Other</option>
    </select>
    {measurementType === 'other' && (
      <input
        type='text'
        value={otherOption}
        onChange={(event) => setOtherOption(event.target.value)}
        placeholder='Enter measurement type'
      />
    )}
  </div>
</div>

<div className='row' style={{ margin: '5px', maxHeight: '400px', overflowY: 'scroll' }}>
          <Table striped bordered >
            <thead>
              <tr>
                <th style={{ width:'50px' }}>No</th>
                <th style={{ width:'80px' }}>Height</th>
                <th style={{ width:'80px' }}>Width</th>
                <th style={{ width:'80px' }}>Pcs</th>
                <th >SqFt</th>
              </tr>
            </thead>
            <tbody>
              {mesurementRows.map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>
                    <input
                      type="text"
                      value={row.height}
                      onChange={(event) => handleCellChange(event, row.id, 'height')}
                      style={{ textAlign:'right',width:'80px' }}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={row.width}
                      onChange={(event) => handleCellChange(event, row.id, 'width')}
                      style={{ textAlign:'right',width:'80px' }}
                    />
                  </td>
                  <td >
                    <input
                      type="text"
                      value={row.pcs}
                      onChange={(event) => handleCellChange(event, row.id, 'pcs')}
                      style={{ textAlign:'right',width:'80px'}}
                    />
                  </td>
                  <td  style={{ textAlign:'right'}}>{row.sqFt}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3">Total:</td>
                <td  style={{ textAlign:'right' }}>{totalPcs.toFixed(3)}</td>
                <td  style={{ textAlign:'right' }}>{totalSqFt.toFixed(3)}</td>
              </tr>
            </tfoot>
          </Table>
          </div>
          <div className='row'>
            <div className='col'>
              <Button variant="primary" onClick={handleAddRow} style={{ width: '150px' }}>
            + Add New Line
          </Button></div>
            <div className='col' style={{ textAlign:'right' }}>
            <Button onClick={handleAdd} style={{ width: '150px' }}>Submit</Button>
            </div>
          </div>
          
        </div>
      </Modal.Body>
      
    </Modal>
      
    
  );
};

export default AddMesurementComponent;
