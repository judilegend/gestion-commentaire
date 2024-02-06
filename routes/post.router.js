const express = require('express');
const { setPosts, getPosts, editPost,getOnePost, deletePost, likerPost, DislikerPost } = require('../controllers/post.controller');
const requireAuth = require('../middleware/requireAuth')
const router = express.Router();
//protect all routes before everything
router.use(requireAuth)

router.get("/get", getPosts)
router.get("/getOne/:id", getOnePost)
router.post("/", setPosts)
router.put("/:id", editPost)
router.delete("/:id",deletePost)
router.patch("/like/:id",likerPost)
router.patch("/dislike/:id",DislikerPost )
module.exports = router;
