const express = require("express");
const Post = require("../model/postModel");
const postRouter = express.Router();
const auth = require("../middleware/authMiddleware");


postRouter.get("/", async (req, res) => {
  // console.log("coming in postroute");
  try {
    const posts = await Post.find({});
    await res.status(200).json(posts);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

postRouter.get("/:postID", async (req, res) => {
  const  postID  = req.params.postID;
  console.log(postID)
  try {
    const post = await Post.findOne({ _id: postID });
    // console.log(recipe);
    if (post) {
      return res.status(200).json({ Messsage: "post",post});
    } else {
      return res.status(404).json({ msg: `movie not found...!!` });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});


postRouter.delete("/:postID", auth, async (req, res) => {
  const { postID } = req.params;
  const post = await Post.findOne({ _id: postID });
  try {
    if (post) {
      const deletedPost = await Post.findByIdAndDelete({
        _id: postID,
      });
      return res.status(200).json({ msg: "Movie deleted", deletedPost});
    } else {
      return res.status(404).json({ msg: `movie not found...!!` });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});


postRouter.delete("/:postID", auth, async (req, res) => {
  const { recipeID } = req.params;
  const { userID } = req.body;
  const recipe = await RecipeModel.findOne({ _id: recipeID });

  try {
    if (recipe) {
      if (userID === String(recipe.createdBy)) {
        const updatedRecipe = await RecipeModel.findByIdAndUpdate(
          { _id: recipeID },
          req.body,
          { new: true }
        );
        return res.status(200).json({ msg: "Recipe updated", updatedRecipe });
      } else {
        return res
          .status(201)
          .json({ msg: "not authorised to do this operation" });
      }
    } else {
      return res.status(404).json({ msg: `recipe not found...!!` });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});



// postRouter.post("/add", auth, async (req, res) => {
//   try {
//     const { title, body, device } = req.body;
//     const post = await new Post({
//       title,
//       body,
//       device,
//       like: [], // Empty array for 'like'
//       comment: [],
//       creator: req.userId,
//       name: req.username,
//     });

//     console.log(req.userId, "post");
//     await post.save();
//     await post.populate("creator");
//     res.status(200).send(post);
//   } catch (err) {
//     res.status(400).send(err.message);
//   }
// });


postRouter.post("/add", auth, async (req, res) => {
  console.log(req.body,"inside")
  try {
  
    const {
      images,
      name,
      category,
description,
rating,
score,
year,
time
    } = req.body;


    const createdBy = req.body.userID;
    const username =req.body.username;
    console.log(createdBy,"cretor")
    const newPostData = {
      images,
      name,
      category,
      description,
      rating,
      score,
      time,
      like: [], 
      comment: [], 
      year,
      // createdAt: formatDate(Date.now()), 
      createdBy,
      username,
    };
    const newPost= await Post(newPostData);
    await newPost.save();
    // await createdBy.populate()
    return res.status(200).json({ msg: "New movie added", newPost });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});




module.exports=postRouter