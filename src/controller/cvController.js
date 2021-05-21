const {Router} = require('express');
const CurriculimModel = require('../model/CurriculumModel');

const router = Router();

router.post('/', async(req, res) => {
    
    const curriculumModel = new CurriculimModel({
        firstName: 'Sergio',
        phoneNumber: '7222160908',
        skills: [{
            name: 'Java', percentage: 95
        }]
    });

    try {
        const curriculumDoc = await curriculumModel.save();
        res.status(201).json({
            message: 'CV saved',
            curriculumDoc
        })
    }catch(err) {
        throw new Error("It was impossible to save the CV");
    }
})


//Get a CV by ID
router.get('/:resourceId', async(req, res) => {
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
})
//Get all the CVs
router.get('/', async(req, res) => {
    try {
        const curriculumDocs = await CurriculimModel.find({});
        res.status(200).json({
            message: 'CV info',
            curriculumDocs
        }) 
    } catch {
        throw new Error(`The CV with ${curriculumId} does not exist`);
    }
})

module.exports = router;