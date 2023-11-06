import { Router } from 'express';
import {alumno} from './controller.js';

export const router= Router();

router.get('/alumnos', alumno.getAll);
