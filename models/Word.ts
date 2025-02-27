import mongoose from "mongoose";

const WordSchema = new mongoose.Schema({
    word : {
        type : String,
        required : true,
        unique : true,
    }
})

export default mongoose.models.Word || mongoose.model('Word', WordSchema);

