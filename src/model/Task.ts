import mongoose, { Schema, Document, Types } from "mongoose";

     interface ITask extends Document  {
        name : string,
        description : string,
        project : Types.ObjectId
}

const TaskSchema : Schema = new Schema({
        name : {
        type : String,
        required : true,
        trim : true
    },

    description : {
        type : String,
        required : true,
        trim : true
    },

    project : {
        type : Types.ObjectId,
        ref : 'Project'
    }

}, {timestamps : true});

const Task = mongoose.model<ITask>('Task', TaskSchema);
export default Task;
export { ITask };

