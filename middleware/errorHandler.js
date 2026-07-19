import { fail } from "../utils/response.js"

function handleErrors(err, req, res, next) {
    const defaultStatus = 500
    const defaultMessage = "Internal server error"
    const errorMsg = {status: err.status || defaultStatus, message: err.message || defaultMessage}
    console.error(errorMsg)
    console.error(err)
    res.json(fail(errorMsg))
}

export {handleErrors}