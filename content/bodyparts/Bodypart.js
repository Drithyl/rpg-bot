class Bodypart
{
    constructor()
    {
        this.type;
        this.name = "";
    }

    isOfType(type)
    {
        return type === this.type;
    }
}
module.exports = Bodypart;