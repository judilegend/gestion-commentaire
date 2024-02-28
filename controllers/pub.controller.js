const Pubmodel = require('../models/pub.model')
const mongoose = require('mongoose');
const formi = require('formidable');

module.exports.AddPublication = async (req, res) => {
    try {
        if (!req.body.title) {
            res.status(400).json({
                message: "merci d'ajouter un le titre du publication"
            })
        }
        const user_id = req.user._id
        const pub = await Pubmodel.create(
            {
                title: req.body.title,
                image: req.body.image,
                user_id
            }
        )
        res.status(200).json(pub)


    } catch (error) {
        res.status(400).json(error)
    }
}
module.exports.AddPublication1 = async (req, res, next) => {
    const form = formi.formidable({});

    form.parse(req, (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
        res.json({ fields, files });
    });
}