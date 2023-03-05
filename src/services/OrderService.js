
class OrderService{    
    getOrders = () => {
        return fetch('https://react-auth-local-default-rtdb.asia-southeast1.firebasedatabase.app/ORDERS.json')
        .then(function(response) {
            return response.json();
        }).then(function(json) {
            return json;
        }).catch(error => console.log(error));
    }
}
export default new OrderService();