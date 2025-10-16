const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { renderHome, handleCSVUpload, handleSearch } = require('../controllers/viewController');

router.get('/', renderHome);
router.post('/upload', (req, res, next) => {
    upload.single('file')(req, res, (err) => {
        if (err) {
        
            if (err.message === 'Only CSV files are allowed') {
                return res.status(400).render('home', { 
                products: [], 
                message: null, 
                error: '❌ Only CSV files are allowed!' 
                });
            }
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).render('home', { 
                products: [], 
                message: null, 
                error: '❌ File too large! Max size is 5MB.' 
                });
            }

            
            return res.status(400).render('home', { 
                products: [], 
                message: null, 
                error: `❌ Upload failed: ${err.message}` 
            });
        }        
        next();
    });
}, handleCSVUpload);

router.get('/search', handleSearch);

module.exports = router;
