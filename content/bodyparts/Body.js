class Body
{
    #bodyparts = new Map();
    #lastBodypartAdded;

    get bodyparts()
    {
        return [ ...this.#bodyparts.keys() ];
    }

    getBodypartType(type)
    {
        return this.bodyparts.filter(part =>
            part.isOfType(type)
        );
    }

    addBodypart(bodypart)
    {
        if (this.#bodyparts.has(bodypart) === false)
            this.#bodyparts.set(bodypart, []);

        this.#lastBodypartAdded = bodypart;
        return this;
    }

    connectTo(...otherBodyparts)
    {
        const connections = this.#bodyparts.get(this.#lastBodypartAdded);
        connections.push(...otherBodyparts);

        otherBodyparts.forEach(bodypart =>
        {
            if (this.#bodyparts.has(bodypart) === false)
                this.#bodyparts.set(bodypart, []);

            this.#bodyparts.get(bodypart).push(this.#lastBodypartAdded);
        });

        return this;
    }

    finish()
    {
        this.#bodyparts.forEach(connections =>
        {
            for (let i = connections.length - 1; i >= 0; i--)
            {
                const connectedPart = connections[i];

                if (this.#bodyparts.has(connectedPart) === false)
                    connections.pop();
            }
        });

        return this;
    }
}
module.exports = Body;