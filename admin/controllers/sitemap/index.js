import express from 'express';
let router = express.Router();

import googleSitemap from './googleSitemap';

router.route('/sitemap.xml')
    .get(googleSitemap);

module.exports = router;