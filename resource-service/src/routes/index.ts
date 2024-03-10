import e, { Router } from 'express'
import collectionRouter from './collection';
import resourceRouter from './resource';
import requestRouter from './request';

const router = Router()

router.use('/resource/collection', collectionRouter)
router.use('/resource', resourceRouter)
router.use('/resource/request', requestRouter)


export default router;