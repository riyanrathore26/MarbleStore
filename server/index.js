const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const connectDB = require('./Database/config');
const productRoutes = require('./Routers/productRoutes');
const SearchRoutes = require('./Routers/SearchRoutes');
const commentRoutes = require('./Routers/commentRoutes');
const authRoutes = require('./Routers/authRoutes');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

connectDB();

app.use('/api', productRoutes);
app.use('/api', commentRoutes);
app.use('/api', authRoutes);
app.use('/api/addtocart', authRoutes);
app.use('/api/updateProduct', productRoutes);
app.use('/api/deleteProduct', productRoutes);
app.use('/api',SearchRoutes);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
