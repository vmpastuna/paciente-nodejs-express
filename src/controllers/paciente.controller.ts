import { Request, Response } from 'express';
import { IPaciente, Paciente } from '../models/paciente.model';
import { IResponse } from '../models/response.model';

export const createPaciente = async (req: Request, res: Response)=> {           
    const { cedula,nombre,fechaNacimiento,direccion,telefono,email } : IPaciente = req.body;
    const response = await new PacienteController().create({ cedula,nombre,fechaNacimiento,direccion,telefono,email });         
    return res.status(response.status).json(response);   
}

export const retrievePaciente = async (req: Request, res: Response) => {
   const docId : String = req.params.id; 
   const response = await new PacienteController().retrieve(docId);         
   return res.status(response.status).json(response);   
}

export const updatePaciente = async (req: Request, res: Response)=> {           
    const { cedula,nombre,fechaNacimiento,direccion,telefono,email} : IPaciente = req.body;
    const docId : String = req.params.id; 
    const response = await new PacienteController().update(docId, { cedula,nombre,fechaNacimiento,direccion,telefono,email });         
    return res.status(response.status).json(response);   
}

export const deletePaciente = async (req: Request, res: Response) => {
    const docId : String = req.params.id; 
    const response = await new PacienteController().delete(docId);         
    return res.status(response.status).json(response);   
 }

export const listPacientes = async (req: Request, res: Response) => {
    const response = await new PacienteController().list();         
    return res.status(200).json(response);    
}


class PacienteController {

    public async create(payload : IPaciente) : Promise<IResponse> {
        const paciente = new Paciente(payload);
        return paciente.save().then(data => {
            return {
                message: "CREATED: Paciente added to database",
                status: 201,
                content : data
            }
        }).catch(err => {
            return {
                message: "Error on create Paciente",
                status: 500,
                content : err
            }
        });        
    }

    public async retrieve(docId: String) : Promise<IResponse> {        
        return Paciente.findOne({_id: docId}).then(data => {
            if(data === null) {
                return {
                    message: "NOT FOUND: Paciente not found",
                    status: 404,
                    content : data
                };
            }
            return {
                message: "OK: Paciente retrieve",
                status: 200,
                content : data
            };
        }).catch(err => {
            return {
                message: "INTERNAL SERVER ERROR: " + err.name ,
                status: 500,
                content : err
            };
        });        
    }

    public async update(docId: String, payload : IPaciente) : Promise<IResponse>{
        return Paciente.updateOne({_id: docId} , { $set: { 
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
                content : data
            }
        }).catch(err => {
            return {
                message: "INTERNAL SERVER ERROR: Paciente not updated",
                status: 500,
                content : err
            }
        });
    }
    

    public async delete(docId: String) : Promise<IResponse> {
        return Paciente.deleteOne({_id: docId}).then(data => {
            if (data.deletedCount == 0) {
                return {
                    message: "NOT FOUND: Paciente not found",
                    status: 404,
                    content : data
                };
            }
            return {
                message: "OK: Paciente deleted",
                status: 200,
                content : data
            }
        }).catch(err => {
            return {
                message: "INTERNAL SERVER ERROR: " + err.name,
                status: 500,
                content : err
            }
        });
    }

    public async list() : Promise<IResponse> {
        return Paciente.find({}).then(data => {
                return {
                    message: "OK: All pacientes retrieve",
                    status: 200,
                    content : data
                };
            }).catch(err => {
                return { message: "Error on retrieve Pacientes", status: 500, content : err }
        });       
    }

}




