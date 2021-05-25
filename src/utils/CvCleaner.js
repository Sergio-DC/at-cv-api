class CvCleaner {
    /**
     * Clean an entry curriculum document from mongo db
     * @param {object} curriculumDoc mongoose document that contains curriculum info 
     * @returns a curriculum object with relevant attributes
     */
    static cleanCurriculumFromDB(curriculumDoc) {
        return Object.keys(curriculumDoc._doc).reduce((cleanCV, key) => {
            if(key != '_id' && key != '__v') {
                //Distinguish arrays from (objects || primitives)
                if( Array.isArray(curriculumDoc[key]) ) {
                    const cleanArray = curriculumDoc[key].map((dirtyEntryObj, index) => {
                        const cleanEntryObj = Object.keys(dirtyEntryObj._doc).reduce((cleanObj, key) => {
                            if(key != '_id')
                                cleanObj[key] = dirtyEntryObj[key];
                            return cleanObj
                        }, {});
                        return cleanEntryObj;
                    }, {})
                    cleanCV[key] = cleanArray;
                    return cleanCV;
                }
                //Objects && Primitives
                cleanCV[key] = curriculumDoc[key];
            }
            return cleanCV;
            
        }, {})
    }
}

module.exports = { CvCleaner }