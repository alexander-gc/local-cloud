const { Router } = require('express');
const router = Router();
const fileUpload = require('express-fileupload');

const { content, upload, mkdir, download } = require('../controller/index');

router
    .route('/')
    .get((req, res) => {
        res.send('Welcome');
    });

router.route('/content/:path?').get(content.getContent);

router.route('/upload/:path?').post(fileUpload(), upload.postUpload);

router.route('/mkdir/:path?').post(mkdir.createDir);

router.route('/download/:path').get(download.getDownload);

module.exports = router;