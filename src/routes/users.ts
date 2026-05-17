import { Router } from "express";
import {login, signup} from "../controllers/users/users"

const router = Router();

router.post('/user-create', signup );
router.post('/login', login);


export default router;