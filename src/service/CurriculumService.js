const CurriculumModelODM = require('../model-odm/CurriculumModelODM');
const express = require('express');
const {request, response} = express;
const { CvCleaner } = require('../utils/CvCleaner')

class CurriculumService {
    
    async createCurriculum(req = request, res = response) {
        const curriculumJSON = req.body;
        try {
            const curriculumModelODM = new CurriculumModelODM(curriculumJSON);
            const curriculumDoc = await curriculumModelODM.save();
            return res.status(200).json({
                resourceId: curriculumDoc.id
            })
        }catch(err) {
            console.log("It was impossible to save the CV: ", err);
        }
    }

    async getCurriculumById(req, res) {
        const curriculumId = req.params.resourceId;
        try {
            const curriculumDoc = await CurriculumModelODM.findById(curriculumId);
            const curriculumResponse = CvCleaner.cleanCurriculumFromDB(curriculumDoc);
            res.status(200).json(
                curriculumResponse    
            ) 
        } catch(err) {
            console.log(`The CV with id ${curriculumId} does not exist: `, err);
        }
    }

    async getAllCurriculums(req, res) {
        try {
            const curriculumDocs = await CurriculumModelODM.find({});
            res.status(200).json({
                message: 'CV info',
                curriculumDocs
            }) 
        } catch(err) {
            console.log('Ther are no CVs: ', err);
        }
    }

    updateCurriculum(req, res) {
        const resourceId = req.params.resourceId;
        const curriculumFormUpdated = req.body;
        
        CurriculumModelODM.updateOne({_id: resourceId}, curriculumFormUpdated,(err, writeOpResult) => {
            if(err)
                console.log('The CV cannot be updated: ', err);
            console.log('WriteOpResult: ', writeOpResult);
        })

        res.status(200).json({
            message: 'CV updated'
        })
    }
}

module.exports = CurriculumService;