const mongoose = require('mongoose')

module.exports = function( req, res, next ) {

    let { objectId } = req.params

    if (!mongoose.Types.ObjectId.isValid(objectId)) {
        return next(Error("object id is not valid"));
    }

    return next();

};
