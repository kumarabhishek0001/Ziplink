import express from 'express'
import { shortenURLController, visitShortURLController } from '../controller/url.contoller.js'


const urlRouter = express.Router()


urlRouter.post('/shorten', shortenURLController)
// urlRouter.get('/:shortID', visitShortURLController)


export default urlRouter