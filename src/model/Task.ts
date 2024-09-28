import mongoose, { Schema, Document } from "mongoose";

     interface ITask extends Document  {
        name : string
        description : string
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

});

const Task = mongoose.model<ITask>('Task', TaskSchema);
export default Task;
export { ITask };
