const CustomAPIError = require('./custom-api').default
const BadRequestError=require("./bad-request")
const NotFoundError =require("./notFound")

const UnauthenticatedError = require('./unauthenticated')

module.exports={
    CustomAPIError,
    UnauthenticatedError,
    BadRequestError,
    NotFoundError
    
}