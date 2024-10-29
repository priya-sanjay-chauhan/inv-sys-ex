const express = require('express');
const mysql = require('mysql2');
const cors = require('cors')

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())

const db=mysql.createConnection({
    host:'localhost',
    user:'priya',
    password:'123@asd',
    database:"data"
})

app.get('/products', (req, res) => {
    const query = 'SELECT * FROM products';
    db.query(query, (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.json(results);
    });
});

//delete
app.delete('/products/:id', (req, res) => {
    const productId = req.params.id;
    const query = 'DELETE FROM products where id=?';
    db.query(query,[productId], (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.json({ message: 'Product deleted successfully',id: productId });
    });
});

//update
app.put('/products/:id', (req, res) => {
    const productId = req.params.id;
    const { name, category, quantity, price, supplier } = req.body;
    const query = `
        UPDATE products 
        SET name = ?, category = ?, quantity = ?, price = ?, supplier = ? 
        WHERE id = ?
    `;
    db.query(query,[name, category, quantity, price, supplier, productId], (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.json({ message: 'Product deleted successfully',id: productId });
    });
});


app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})