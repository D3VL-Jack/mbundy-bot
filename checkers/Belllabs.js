const Checker = require("./_checker");

class Belllabs extends Checker {
    async check() {
        const body = this.Message.content.toLowerCase();

        if (
            body.includes("bell labs") ||
            body.includes("bell laboratories") ||
            body.includes("the labs")
        ) {
            this.tags.push(Checker.TAG.BELLLABS);
        }

        return Promise.resolve(this);
    }
}

module.exports = Belllabs;