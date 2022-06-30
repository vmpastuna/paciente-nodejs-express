"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Paciente = void 0;
const mongoose_1 = require("mongoose");
//Schema
const pacienteSchema = new mongoose_1.Schema({
    cedula: { type: String },
    nombre: { type: String },
    fechaNacimiento : {type: Date},
    direccion: { type: String },
    telefono: { type: String },
    email: { type: String },
});
//Model
const Paciente = (0, mongoose_1.model)('Paciente', pacienteSchema);
exports.Paciente = Paciente;
