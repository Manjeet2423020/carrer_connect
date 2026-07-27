/**
 * @description Standard Class for Consistent API Success Responses
 */
class ApiResponse {
    constructor(statusCode, data, message = 'Success') {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400; // 200 to 399 are success status codes
    }
}

export default ApiResponse;
