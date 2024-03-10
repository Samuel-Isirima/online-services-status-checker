import e, { Router } from 'express'
import collectionRouter from './collection';
import resourceRouter from './resource';

const router = Router()

router.use('/resource/collection', collectionRouter)
router.use('/resource', resourceRouter)


export default router;