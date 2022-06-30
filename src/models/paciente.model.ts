import { Schema, model } from 'mongoose';

//Interface
export interface IPaciente {

    cedula:       String;
    nombre:       String;
    fechaNacimiento:       null | Date;
    direccion:     String;
    telefono:       String;
    email:       String;
     
    
} 

//Schema
const pacienteSchema = new Schema<IPaciente>({
    
    cedula: { type: String },
    nombre: { type: String },
    fechaNacimiento: { type: Date },
    direccion: { type: String },
    telefono: { type: String },
    email: { type: String },
});

//Model
const Paciente = model<IPaciente>('Paciente', pacienteSchema);

export {Paciente}

