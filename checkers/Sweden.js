const Checker = require("./_checker");

class Sweden extends Checker {
    async check() {
        const body = this.Message.content.toLowerCase();

        if (body.includes("sweden") || body.includes("swedish")) {
            this.tags.push(Checker.TAG.SWEDEN);
        }

        return Promise.resolve(this);
    }
}

module.exports = Sweden;