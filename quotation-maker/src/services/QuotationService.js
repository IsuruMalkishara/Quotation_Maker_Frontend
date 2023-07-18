import axios from "axios";


const url='http://localhost:5000';

 class QuotationService {
    getReferenceNumber(){ 
        return axios.get(url + "/reference");    
      }

    addQuotation(data){
      return axios.post(url+"/quotation",data);
    }  

    
    
}
export default new QuotationService