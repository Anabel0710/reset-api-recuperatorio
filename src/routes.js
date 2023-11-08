import { Router } from 'express';
import { libro } from './controller.js';

export const router = Router()

router.get('/libros', libro.getAll);        // obtener todos los registros que se tienen en la BD
router.get('/libro', libro.getOne);         // obtener un registro determinado
router.post('/libro', libro.add);           // agregar un registro a la BD
router.put('/libro', libro.update);         // actualizar un registro existente
router.delete('/libro', libro.delete);      // borrar un registro a partir del nro del isbn 
