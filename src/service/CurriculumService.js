const CurriculumModelODM = require('../model-odm/CurriculumModelODM');
const express = require('express');
const {request, response} = express;

class CurriculumService {
    
    async createCurriculum(req = request, res = response) {
        const curriculumJSON = req.body;
        try {
            const curriculumModelODM = new CurriculumModelODM(curriculumJSON);
            const curriculumDoc = await curriculumModelODM.save();
            return res.status(201).json({
                message: 'CV saved',
                curriculumDoc
            })
        }catch(err) {
            console.log("It was impossible to save the CV: ", err);
        }
    }

    async getCurriculumById(req, res) {
        const curriculumId = req.params.resourceId;
        try {
            const curriculumDoc = await CurriculimModel.findById(curriculumId);
            res.status(200).json({
                message: 'CV info',
                curriculumDoc
            }) 
        } catch {
            throw new Error(`The CV with ${curriculumId} does not exist`);
        }
    }

    async getAllCurriculums(req, res) {
        try {
            const curriculumDocs = await CurriculimModel.find({});
            res.status(200).json({
                message: 'CV info',
                curriculumDocs
            }) 
        } catch {
            throw new Error(`The CV with ${curriculumId} does not exist`);
        }
    }

    async updateCurriculum(req, res) {

    }
}

module.exports = CurriculumService;