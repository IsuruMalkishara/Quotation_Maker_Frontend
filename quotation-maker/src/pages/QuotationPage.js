import React, { useState,useEffect } from 'react';
import { Form,Button,Alert } from 'react-bootstrap';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
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

    const [loader, setLoader] = useState(false);

    const [error,setError]=useState('');


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
// download pdf and save customer data
const downloadAsPDF = () => {
  const capture = document.querySelector('.quotation-content');
  const buttons = capture.querySelectorAll('button');
  const alerts = capture.querySelectorAll('.alert');

  if(!customerName){
    setError('Customer Name is required.');
    return;
  }else if(!address){
    setError(' Address is required.');
    return;
  }else if(!phone){
    setError(' Contact number is required.');
    return;
  }else if (!validatePhoneNumber(phone)) {
    setError('Invalid Contact Number.');
    return;
  }else if(!email){
    setError('Email Address is required.');
    return;
  }else if (!validateEmail(email)) {
    setError('Invalid Email Address.');
    return;
  }else{

      const customer={
        "name":customerName,
        "position":position,
        "address":address,
        "phone":phone,
        "email":email
      }

      try {
        console.warn(customer);
        //save customer data
        const response =  CustomerService.addCustomer(customer);
        console.warn(response.data);
      } catch (error) {
        console.error('Error:', error);
      }

 
//hide alert
alerts.forEach((alert)=>{
  alert.style.display='none';
})

  // Hide all buttons
  buttons.forEach((button) => {
    button.style.display = 'none';
  });

  

  setLoader(true);
  //download pdf
  html2canvas(capture).then((canvas)=>{
    const imgData = canvas.toDataURL('img/png');
    const doc = new jsPDF('p', 'mm', 'a4');
    const componentWidth = doc.internal.pageSize.getWidth();
    const componentHeight = doc.internal.pageSize.getHeight();
    doc.addImage(imgData, 'PNG', 0, 0, componentWidth, componentHeight);
    setLoader(false);
    doc.save(`${organizationName}_quotation.pdf`);

    // Restore the display style of the buttons
    buttons.forEach((button) => {
      button.style.display = '';
    });
  })
    }

  };
  
   // Email validation using regex
const validateEmail = (email) => {
  const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
}; 

//contact number validation
const validatePhoneNumber = (phone) => {
  const phoneNumberRegex = /^94\d{9}$/; // Regex pattern: Starts with 94 and followed by 9 digits

  return phoneNumberRegex.test(phone);
};

  return (
    <div className='quotation'>
        <div className='quotation-content'>
        <div className='row'>
            <div className='col-6' style={{ textAlign:'left' }}>
               
                <Form.Group controlId="date" style={{ margin:'5px' }}>
            <div className='row'>
                <div className='col-4'>
                <Form.Label style={{ marginTop:'5px' }}>Date: </Form.Label>
                </div>
                <div className='col-6'>
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
                <Form.Label style={{ marginTop:'5px' }}>Name: </Form.Label>
                </div>
                <div className='col-6'>
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
                <Form.Label style={{ marginTop:'5px' }}>Position: </Form.Label>
                </div>
                <div className='col-6'>
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
                <Form.Label style={{ marginTop:'5px' }}>Address: </Form.Label>
                </div>
                <div className='col-6'>
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
                <Form.Label style={{ marginTop:'5px' }}>Contact Number: </Form.Label>
                </div>
                <div className='col-6'>
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
                <Form.Label style={{ marginTop:'5px' }}>Email Address: </Form.Label>
                </div>
                <div className='col-6'>
                <Form.Control
          type="text"
          placeholder="Enter email address"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
                </div>
            </div>
       
        
      </Form.Group>
      {error && <Alert id='alert' variant='danger'>{error}</Alert>} {/* Display error message */}
            </div>
            <div className='col-6' style={{ textAlign:'right' }}>
                {/* logo */}

                <img src={Logo} alt="Logo" width="150px" height="100px" style={{ margin:'5px' }}/>
            </div>
        </div>

        <div className='row'>
            {/* quotation description field */}
           <div className='col-5'>
           <Form.Group controlId="quotationDescription" style={{ margin:'5px' }}>
      
               
                <Form.Control
          as="textarea"
          placeholder="Enter Quotation Description"
          value={quotationDescription}
          onChange={(event) => setQuotationDescription(event.target.value)}
        />
                      
      </Form.Group>
           </div>
            {/* reference number + organization */}
           <div className='col-7' style={{ textAlign:'right' }}>
           <Form.Group controlId="organization" style={{ margin:'5px' }}>
      <div className='row' >
                <div className='col-5'>
                <Form.Label style={{ marginTop:'5px' }}>Reference Number: {referenceNumber}</Form.Label>
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
       as="textarea"
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

<div id='button' className='row'>
    {/* add mesurement button */}
    <div  className='col' style={{ margin:'5px' }}>
        
    <Button variant="primary" style={{ width: '200px' }}>
        + Add Mesurement
      </Button>
      </div>

      {/* download button */}
      <div className='col' style={{ margin:'5px',textAlign:'right' }}>
    <Button variant="primary" style={{ width: '200px' }} onClick={downloadAsPDF} disabled={!(loader===false)}>
    {loader?(
                  <span>Downloading</span>
                ):(
                  <span>Download</span>
                )}
      </Button>
      </div>
</div>



     </div>
    </div>
  )
}

export default QuotationPage
