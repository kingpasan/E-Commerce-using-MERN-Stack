const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const Product = require("../models/product");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.create = (req, res) => {

    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, field, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        }

        const { name, description, price, category, quantity, shipping } = field;

        //validation to product
        if(!name || !description || !!price || !category || !quantity || !shipping){
            return res.status(400).json({
                error: 'All fields are required!'
            });
        }

        let product = new Product(field);

        if (files.photo) {

            if (files.photo.size > 5000000) {
                return res.status(400).json({
                    error: 'Image should be less than 5mb in file size'
                });
            }

            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }

        product.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }

            res.json(result);
        });
    });
}