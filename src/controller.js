import { pool } from './database.js';

class LibroController {
    // obtener todos los registros de la base de datos
    async getAll(req, res) {
        try {
            const [result] = await pool.query('SELECT * FROM libros');
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: 'Ocurrió un error al obtener los datos. Intente nuevamente' });
        }
    }

    // obtener un registro por su ID
    async getOne(req, res) {
        try {
            const libro = req.body;
            const id_libro = parseInt(libro.id);
            const [result] = await pool.query('SELECT * FROM libros WHERE id = ?', [id_libro]);

            if (result[0] !== undefined) {
                res.json(result);
            } else {
                res.status(404).json({ "Error": '¡Ups! No se ha encontrado el libro con ese ID' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    // agregar un nuevo registro de libro
    async add(req, res) {
        try {
            const libro = req.body;

            // Verificar si los campos están vacíos antes de insertar
            if (libro.nombre.trim() === '' || libro.autor.trim() === '' || libro.categoria.trim() === '') {
                throw new Error("Complete los campos correctamente");
            }

            // Insertar en la base de datos
            const [result] = await pool.query(`INSERT INTO libros(nombre, autor, categoria, anio_publicacion, isbn) 
                VALUES (?, ?, ?, ?, ?)`, [libro.nombre, libro.autor, libro.categoria, libro.anio_publicacion, libro.isbn]);

            // Verificar si la inserción fue exitosa
            if (result.affectedRows === 1) {
                res.json({ "Id insertado": result.insertId });
            } else {
                throw new Error("No se pudo insertar el libro en la base de datos");
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // actualizar un registro existente
    async update(req, res) {
        try {
            const libro = req.body;
            const [result] = await pool.query(`UPDATE libros SET nombre=(?), autor=(?), categoria=(?), anio_publicacion=(?), isbn=(?) WHERE id=(?)`,
                [libro.nombre, libro.autor, libro.categoria, libro.anio_publicacion, libro.isbn, libro.id]);

            if (result.changedRows === 0 || libro.id === 0 || libro.id == "") {
                throw new Error('El libro que busca no fue encontrado');
            } else {
                res.json({"Registros actualizados": result.changedRows});
            }
        } catch (error) {
            res.status(404).json({ error: 'El ID no existe' });
        }
    }

    // borrar un registro por ISBN
    async delete(req, res) {
        try {
            const libro = req.body;

            if (!libro.isbn) {
                throw new Error("El ISBN no ha sido completado. Intente nuevamente");
            }

            // Eliminar el libro de la base de datos
            const [result] = await pool.query('DELETE FROM libros WHERE isbn = ?', [libro.isbn]);

            if (result.affectedRows > 0) {
                res.json({ "Registros eliminados": result.affectedRows });
            } else {
                res.status(404).json({ "Error": 'No se ha encontrado el libro o, el mismo no existe' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

// Exportar una instancia del controlador
export const libro = new LibroController();
