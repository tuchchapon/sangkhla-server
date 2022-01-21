const mongooose = require("mongoose");

const commentSchema = {

    commentator_name: String,
    commentator_email: String,
    comment_text: String,
    comment_status: String

}
const Comment = mongooose.model('comment', commentSchema);
module.exports = Comment;
