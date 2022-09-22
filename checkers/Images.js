const Checker = require("./_checker");

const knownImages = [
    {
        example: "https://cdn.discordapp.com/attachments/963008588064882728/1019628104563560508/image0.jpg",
        matchOn: {
            size: 1797524,
            width: 1284,
            height: 2200
        },
        tags: [Checker.TAG.AIRSPACE],
    },
    {
        example: "https://cdn.discordapp.com/attachments/1014287601043243079/1021837374809985034/CED4DDD0-9BDF-47A2-AAFD-4F02CC087AD3.jpg",
        matchOn: {
            size: 6494545,
            width: 4832,
            height: 2321
        },
        tags: [Checker.TAG.SWEDEN],
    },
    {
        example: "https://cdn.discordapp.com/attachments/1014287601043243079/1021833851036762233/IMG_1716.png",
        matchOn: {
            name: "IMG_1716.png",
            size: 1507830,
            width: 1840,
            height: 953
        },
        tags: [Checker.TAG.AIRSPACE],
    },
    {
        example: "https://cdn.discordapp.com/attachments/1014287601043243079/1016764841517649941/image0.jpg",
        matchOn: {
            size: 1074811,
            width: 3264,
            height: 2448
        },
        tags: [Checker.TAG.AIRPLANE],
    },
    {
        example: "https://cdn.discordapp.com/attachments/1015671803735191692/1015707183100481647/BCDAFB75-711D-440D-ACDA-C07F4268BCAD.jpg",
        matchOn: {
            size: 1815587,
            width: 2048,
            height: 1536
        },
        tags: [Checker.TAG.AIRPLANE],
    },
    {
        example: "https://cdn.discordapp.com/attachments/1014287601043243079/1021833851036762233/IMG_1716.png",
        matchOn: {
            name: "IMG_1716.png",
            size: 1754249,
            width: 4032,
            height: 3024
        },
        tags: [Checker.TAG.TESLA],
    },
    {
        example: "https://cdn.discordapp.com/attachments/962015635322327050/1009207972527882260/E9A1D85D-DA15-4DF3-9332-9F0E2D1B4FB9.jpg",
        matchOn: {
            size: 806670,
            width: 1280,
            height: 960
        },
        tags: [Checker.TAG.SPACEX],
    },
    {
        example: "https://cdn.discordapp.com/attachments/993263463814148280/1000074059184341052/image0.jpg",
        matchOn: {
            size: 318499,
            width: 1600,
            height: 1200
        },
        tags: [Checker.TAG.AIRPLANE],
    }
]

class Images extends Checker {
    async check() {
        const attachments = this.Message.attachments;
        if (attachments.length === 0) Promise.resolve();

        for (const attachment of attachments) {
            // check each known image and weight the results based on how many matches in matchOn
            // if the image is a match, add the tags to this.tags
            const candidates = [];
            for (const knownImage of knownImages) {
                knownImage.weight = 0;
                for (const key in knownImage.matchOn) {
                    if (attachment[1][key] === knownImage.matchOn[key]) {
                        // add 1 to the weight
                        knownImage.weight++;
                    }
                }

                // make the matches have to be exact, otherwise we get false positives on size - oops
                if (knownImage.weight === Object.keys(knownImage.matchOn).length) {
                    candidates.push(knownImage);
                }

                knownImage.weight = 0;
            }

            // if there are no candidates, continue
            if (candidates.length === 0) return Promise.resolve();

            // sort the candidates by weight
            candidates.sort((a, b) => b.weight - a.weight);

            // add the tags from the top candidate to this.tags
            this.tags.push(...candidates[0].tags);

            return Promise.resolve(this);
        }
    }
}

module.exports = Images;