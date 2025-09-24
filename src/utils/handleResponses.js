//? Exit responses
const success = ({status, data, message, res}) => {
    res.status(status).json({
        error: false,
        status: status,
        message: message,
        data: data
    })
} 

//? Error responses
const error = ({status, data, message, res, fields}) => {
    res.status(status).json({
        error: true,
        status: status,
        message: message,
        fields: fields,
        data
    })
}

module.exports = {
    success,
    error
}
