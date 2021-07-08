import axios from 'axios';

const API_URL = 'http://localhost:5000'

class Server{
    getAllUsers(){
        return axios.get(`${API_URL}/users/`);
    }
    // saveCategoria(categorias){
    //     return axios.post(`${API_URL}/categorias`, categorias)
    // }
    // deleteCategoria(codigo){
    //     return axios.delete(`${API_URL}/categorias/${codigo}`)
    // }
}
export default new Server();