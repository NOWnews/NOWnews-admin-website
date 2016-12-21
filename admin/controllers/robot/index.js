import express from 'express';
import path from 'path';
import pageFile from './page.file';

let router = express.Router();


router.route('/')
    .get(pageFile);

module.exports = router;
