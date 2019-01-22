var skill = null

module.exports = {
    //Set skill builder.
    setSkill: function (skillObj) {
        skill = skillObj
    },
    handler: async function (req , ctx , res) {
        console.time('Processing Time')
        if (skill) {
            let resJson = skill.create()
            resJson.invoke(req, ctx)
                .then(function(skillResponse) {
                    response.status(200).send(skillResponse);
                })
        }else{
            console.log('Skill object is not set.')
            res.status(401).send()
        }
        console.timeEnd("Processing Time")
    }
}