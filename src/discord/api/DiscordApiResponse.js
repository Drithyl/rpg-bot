module.exports = class DiscordApiResponse {
    constructor(response) {
        this.success = false;
        this.data = response;
    }
};
