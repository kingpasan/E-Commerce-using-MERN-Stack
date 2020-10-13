const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const Product = require("../models/product");
const { errorHandler } = require("../helpers/dbErrorHandler");


exports.productByID = (req, res, next, id) =>{
    Product.findById(id).exec((err, product)=>{
        if(err || !product){
            return res.status(400).json({
                error: 'Product not found!'
            });
        }

        req.product = product;
        next();
    });
};

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
        if(!name || !description || !price || !category || !quantity || !shipping){
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
};


exports.read = (req, res) =>{

    req.product.photo = undefined;

    return res.json(req.product);

};

exports.remove = (req, res) => {
    let product = req.product;

    product.remove((err, deletedProduct)=>{
        if(err)
        {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }

        res.json({
            message: "Product deleted successfully!"
        });
    })
};


exports.update = (req, res) =>{

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
        if(!name || !description || !price || !category || !quantity || !shipping){
            return res.status(400).json({
                error: 'All fields are required!'
            });
        }

        let product = req.product;
        product = _.extend(product, field);

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

};