import React, { useState, useEffect } from 'react';
import { Button, Card, Form, Modal } from 'react-bootstrap';
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';
import ProductService from '../services/ProductService';

const AddProductsComponent = ({ addProducts, products, closeAddProductsPopup }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState(products);

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = () => {
    ProductService.getProducts().then(res => {
      console.warn(res.data);
      setAllProducts(res.data);
    });
  };

  const handleAdd = () => {
console.warn(selectedProducts);
    addProducts(selectedProducts);
  };

  const handleCheckboxChange = (id) => {
    const product = allProducts.find((product) => product.id === id);
    if (product) {
      const isAlreadySelected = selectedProducts.some((selectedProduct) => selectedProduct.id === product.id);
      if (isAlreadySelected) {
        // Deselect the card
        const updatedSelectedProducts = selectedProducts.filter((selectedProduct) => selectedProduct.id !== product.id);
        setSelectedProducts(updatedSelectedProducts);
      } else {
        // Select the card
        setSelectedProducts([...selectedProducts, product]);
      }
    }
  };

  return (
    <Modal show={true} onHide={closeAddProductsPopup} size="m">
      <Modal.Body>
      <div className='row'>
                    <div className='col' style={{ textAlign:'right' }}>
                    <IconButton onClick={closeAddProductsPopup}>
                      <CancelIcon />
                    </IconButton>
                    </div>
                </div>
        <div className="row">
          <div className="col" style={{ textAlign: 'center' }}>
            <h3>Add Products</h3>
          </div>
        </div>
        <div className="row">
          {allProducts.map((product) => (
            <div className="col-md-4" key={product.id}>
              <Card>
                <Card.Body>
                <Form.Check
                    type="checkbox"
                    checked={selectedProducts.some((selectedProduct) => selectedProduct.id === product.id)}
                    onChange={() => handleCheckboxChange(product.id)}
                  />
                  <Card.Title>{product.name}</Card.Title>
                  
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleAdd} style={{ width:'150px' }}>Submit</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddProductsComponent;
