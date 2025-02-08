import express from 'express';
import { upload } from "../../middleware/upload.js";
import verifyUser from '../../middleware/verifyUser.js';
import CreateService from './controllers/CreateService.js';
import UpdateService from './controllers/UpdateService.js';
import DeleteService from './controllers/DeleteService.js';
import GetServices from './controllers/GetServices.js';
import GetService from './controllers/GetService.js';

const serviceRouter = express.Router();

serviceRouter.post('/create-service', verifyUser, upload.single('image'), CreateService);
serviceRouter.put('/update-service/:id', verifyUser, upload.single('image'),  UpdateService);
serviceRouter.delete('/delete-service/:id', verifyUser, DeleteService);
serviceRouter.get('/get-services', verifyUser, GetServices);
serviceRouter.get('/get-service/:id', verifyUser, GetService);

export default serviceRouter;