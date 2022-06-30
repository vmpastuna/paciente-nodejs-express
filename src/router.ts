import {Application} from 'express';
import { createPaciente, deletePaciente, listPacientes, retrievePaciente, updatePaciente } 
from './controllers/paciente.controller';

export const router = (app: Application) => {
    app.post("/pacientes", createPaciente);    
    app.get("/pacientes/:id", retrievePaciente);
    app.put("/pacientes/:id", updatePaciente);
    app.delete("/pacientes/:id", deletePaciente);    
    app.get("/pacientes", listPacientes);
}



