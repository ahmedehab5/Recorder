const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const dotenv = require('dotenv');

// Load env
dotenv.config({ path: './config.env' });

// Midelwares
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use(fileUpload());
app.use(express.static(`${__dirname}/public`));

app.use('/api/v1/record', require('./routes/recordRoutes'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});


