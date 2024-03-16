import e, { Router } from 'express'
import collectionRouter from './collection';
import resourceRouter from './resource';
import resourceRequestRouter from './resource-request';
import interestedResponseRouter from './interested-response';

const router = Router()

router.use('/resource/collection', collectionRouter)
router.use('/resource', resourceRouter)
router.use('/resource/request', resourceRequestRouter)
router.use('/resource/interested-response', interestedResponseRouter)


export default router;