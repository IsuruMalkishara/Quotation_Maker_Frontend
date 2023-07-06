import axios from "axios";


const url='http://localhost:8080';

 class CustomerService {
    getReferenceNumber(){ 
        return axios.get(url + "/reference");    
      }

    
    
}
export default new CustomerService