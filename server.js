const express = require("express");
const patientRoutes = require('./src/patients/routes'); 
const doctorRoutes = require('./src/doctors/routes'); 
const reportRoutes = require('./src/medicalReports/routes');
const appointmentRoutes = require('./src/appointments/routes'); 
const adminRoutes = require('./src/admin/routes');
const app = express();
const port = 8080;

const cors = require('cors');
// CORS ayarlarını yapılandır
app.use(cors());

app.use(express.json());

app.get("/", (req,res) =>{
    res.send("Hello World");
});

app.use("/api/v1/patients", patientRoutes);
app.use("/api/v1/doctors", doctorRoutes);
app.use("/api/v1/appointments", appointmentRoutes); 
app.use("/api/v1/medicalreports",reportRoutes);
app.use("/api/v1/admin",adminRoutes);

app.listen(port,()=>console.log(`app listening on port ${port}`));
