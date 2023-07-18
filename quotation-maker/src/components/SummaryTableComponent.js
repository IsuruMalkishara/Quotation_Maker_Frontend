import React from 'react';
import { Table } from 'react-bootstrap';

const SummaryTableComponent = ({ grand, advanced, balanced }) => {
  return (
    <Table striped bordered>
      
      <tbody>
        <tr>
          <td>Grand</td>
          <td style={{ textAlign:'right' }}>{grand}</td>
        </tr>
        <tr>
          <td>Advanced</td>
          <td style={{ textAlign:'right' }}>{advanced}</td>
        </tr>
        <tr>
          <td>Balanced</td>
          <td style={{ textAlign:'right' }}>{balanced}</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default SummaryTableComponent;
