const contactModel = require("../models/contact.model")

const contactModelController = {
    getAll: async (req, res) => {
        const { firstname } = req.query
        const getform = await contactModel.find()
        if (!firstname) {
            res.status(200).send(getform)
        }
        else {
            const searched = get.filter((x) =>
                x.firstname.toLowerCase().trim().includes(firstname.toLowerCase().trim())
            )
            res.status(200).send(searched)
        }
    },
    getOne:async(req,res)=>{
        const {id} = req.params
        const newtour = await contactModel.findById(id)
        res.status(200).send(newtour)
      },
    delete: async (req, res) => {
        const id = req.params.id
        const deleteform = await contactModel.findByIdAndDelete(id)
        res.status(200).send(deleteform)
    },
    post: async (req, res) => {
        const { firstname, email, subject,messages } = req.body
        const postform = new contactModel({
            firstname: firstname,
            email: email,
            subject: subject,
            messages: messages
        })
        await postform.save()
        res.status(200).send({
            message: "Posted succefully!",
            payload: postform
        })
    }
}

module.exports = contactModelController;