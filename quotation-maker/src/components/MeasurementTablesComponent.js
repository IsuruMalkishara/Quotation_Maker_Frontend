import React from 'react';
import { Table } from 'react-bootstrap';

const MeasurementTableComponent = (props) => {
  const measurementTables = props.mesurementTables;

  const renderTables = () => {
    console.warn(measurementTables);
    let tableComponents = [];
    let rowComponents=[];
    let rowTables=[];
    let rowCount=0;

    for (let i = 0; i < measurementTables.length; i++) {
      const id = measurementTables[i].id;
      const type = measurementTables[i].type;
      const table = measurementTables[i].table;
      const totalPcs = measurementTables[i].totalPcs;
      const totalSqFt = measurementTables[i].totalSqFt;
     
      


      
      const tableRows = table.slice(0, 10).map((item, index) => {
        return (
          <tr key={index}>
            <td>{item.id}</td>
            <td style={{ textAlign:'right' }}>{item.height}</td>
            <td style={{ textAlign:'right' }}>{item.width}</td>
            <td style={{ textAlign:'rigth' }}>{item.pcs}</td>
            <td style={{ textAlign:'right' }}>{item.sqFt}</td>
          </tr>
        );
      });
     
      const tableComponent = (
        <div  style={{ flex: '33%', padding: '10px' }}>
          <div className='row'>
            <div className='col' style={{ textAlign:'center' }}><h6>Measurement Type: {type}</h6></div>
          </div>
          
          <Table striped bordered>
            <thead>
              <tr>
                <th>Number</th>
                <th>Height</th>
                <th>Width</th>
                <th>Pcs</th>
                <th>SqFt</th>
              </tr>
            </thead>
            <tbody>{tableRows}</tbody>
            {measurementTables[i].table.length === 10 && ( // Add the total row only to the last table
              <tfoot>
                <tr>
                  <td colSpan="3">Total:</td>
                  <td style={{ textAlign:'right' }}>{totalPcs.toFixed(3)}</td>
                  <td style={{ textAlign:'right' }}>{totalSqFt.toFixed(3)}</td>
                </tr>
              </tfoot>
            )}
          </Table>
        </div>
      );

      tableComponents.push(tableComponent);

      // Split the remaining rows into multiple tables if there are more than 10 rows
      if (table.length > 10) {
        const remainingRows = table.slice(10);
        const remainingTables = splitRowsIntoTables(remainingRows, type,totalPcs,totalSqFt,measurementTables[i].table.length);
        tableComponents.push(...remainingTables);
      }
    }

    for(let j=0;j<tableComponents.length;j++){
      rowTables.push(<div className='col-4'  key={j}>{tableComponents[j]}</div>);
      if( j===tableComponents.length-1){
        
        rowComponents.push(<div  className='row' id='rowCount' key={rowCount}>{rowTables}</div>);
        rowCount++;
        rowTables=[];
      }
    }
    console.warn("length "+rowComponents.length);
    console.warn("row count "+rowCount);
    return rowComponents;
  };

  // Helper function to split rows into tables with a maximum of 10 rows per table
  const splitRowsIntoTables = (rows, type,totalPcs,totalSqFt,length) => {
   
    const tables = [];
    let currentTableRows = [];

    for (let i = 0; i < rows.length; i++) {
      const item = rows[i];
     
      currentTableRows.push(
        <tr key={i}>
          <td >{item.id}</td>
          <td style={{ textAlign:'right' }}>{item.height}</td>
          <td style={{ textAlign:'right' }}>{item.width}</td>
          <td style={{ textAlign:'right' }}>{item.pcs}</td>
          <td style={{ textAlign:'right' }}>{item.sqFt}</td>
        </tr>
      );

      if ((i + 1) % 10 === 0 || i === rows.length - 1) {
        
        const tableId = `${type}_${Math.floor(i / 10)}`;
        const tableComponent = (
          <div  style={{ flex: '33%', padding: '10px' }}>
            <div className='row'>
            <div className='col' style={{ textAlign:'center' }}>
            <h6>Measurement Type: {type} (Continued)</h6>
            </div>
            </div>
            <Table striped bordered>
              <thead>
                <tr>
                  <th>Number</th>
                  <th>Height</th>
                  <th>Width</th>
                  <th>Pcs</th>
                  <th>SqFt</th>
                </tr>
              </thead>
              <tbody>{currentTableRows}</tbody>
              {length === i+11 && ( // Add the total row only to the last table
              <tfoot>
                <tr>
                  <td colSpan="3">Total:</td>
                  <td style={{ textAlign:'right' }}>{totalPcs.toFixed(3)}</td>
                  <td style={{ textAlign:'right' }}>{totalSqFt.toFixed(3)}</td>
                </tr>
              </tfoot>
            )}
            </Table>
          </div>
        );

        tables.push(tableComponent);
        currentTableRows = [];
      }
    }

    return tables;
  };

  return <div style={{ display: 'flex' }}>
  {renderTables()}
    </div>;
};

export default MeasurementTableComponent;
