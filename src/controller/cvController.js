const {Router} = require('express');

const router = Router();

router.get('/curriculum/model', (req, res) => {
    res.status(200).json({
        message: "Hello world"
    })
})

module.exports = router;