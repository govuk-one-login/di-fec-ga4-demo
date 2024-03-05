/**
 * Middleware function to add common headers to the request.
 *
 * @param {Object} req - the request object
 * @param {Object} res - the response object
 * @param {Function} next - the next middleware function
 * @return {void}
 */
module.exports = function (req, res, next) {
    const txmaAuditEncoded = req.headers["txma-audit-encoded"];
    if (txmaAuditEncoded) {
        console.log("txma audit encoded interceptor"); // alpha log
        req.axios.interceptors.request.use(
            config => {
                config.headers["txma-audit-encoded"] = txmaAuditEncoded;
                return config;
            },
            error => {
                return Promise.reject(error);
            }
        );
    }
    next();
};