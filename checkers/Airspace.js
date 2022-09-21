const Checker = require("./_checker");

class Airspace extends Checker {
    async check() {
        const body = this.Message.content.toLowerCase();

        if (
            body.includes("my airspace") ||
            body.includes("my air space") ||
            body.includes("air traffic") ||
            body.includes("adsb receiver") ||
            body.includes("adsb reciever") ||
            body.includes("in my area")
        ) {
            this.tags.push(Checker.TAG.AIRSPACE);
        }

        return Promise.resolve(this);
    }
}

module.exports = Airspace;