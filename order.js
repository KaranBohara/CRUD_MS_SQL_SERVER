class Order{
    constructor(Id,Title,Quantity,Price,Description){
        this.Id = Id; 
        this.Title = Title; 
        this.Quantity = Quantity;
        this.Price = Price;
        this.Description =Description; 
    }
}
// onClick={handleDelete(val.Id)}
module.exports = Order;