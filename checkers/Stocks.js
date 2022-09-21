const Checker = require("./_checker");

class Stocks extends Checker {
    async check() {
        const body = this.Message.content.toLowerCase();

        if (
            body.includes("wall street") ||
            body.includes("trading") ||
            body.includes("redcat") ||
            body.includes("rcat") ||
            body.includes("low latency") ||
            body.includes("i invented") ||
            body.includes("stock")
        ) {
            this.tags.push(Checker.TAG.SPACEX);
        }

        return Promise.resolve(this);
    }
}

module.exports = Stocks;