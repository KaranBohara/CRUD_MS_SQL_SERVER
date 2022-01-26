var config = require('./dbconfig');
const sql = require('mssql');


async function getOrders() {
    try {
        let pool = await sql.connect(config);
        let products = await pool.request().query("SELECT * from Orders");
        return products.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function getOrder(orderId) {
    try {
        let pool = await sql.connect(config);
        let product = await pool.request()
            .input('input_parameter', sql.Int, orderId)
            .query("SELECT * from Orders where Id = @input_parameter");
        return product.recordsets;

    }
    catch (error) {
        console.log(error);
    }
}


async function addOrder(order) {
    try {
        let pool = await sql.connect(config);
        let insertProduct = await pool.request()
            .input('Id', sql.Int, order.Id)
            .input('Title', sql.VarChar, order.Title)
            .input('Quantity', sql.Int, order.Quantity)
            .input('Price', sql.Float, order.Price)
            .input('Description', sql.VarChar, order.Description)
            .execute('InsertOrders');
        return insertProduct.recordsets;
    }
    catch (err) {
        console.log(err);
    }
}

async function updateOrder (orderId,order) {
    try {
        let pool = await sql.connect(config);
        let updateProduct = await pool.request()
            .input('Id',sql.Int,orderId)
            .input('Title', sql.VarChar, order.Title)
            .input('Quantity', sql.Int, order.Quantity)
            .input('Price', sql.Float, order.Price)
            .input('Description', sql.VarChar, order.Description)
            .execute('UpdateOrders');
        return updateProduct.recordsets;
    }
    catch (err) {
        console.log(err);
    }
}

async function deleteOrder (orderId) {
    try {
        let pool = await sql.connect(config);
        let deleteProduct = await pool.request()
            .input('Id',sql.Int,orderId)
            .execute('DeleteOrders');
        return deleteProduct.recordsets;
    }
    catch (err) {
        console.log(err);
    }
}


module.exports = {
    getOrders: getOrders,
    getOrder : getOrder,
    addOrder : addOrder,
    updateOrder : updateOrder,
    deleteOrder : deleteOrder
}