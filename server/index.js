const express = require('express');
const backendRoutes = require('./routes/backend.routes');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(
  cors({
    origin: "https://travel-buddy-roan.vercel.app/", // Allow requests from frontend
    credentials: true, // Allow cookies and authorization headers
  })
);


app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/", backendRoutes);
const PORT =  8000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
