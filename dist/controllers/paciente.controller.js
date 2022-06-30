"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listPacientes = exports.deletePaciente = exports.updatePaciente = exports.retrievePaciente = exports.createPaciente = void 0;
const paciente_model_1 = require("../models/paciente.model");
const createPaciente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cedula, nombre,fechaNacimiento,  direccion, telefono, email } = req.body;
    const response = yield new PacienteController().create({ cedula, nombre,fechaNacimiento, direccion, telefono, email });
    return res.status(response.status).json(response);
});
exports.createPaciente = createPaciente;
const retrievePaciente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const docId = req.params.id;
    const response = yield new PacienteController().retrieve(docId);
    return res.status(response.status).json(response);
});
exports.retrievePaciente = retrievePaciente;
const updatePaciente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cedula, nombre,fechaNacimiento,  direccion, telefono, email } = req.body;
    const docId = req.params.id;
    const response = yield new PacienteController().update(docId, { cedula, nombre,fechaNacimiento,  direccion, telefono, email });
    return res.status(response.status).json(response);
});
exports.updatePaciente = updatePaciente;
const deletePaciente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const docId = req.params.id;
    const response = yield new PacienteController().delete(docId);
    return res.status(response.status).json(response);
});
exports.deletePaciente = deletePaciente;
const listPacientes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield new PacienteController().list();
    return res.status(200).json(response);
});
exports.listPacientes = listPacientes;
class PacienteController {
    create(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const paciente = new paciente_model_1.Paciente(payload);
            return paciente.save().then(data => {
                return {
                    message: "CREATED: Paciente added to database",
                    status: 201,
                    content: data
                };
            }).catch(err => {
                return {
                    message: "Error on create Paciente",
                    status: 500,
                    content: err
                };
            });
        });
    }
    retrieve(docId) {
        return __awaiter(this, void 0, void 0, function* () {
            return paciente_model_1.Paciente.findOne({ _id: docId }).then(data => {
                if (data === null) {
                    return {
                        message: "NOT FOUND: Paciente not found",
                        status: 404,
                        content: data
                    };
                }
                return {
                    message: "OK: Paciente retrieve",
                    status: 200,
                    content: data
                };
            }).catch(err => {
                return {
                    message: "INTERNAL SERVER ERROR: " + err.name,
                    status: 500,
                    content: err
                };
            });
        });
    }
    update(docId, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return paciente_model_1.Paciente.updateOne({ _id: docId }, { $set: {
                    cedula: payload.cedula,
                    nombre: payload.nombre,
                    fechaNacimiento: payload.fechaNacimiento,
                    direccion: payload.direccion,
                    telefono: payload.telefono,
                    email: payload.email
                } }).then(data => {
                return {
                    message: "OK: Paciente updated",
                    status: 200,
                    content: data
                };
            }).catch(err => {
                return {
                    message: "INTERNAL SERVER ERROR: Paciente not updated",
                    status: 500,
                    content: err
                };
            });
        });
    }
    delete(docId) {
        return __awaiter(this, void 0, void 0, function* () {
            return paciente_model_1.Paciente.deleteOne({ _id: docId }).then(data => {
                if (data.deletedCount == 0) {
                    return {
                        message: "NOT FOUND: Paciente not found",
                        status: 404,
                        content: data
                    };
                }
                return {
                    message: "OK: Paciente deleted",
                    status: 200,
                    content: data
                };
            }).catch(err => {
                return {
                    message: "INTERNAL SERVER ERROR: " + err.name,
                    status: 500,
                    content: err
                };
            });
        });
    }
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            return paciente_model_1.Paciente.find({}).then(data => {
                return {
                    message: "OK: All pacientes retrieve",
                    status: 200,
                    content: data
                };
            }).catch(err => {
                return { message: "Error on retrieve Pacientes", status: 500, content: err };
            });
        });
    }
}
