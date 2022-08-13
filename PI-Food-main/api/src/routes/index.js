const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const routerRc = require('./Recipe');
const routerDt = require('./Diets');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/recipes", routerRc)

router.use('/diets', routerDt)

module.exports = router;
