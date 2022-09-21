class Checker {

    static TAG = {
        SWEDEN: 1,
        AIRSPACE: 2,
        TESLA: 3,
        AIRPLANE: 4,
        STOCKS: 5,
        SPACEX: 6,
        ATANDT: 7,
        GEOFENCE: 8,
        AGE: 9,
        NOD: 10,
        AIRSENSE: 11
    }


    constructor(Message) {
        this.Message = Message;
        this.tags = [];
    }

    async check() {
        throw new Error("Not implemented");
    }

    results() {
        return this.tags;
    }

    getResultNames() {
        return this.tags.map(tag => Object.keys(Checker.TAG).find(key => Checker.TAG[key] === tag));
    }

}

module.exports = Checker;