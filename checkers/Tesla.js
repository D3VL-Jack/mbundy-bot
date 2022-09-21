const Checker = require("./_checker");

class Tesla extends Checker {
    async check() {
        const body = this.Message.content.toLowerCase();

        if (body.includes("tesla")) {
            this.tags.push(Checker.TAG.TESLA);
        }

        return Promise.resolve(this);
    }
}

module.exports = Tesla;