import React, { useState,useEffect } from 'react';
import { Form,Table,Button } from 'react-bootstrap';
import '../styles/QuotationPage.css';
import Logo from '../assets/logo.png';
import CustomerService from '../services/CustomerService';
import QuotationTableComponent from '../components/QuotationTableComponent';

function QuotationPage() {

    const currentDate = new Date().toLocaleDateString();

    const [customerName,setCustomerName]=useState('');
    const [position,setPosition]=useState('');
    const [address,setAddress]=useState('');
    const [email,setEmail]=useState('');
    const [phone,setPhone]=useState('');

    const [quotationDescription,setQuotationDescription]=useState('');
    const [organizationName,setOrganizationName]=useState('');
    const [referenceNumber,setReferenceNumber]=useState();
    const [productDescription,setProductDescription]=useState('');


    useEffect(() => {
        getReferenceNumber();
      }, []);

    //get reference number
    const getReferenceNumber=()=>{
        CustomerService.getReferenceNumber().then(res=>{
            console.warn(res.data);
            setReferenceNumber(res.data);
        }
            
            )
    }

    

  return (
    <div className='quotation'>
        <div className='quotation-content'>
        <div className='row'>
            <div className='col-6' style={{ textAlign:'left' }}>
               
                <Form.Group controlId="date" style={{ margin:'5px' }}>
            <div className='row'>
                <div className='col-4'>
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
                <div className='col-4'>
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
                <div className='col-4'>
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
                <div className='col-4'>
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
                <div className='col-4'>
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
                <div className='col-4'>
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

                <img src={Logo} alt="Logo" width="150px" height="100px" style={{ margin:'5px' }}/>
            </div>
        </div>

        <div className='row'>
            {/* quotation description field */}
           <div className='col-4'>
           <Form.Group controlId="quotationDescription" style={{ margin:'5px' }}>
      
               
                <Form.Control
          type="text"
          placeholder="Enter Quotation Description"
          value={quotationDescription}
          onChange={(event) => setQuotationDescription(event.target.value)}
        />
                      
      </Form.Group>
           </div>
            {/* reference number + organization */}
           <div className='col-8' style={{ textAlign:'right' }}>
           <Form.Group controlId="organization" style={{ margin:'5px' }}>
      <div className='row' >
                <div className='col-5'>
                <Form.Label>Reference Number: {referenceNumber}</Form.Label>
                </div>
                <div className='col-7'>
                <Form.Control
          type="text"
          placeholder="Enter organization name"
          value={organizationName}
          onChange={(event) => setOrganizationName(event.target.value)}
        />
                </div>
            </div>
       
        
      </Form.Group>
           </div>
        </div>

        <div className='row'>
            {/* product description */}
            <div className='col'>
            <Form.Group controlId="quotationDescription" style={{ margin:'5px' }}>
      
               
      <Form.Control
       type="text"
       placeholder="Enter Product Description"
       value={productDescription}
       onChange={(event) => setProductDescription(event.target.value)}
       />
            
</Form.Group>
            </div>
        </div>
{/* quotation table */}

<div className='row'>
    <div className='col' style={{ margin:'5px' }}>
      <QuotationTableComponent/>
      </div>
</div>



     </div>
    </div>
  )
}

export default QuotationPage
