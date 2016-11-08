import fs from 'fs';

module.exports = (req, res, next) => {
    return res.sendFile('robots.txt', { root: 'mobile_web/files' });
};