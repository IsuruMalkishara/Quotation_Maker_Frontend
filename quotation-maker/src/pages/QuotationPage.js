import React, { useState,useEffect,useContext,useRef } from 'react';
import { Form,Button } from 'react-bootstrap';
import '../styles/QuotationPage.css';
import Logo from '../assets/logo.png';
import QuotationService from '../services/QuotationService';
import QuotationTableComponent from '../components/QuotationTableComponent';
import AlertPopupComponent from '../components/AlertPopupComponent';
import { DataContext } from '../context/DataContext';
import AddMesurementComponent from '../components/AddMesurementComponent';
import MeasurementTableComponent from '../components/MeasurementTablesComponent';
import ProductComponent from '../components/ProductComponent';
import AddProductsComponent from '../components/AddProductsComponents';

function QuotationPage() {

    const currentDate = new Date();

    const [customerName,setCustomerName]=useState('');
    const [position,setPosition]=useState('');
    const [address,setAddress]=useState('');
    const [email,setEmail]=useState('');
    const [phone,setPhone]=useState(0);

    const [quotationDescription,setQuotationDescription]=useState('');
    const [organizationName,setOrganizationName]=useState('');
    const [referenceNumber,setReferenceNumber]=useState();
    const [productDescription,setProductDescription]=useState('');

    const [loader, setLoader] = useState(false);

    const [error,setError]=useState('');

    //arert popup
    const [showAlert, setShowAlert] = useState(false);


  const { state } = useContext(DataContext);

  // Access the required data from the state
  const { totalQty,grandTotal, advancedTotal,balancedTotal, tableData } = state;

  //mesurement popup open or not
  const [isAddMesurementPopupOpen, setAddMesurementPopupOpen] = useState(false);

  //mesuremnt tables array
  const [mesurementTables,setMesurementTables]=useState([]);

  //selected products
  const [products,setProducts]=useState([]);

  //products popup open or not
  const [isAddProductsPopupOpen, setAddProductsPopupOpen] = useState(false);

  const dataRef=useRef();
  


    useEffect(() => {
        getReferenceNumber();
      }, []);

      

    //get reference number
    const getReferenceNumber=()=>{
        QuotationService.getReferenceNumber().then(res=>{
            console.warn(res.data);
            setReferenceNumber(res.data);
        }
            
            )
    }

  

// download pdf and save customer data
const downloadAsPDF = () => {
  

  if(!customerName){
    setError('Customer Name is required.');
    setShowAlert(true);
    return;
  }else if(!address){
    setError(' Address is required.');
    setShowAlert(true);
      return;
  }else if(!phone){
    setError(' Contact number is required.');
    setShowAlert(true);
      return;
  }else if (!validatePhoneNumber(phone)) {
    setError('Invalid Contact Number.');
    setShowAlert(true);
      return;
  }else if(!email){
    setError('Email Address is required.');
    setShowAlert(true);
      return;
  }else if (!validateEmail(email)) {
    setError('Invalid Email Address.');
    setShowAlert(true);
    return;
  }else{
   

      const customer={
        "name":customerName,
        "position":position,
        "address":address,
        "phone":phone,
        "email":email,
        "organization":organizationName
      }

      const quotation={
        "description":quotationDescription,
        "productDescription":productDescription,
         "totalQty":totalQty,
         "grand":grandTotal,
        "advanced":advancedTotal,
        "balanced":balancedTotal,
        "date":currentDate
      }

      

      const data={
        "referenceNumber":referenceNumber,
        "customer":customer,
        "quotation":quotation,
        "products":tableData,
        "mesurementTables":mesurementTables,
        "productItems":products

      }

      try {
        console.warn(data);
        //save data 
          QuotationService.addQuotation(data).then(res=>{
            console.warn("response "+res.data);
            downloadPdf(res.data);
          })
        
      } catch (error) {
        console.error('Error:', error);
      }

  
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

//close alert popup
const closeAlert = () => {
  console.warn("Close alert");
 setShowAlert(false);
};

//download pdf
const  downloadPdf=(base64String)=>{
  const byteCharacters = atob(base64String);
  const byteArrays = [];
  const fileName="Quotation_"+organizationName;

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: 'application/pdf' });

  // Create a download link
  const downloadLink = document.createElement('a');
  const url = URL.createObjectURL(blob);
  downloadLink.href = url;
  downloadLink.download = fileName;

  // Trigger the download
  downloadLink.click();

  // Clean up the URL object
  URL.revokeObjectURL(url);
}

//add mesurement popup open
const handleAddMesurement=()=>{
  console.warn("add popup open");
setAddMesurementPopupOpen(true);
}

// Close add mesurement popup
const closeAddPopup = () => {
  setAddMesurementPopupOpen(false);
};

//add mesurement
const add=(mesurementTable,measurementType,totalPcs,totalSqFt)=>{
  console.warn("type: "+measurementType);
  console.warn(mesurementTable);
  addMeasurementTableToArray(mesurementTable,measurementType,totalPcs,totalSqFt);

  dataRef.current.add(measurementType,totalSqFt);
  setAddMesurementPopupOpen(false);
}


//add mesurement table to array
const addMeasurementTableToArray=(table,type,totalPcs,totalSqFt)=>{
  const newRow = { id: mesurementTables.length + 1, type: type, table: table,totalPcs:totalPcs,totalSqFt:totalSqFt };
  setMesurementTables([...mesurementTables, newRow]);
}

//add products popup open
const handleAddProducts=()=>{
  console.warn("add popup open");
setAddProductsPopupOpen(true);
}

// Close add products popup
const closeAddProductsPopup = () => {
  setAddProductsPopupOpen(false);
};

//add products
const addProducts=(selectedProducts)=>{
  
  console.warn("selected"+selectedProducts);
 setProducts(selectedProducts);
 dataRef.current.addProducts(selectedProducts);
  setAddProductsPopupOpen(false);
}


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
      <QuotationTableComponent ref={dataRef}/>
      </div>
     
</div>

<div id='button' className='row'>
    {/* add mesurement button */}
    <div  className='col' style={{ margin:'5px' }}>
        
    <Button variant="primary" style={{ width: '200px' }} onClick={handleAddMesurement}>
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

<div className='row' >
  <MeasurementTableComponent mesurementTables={mesurementTables}/>
</div>
<div id='button' className='row'>
    {/* add products button */}
    <div  className='col' style={{ margin:'5px' }}>
        
    <Button variant="primary" style={{ width: '200px' }} onClick={handleAddProducts}>
        + Add Products
      </Button>
      </div>
   </div>   
<div className='row'>
<div className='col' style={{ margin:'5px' }}>
  <ProductComponent selectedProducts={products}/>
  </div>
  </div>


     </div>
     <div className='alert'>
     {showAlert && <AlertPopupComponent message={error} onClose={closeAlert} />}
     </div>
     {isAddMesurementPopupOpen  && (
        <AddMesurementComponent
          add={add}
          closePopup={closeAddPopup}
          
        />
      )}
      {isAddProductsPopupOpen  && (
        <AddProductsComponent
          addProducts={addProducts}
          products={products}
          closePopup={closeAddProductsPopup}
          
        />
      )}
    </div>
  )
}

export default QuotationPage;
