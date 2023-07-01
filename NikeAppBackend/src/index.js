const express = require('express');
const productRoutes = require('./router/productRoutes');
const orderRoutes = require('./router/orderRoutes');
const bodyParser = require('body-parser');

const PORT = 8000;
const app = express();

app.use(bodyParser.json());
app.use('/products',productRoutes);
app.use('/orders',orderRoutes);

app.get('/',(req,res)=>{
    res.send("<h2>Hello Coders</h2>")
})

app.listen(PORT,()=>{
    console.log('API is listening on port',PORT);
})