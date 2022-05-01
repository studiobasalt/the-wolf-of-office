import dotenv from 'dotenv'
dotenv.config()
const rawEnv = process.env
let env = new Object()

// Process raw env
for (var key in rawEnv) {
    let value = rawEnv[key]
    value = convertStringBoolean(value)
    env[key] = value
}

// Process functions
function convertStringBoolean(value){
    if (value === 'True') {
        value = true
    }
    else if (value === 'False') {
        value = false
    }
    return value
}

export default env
