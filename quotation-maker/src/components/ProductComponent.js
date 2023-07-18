import React from 'react';
import { Table } from 'react-bootstrap';

const ProductComponent = (props) => {
  const products = props.selectedProducts;

  

  return (

    <div>
        <div className='row'>
            <div className='col' style={{ textAlign:'center' }}>
            <h3>Sciencetific Data</h3>
            </div>
        </div>
        <div className='row'> 
    <Table striped bordered>
      <tbody>
        <tr>
          <th>Name</th>
          {products.map(product => (
            <td key={product.id}>{product.name}</td>
          ))}
        </tr>
        <tr>
          <th>Visible Light Transmittance</th>
          {products.map(product => (
            <td key={product.id}>{product.transmittance}%</td>
          ))}
        </tr>
        <tr>
          <th>Heat Loss/Visible Light Reflextive Exterior </th>
          {products.map(product => (
            <td key={product.id}>{product.exterior}%</td>
          ))}
        </tr>
        <tr>
          <th>Heat Gain/Visible Light Reflextive Interior </th>
          {products.map(product => (
            <td key={product.id}>{product.interior}%</td>
          ))}
        </tr>
      </tbody>
    </Table>
    </div>
    </div>
  );
};

export default ProductComponent;
