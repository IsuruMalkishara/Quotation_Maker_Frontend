import axios from "axios";


const url='http://localhost:8080';

 class CustomerService {
    getReferenceNumber(){ 
        return axios.get(url + "/reference");    
      }

    addCustomer(data){
      return axios.post(url+"/customer",data);
    }  

    
    
}
export default new CustomerService