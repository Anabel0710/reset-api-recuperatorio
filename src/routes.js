import { Router } from 'express';
import { libro } from './controller.js';

export const router = Router()

router.get('/libros', libro.getAll);        // obtener todos los registros que se tienen en la BD
router.get('/libro', libro.getOne);         // obtener un registro en especifico
router.post('/libro', libro.add);           // agregar un registro a la Base de Datos
router.put('/libro', libro.update);         // actualizar un registro que ya existe 
router.delete('/libro', libro.delete);      // borrar un registro a partir del numero de isbn 