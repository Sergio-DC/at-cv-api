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
            return res.status(400).json({
                error: err.toString()
            });
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
            return res.status(400).json({
                error: err.toString()
            });
        }
    }

    async getAllCurriculums(req, res) {
        try {
            const curriculumDocs = await CurriculumModelODM.find({});
            const setOfCleanCVs = curriculumDocs.reduce((setOfCleanCurriculums ,currentDirtyCurriculum) => {
                setOfCleanCurriculums.push(CvCleaner.cleanCurriculumFromDB(currentDirtyCurriculum));
                return setOfCleanCurriculums;
            }, []);
            res.status(200).json(setOfCleanCVs);
        } catch(err) {
            return res.status(400).json({
                error: err.toString()
            });
        }
    }

    updateCurriculum(req, res) {
        const resourceId = req.params.resourceId;
        const curriculumFormUpdated = req.body;
        
        CurriculumModelODM.updateOne({_id: resourceId}, curriculumFormUpdated,(err, writeOpResult) => {
            if(err)
                return res.status(400).json({
                    error: err.toString()
                });
                
        })

        return res.status(200).json({
            message: 'CV updated'
        })
    }
}

module.exports = CurriculumService;