const Checker = require("./_checker");

class Spacex extends Checker {
    async check() {
        const body = this.Message.content.toLowerCase();

        if (body.includes("spacex") || body.includes("starlink")) {
            this.tags.push(Checker.TAG.SPACEX);
        }

        return Promise.resolve(this);
    }
}

module.exports = Spacex;