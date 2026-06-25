const axios = require("axios");

const BLOG_URL = "http://localhost:4000/blogs";

async function getBlogById(id) {
    const res = await axios.get(`${BLOG_URL}/${id}`);
    return res.data;
}

async function getBlogBySlug(slug) {
    console.log(slug);

    const res = await axios.get(`${BLOG_URL}?slug=${slug}`);
    return res.data[0];
}

async function createBlog(blog) {
    const res = await axios.post(BLOG_URL, blog);
    return res.data;
}

async function updateBlog(id, data) {
    const res = await axios.patch(`${BLOG_URL}/${id}`, data);
    console.log(res, "Mehul here");

    return res.data;
}

async function deleteBlog(id) {
    await axios.delete(`${BLOG_URL}/${id}`);
}

module.exports = {
    getBlogById,
    getBlogBySlug,
    createBlog,
    updateBlog,
    deleteBlog,
};