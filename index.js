import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/post.js'
import userRoutes from './routes/user.js'

const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors());
app.use('/posts',postRoutes)
app.use('/users',userRoutes)

const CONNECTION_URL = 'mongodb+srv://memories:memories@cluster0.p8rdx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

const PORT = process.env.PORT || 8100;
mongoose.connect(CONNECTION_URL,)
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));