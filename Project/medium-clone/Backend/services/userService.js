const axios = require("axios");

const DB_URL = "http://localhost:4000/users";

async function findUserByEmail(email) {
    const response = await axios.get(`${DB_URL}?email=${email}`);

    return response.data[0];
}

async function findUserById(id) {
    const response = await axios.get(`${DB_URL}/${id}`);

    return response.data;
}

async function updateBlogsIds(userId, blogId) {
    const user = await axios.get(`${DB_URL}/${userId}`);
    const updatedBlogIds = [...user.data.blogIds, blogId];

    const response = await axios.patch(`${DB_URL}/${user.data.id}`, { blogIds: updatedBlogIds })

    return response.data;
}

async function addLikedBlog(userId, blogId) {
    const user = await axios.get(`${DB_URL}/${userId}`);
    const updatedLikedBlogs = [...user.data.likedBlogs, blogId];
    const response = await axios.patch(`${DB_URL}/${user.data.id}`, { likedBlogs: updatedLikedBlogs })
    return response.data;
}

async function createUser(user) {
    const response = await axios.post(DB_URL, user);

    return response.data;
}

module.exports = {
    findUserByEmail,
    createUser,
    updateBlogsIds,
    findUserById,
    addLikedBlog

};