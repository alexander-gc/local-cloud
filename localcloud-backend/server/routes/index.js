const { Router } = require('express');
const router = Router();

const { content, upload } = require('../controller/index');

router
    .route('/')
    .get((req, res) => {
        res.send('Welcome');
    });

router.
    route('/content/:path?')
    .get(content.getContent);

router.
    route('/upload/:path?')
    .post(upload.postUpload);

module.exports = router;