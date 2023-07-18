import axios from "axios";


const url='http://localhost:5000';

 class ProductService {
    getProducts(){ 
        return axios.get(url + "/product");    
      }

      

    
    
}
export default new ProductService