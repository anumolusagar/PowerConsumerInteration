
var router = require('express').Router(); 

router.post('/login', function(req, res) { 
    res.send({'result':true});
});

module.exports = router; 