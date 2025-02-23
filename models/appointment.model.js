import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({

     appointmentDateTime: {
        type: Date,
        required: true
    },
    department: {
        type: String,
        enum: ["Dermatologist", "Cardiologis", "Neurologist", "Pediatrician", "Orthopedist", "Gynecologist"]
    },
    
}) 
export default Appointment = mongoose.model("Appointment" , appointmentSchema)