process.on('uncaughtException', (err) => {
})
import express from 'express'
import {dbConnection} from './DataBase/dbConnection.js'
import { AppError } from './src/utils/AppError.utils.js';
import { globalError } from './src/middleware/globalError.middleware.js';
import { userRouter } from './src/modules/user/user.routes.js';
import { companyRouter } from './src/modules/company/company.routes.js';
import { jobRouter } from './src/modules/job/job.routes.js';
const app = express()
const port = process.env.PORT || 3000;


app.get('/', (req, res) => res.send('Hello World!'))
app.use(express.json());
app.use(express.static('uploads'))
app.use('/user',userRouter)
app.use('/company',companyRouter)
app.use('/job',jobRouter)

app.use('*', (req, res, next) => {
    next(new AppError(`path Error at ${req.originalUrl}`,404));
})
app.use(globalError)
process.on('unhandledRejection', (err) => {
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
