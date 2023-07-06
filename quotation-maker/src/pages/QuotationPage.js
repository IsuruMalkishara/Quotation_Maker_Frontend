import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import '../styles/QuotationPage.css';
import Logo from '../assets/logo.png';

function QuotationPage() {

    const currentDate = new Date().toLocaleDateString();

    const [customerName,setCustomerName]=useState('');
    const [position,setPosition]=useState('');
    const [address,setAddress]=useState('');
    const [email,setEmail]=useState('');
    const [phone,setPhone]=useState('');

  return (
    <div className='quotation'>
        <div className='row'>
            <div className='col-6' style={{ textAlign:'left' }}>
               
                <Form.Group controlId="date" style={{ margin:'5px' }}>
            <div className='row'>
                <div className='col-3'>
                <Form.Label>Date: </Form.Label>
                </div>
                <div className='col-4'>
                <Form.Control
          type="text"
          value={currentDate}
        
        />
                </div>
            </div>
       
        
      </Form.Group>
                {/* cutomer details */}
        <Form.Group controlId="name" style={{ margin:'5px' }}>
            <div className='row'>
                <div className='col-3'>
                <Form.Label>Name: </Form.Label>
                </div>
                <div className='col-4'>
                <Form.Control
          type="text"
          placeholder="Enter customer name"
          value={customerName}
          onChange={(event) => setCustomerName(event.target.value)}
        />
                </div>
            </div>
       
        
      </Form.Group>
      <Form.Group controlId="position" style={{ margin:'5px' }}>
      <div className='row' >
                <div className='col-3'>
                <Form.Label>Position: </Form.Label>
                </div>
                <div className='col-4'>
                <Form.Control
          type="text"
          placeholder="Enter customer position"
          value={position}
          onChange={(event) => setPosition(event.target.value)}
        />
                </div>
            </div>
       
      </Form.Group>
      <Form.Group controlId="addrss" style={{ margin:'5px' }}>
      <div className='row' >
                <div className='col-3'>
                <Form.Label>Address: </Form.Label>
                </div>
                <div className='col-4'>
                <Form.Control
          type="text"
          placeholder="Enter address"
          value={address}
          onChange={(event) => setAddress(event.target.value)}
        />
                </div>
            </div>
        
        
      </Form.Group>
      <Form.Group controlId="phone" style={{ margin:'5px' }}>
      <div className='row' >
                <div className='col-3'>
                <Form.Label>Contact Number: </Form.Label>
                </div>
                <div className='col-4'>
                <Form.Control
          type="text"
          placeholder="Enter contact number"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
        />
                </div>
            </div>
       
        
      </Form.Group>
      <Form.Group controlId="email" style={{ margin:'5px' }}>
      <div className='row' >
                <div className='col-3'>
                <Form.Label>Email Address: </Form.Label>
                </div>
                <div className='col-4'>
                <Form.Control
          type="text"
          placeholder="Enter email address"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
                </div>
            </div>
       
        
      </Form.Group>
            </div>
            <div className='col-6' style={{ textAlign:'right' }}>
                {/* logo */}

                <img src={Logo} alt="Logo" width="150px" height="100px" style={{ margin:'15px' }}/>
            </div>
        </div>

        <div className='row'>
           
        </div>
     
    </div>
  )
}

export default QuotationPage
