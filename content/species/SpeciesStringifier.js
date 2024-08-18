module.exports.listBodyparts = (species) =>
{
    const bodyparts = {};
    let list = "";

    species.body.bodyparts.forEach((bodypart) =>
    {
        console.log(bodypart);
        const name = bodypart.name;

        if (bodyparts[name] == null)
            bodyparts[name] = 1;

        else bodyparts[name]++;
    });

    for (const name in bodyparts)
    {
        const count = bodyparts[name];

        list += `${count}x ${name}\n`;
    }

    return list;
};