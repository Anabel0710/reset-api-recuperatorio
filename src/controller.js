import { pool } from "./database";

class AlumnoController{

    async getAll(req, res){
        const [result] = await pool.query('SELECT * FROM alumnos');
        res.jsno(result);

    }
}

export const alumno = new AlumnoController();