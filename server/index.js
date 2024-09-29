const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const connectDB = require('./Database/config');
const productRoutes = require('./Routers/productRoutes');
const SearchRoutes = require('./Routers/SearchRoutes');
const commentRoutes = require('./Routers/commentRoutes');
const authRoutes = require('./Routers/authRoutes');
const webdata = require('./Routers/webdata');
const userinfo = require('./Routers/user.js');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

connectDB();

app.use('/api', webdata);
app.use('/api', productRoutes);
app.use('/api', commentRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/addtocart', authRoutes);
app.use('/api/updateProduct', productRoutes);
app.use('/api/deleteProduct', productRoutes);
app.use('/api',SearchRoutes);
app.use('/api',userinfo)
app.use('/api/profile',userinfo);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
