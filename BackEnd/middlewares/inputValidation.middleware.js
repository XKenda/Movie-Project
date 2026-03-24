import Joi from "joi"

export const validate = (req, res, next) => {
    try {

        const {firstName, lastName, email, password, age} = req.body
    
        const user = Joi.object({
            firstName: Joi.string().min(3).required(),
            lastName: Joi.string().min(3).required(),
            email: Joi.string().min(3).email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
            age: Joi.number().min(5).max(100),
            role: Joi.string().optional()
        })

        const { error } = user.validate({firstName, lastName, email, password, age})
        
        if(error) return res.status(409).send(error.message)

        next()
    } catch (e) {
        throw new Error(e.message)
    }
}
