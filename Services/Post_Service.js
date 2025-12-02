import PostModel from "../Model/PostModel.js";

class Post_Service {

    // Upload Post
    async uploadPost(postData) {
        try {
            const { Post_url } = postData;

            if (!Post_url) throw new Error('Post URL is required');

            const newPost = new PostModel({
                Post_url
            });

            await newPost.save();
            return newPost;
        } catch (error) {
            throw new Error(error.message || 'Error uploading post');
        }
    }

    // Get All Posts
    async getAllPosts() {
        try {
            const posts = await PostModel.find();

            return posts;
        } catch (error) {
            throw new Error(error.message || 'Error fetching posts');
        }
    }

    async deletePost(postId) {
        try {
            // findByIdAndDelete is used to atomically find and remove the document.
            const result = await PostModel.findByIdAndDelete(postId);

            if (!result) {
                // If result is null, the post ID was valid but not found in the DB.
                throw new Error('Post not found');
            }

            return result;
        } catch (error) {
            // Propagate the specific "Post not found" error or a generic one
            throw new Error(error.message || 'Error deleting post');
        }
    }

}

export default new Post_Service();