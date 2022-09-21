const Checker = require("./_checker");

class Airsense extends Checker {
    async check() {
        const body = this.Message.content.toLowerCase();

        if (
            body.includes("airsense") ||
            body.includes("air sense") ||
            body.includes("remoteid") ||
            body.includes("rid") ||
            body.includes("remote id")
        ) {
            this.tags.push(Checker.TAG.AIRSENSE);
        }

        return Promise.resolve(this);
    }
}

module.exports = Airsense;