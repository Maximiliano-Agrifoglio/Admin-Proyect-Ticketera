import mongoose, { Schema, Document } from "mongoose";

type ProyectType = Document & {
     proyectName : string,
     clientName  : string,
     description : string
}

const ProyectSchema : Schema = new Schema({
    proyectName: {
        type : String,
        required : true,
        trim : true
    },

    clientName: {
        type : String,
        required : true,
        trim : true
    },

    description: {
        type : String,
        required : true,
        trim : true
    }
});

const Proyect = mongoose.model<ProyectType>('Proyect', ProyectSchema);

export default Proyect;
export { ProyectType };