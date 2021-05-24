const {Router} = require('express');
const CurriculumService = require('../service/CurriculumService');

const router = Router();

const curriculumService = new CurriculumService();

router.post('/', curriculumService.createCurriculum);

router.get('/:resourceId', curriculumService.getCurriculumById);

router.get('/', curriculumService.getAllCurriculums);

router.put('/:resourceId', curriculumService.updateCurriculum);

module.exports = router;