import Post_Service from "../Services/Post_Service.js";

class Post_Controller {

    // Upload Post
    async uploadPost(req, res) {
        try {
            const postData = req.body;
            const result = await Post_Service.uploadPost(postData);

            res.status(201).json({
                success: true,
                message: 'Post uploaded successfully',
                data: result
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // View All Posts
    async getAllPosts(req, res) {
        try {
            const posts = await Post_Service.getAllPosts();

            res.status(200).json({
                success: true,
                count: posts.length,
                data: posts
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    async deletePost(req, res) {
        try {
            const { id } = req.params; // Get the ID from the URL parameter

            await Post_Service.deletePost(id);

            res.status(200).json({
                success: true,
                message: 'Post deleted successfully'
            });

        } catch (error) {
            // Handle specific "Post not found" for a 404 or generic 500
            const statusCode = error.message === 'Post not found' ? 404 : 500;

            res.status(statusCode).json({
                success: false,
                message: error.message
            });
        }
    }
}

export default new Post_Controller();