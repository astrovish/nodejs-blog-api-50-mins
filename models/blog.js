const mongoose = require("mongoose");
const { default: slugify } = require("slugify");

const blogSchema = new mongoose.Schema({
    title: {
        desc: "Title of a blog.",
        trim: true,
        type: String,
        required: true
    },
    body: {
        desc: "Description of a blog.",
        trim: true,
        type: String,
        required: true
    },
    userId: {
        desc: "User id who create a blog.",
        type: Number,
        default: 4,
        required: true
    },
    slug: {
        desc: "Pretty url for SEO purpose.",
        type: String,
        required: true,
        unique: true
    }
})

blogSchema.pre("validate", function(next) {
    if( this.title ) {
        this.slug = slugify(this.title, {
            lower: true,
            strict: true
        })
    }
    next();
})

module.exports = mongoose.model("Blog", blogSchema);
