const mongoose = require('mongoose');
const {Schema, Types, model} = mongoose;

const curriculumSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: false
    },
    job: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: false
    },
    country: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false 
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    skills: [
        {
            name: String,
            percentage: {
                type: Number,
                required: function() {
                return this.name != null;
                } 
            },
        }
    ],
    languages: [
        {
            name: String,
            percentage: {
                type: Number,
                required: function() {
                    return this.name != null;
                }
            }
        }
    ],
    workexperience: [
        {
            title: String,
            company: {
                type: String,
                required: function() {
                    return this.title != null;
                }
            },
            from: {
                type: String,
                required: function() {
                    return this.title != null;
                }
            },
            to: {
                type: String,
                required: function() {
                    return this.title != null;
                }
            },
            current: {
                type: Boolean,
                required: function() {
                    return this.title != null;
                }
            },
            description: {
                type: String,
                required: function() {
                    return this.title != null;
                }
            }
        }
    ],
    education: [
        {
            name: String,
            career: String,
            from: String,
            to: String,
            forever: Boolean,
            degree: String
        }
    ],
    socialMedia: {
        facebook: String,
        instagram: String,
        snapchat: String,
        pinterest: String,
        twitter: String,
        linkedin: String,
    },
    challenges: [
        {
            name: String,
            date: String,
            description: String,
            url: String,
        }
    ],
    config: {
        color: String,
        fontFamily: String,
        genericFamily: String
    }
})

module.exports = model("Curriculum", curriculumSchema);
