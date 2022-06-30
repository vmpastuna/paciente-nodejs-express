"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const paciente_controller_1 = require("./controllers/paciente.controller");
const router = (app) => {
    app.post("/pacientes", paciente_controller_1.createPaciente);
    app.get("/pacientes/:id", paciente_controller_1.retrievePaciente);
    app.put("/pacientes/:id", paciente_controller_1.updatePaciente);
    app.delete("/pacientes/:id", paciente_controller_1.deletePaciente);
    app.get("/pacientes", paciente_controller_1.listPacientes);
};
exports.router = router;
