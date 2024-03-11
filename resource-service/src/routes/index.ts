import e, { Router } from 'express'
import collectionRouter from './collection';
import resourceRouter from './resource';
import resourceRequestRouter from './resource-request';

const router = Router()

router.use('/resource/collection', collectionRouter)
router.use('/resource', resourceRouter)
router.use('/resource/request', resourceRequestRouter)


export default router;