module.exports = {
    multi: (arr) => {
        return arr.map(arr => arr.toObject());
    },
    mongooseToObject: (mongoose) => {
        return mongoose ? mongoose.toObject() : mongoose;
    }
};