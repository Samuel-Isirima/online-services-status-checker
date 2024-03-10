import e, { Router } from 'express'
import collectionRouter from './collection';

const router = Router()

router.use('/resource/collection', collectionRouter)
router.get('/', (req, res) => {
    res.send('Resource service is running');
})

export default router;