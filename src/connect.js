import mongoose from 'mongoose'
import {env} from '../src/env/index.js'

try {
    await mongoose.connect(env.CONNECTION_STRING)

    console.log('Connected to your db')
} catch (error) {
    console.log(error)
}

export default mongoose