<template>
  <div class="post-wrapper" title>
    <app-save-article
      v-if="createKB"
      @close="createKB = false"
      @saved="markSaved"
      :url="url"
      :title="title"
      :comments="comments_"
      :body="body"
      :currentUserId="currentUserId"
      :poster="user"
      :postId="_id"
      type="content"
      :date="date"
      :image="image"
    />
    <div class="content-bottom">
      <div class="post-userinfo">
        <div class="post-img-container">
          <!--profilepic-->
          <img
            v-if="user.picture"
            class="img-fluid user-prof-img"
            :src="user.picture"
            :alt="userName"
          >
          <img v-else class="img-fluid user-prof-img" src="@/assets/user-icon.png" :alt="userName">
        </div>
        <div class="post-details">
          <!--username w link to profile @click-->
          <router-link class="post-username" :to="`/user/${user._id}`">{{ userName }}</router-link>
          <!--date-->
          <h3 class="post-date">{{ formattedDate }}</h3>
        </div>
        <div class="post-edit-menu">
          <div v-if="user._id === currentUserId && (edit || remove) === false">
            <!--insert menu component here-->
            <app-update-post @edit="editPost" @remove="deletePost"/>
          </div>
          <div class="text-right" v-if="(edit || remove) === true">
            <button class="btn btn-danger" v-if="remove === true" @click="purgePost">
              <i class="fas fa-trash-alt"></i>
            </button>
            <span @click="returnOptions" class="dropbtn">
              <i class="fas fa-chevron-right"></i>
            </span>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="input-group edit-post-group" v-if="edit">
            <textarea class="edit-post-text form-control" v-model="updatedPost"></textarea>
            <div class="input-group-append">
              <button
                class="btn btn-outline-secondary edit-post-button"
                type="button"
                @click="updatePost"
              >Update</button>
            </div>
          </div>
          <p v-else class="post-text" v-html="getAnchorTag()"></p>
          <div
            class="media content-media-wrapper img-thumbnail"
            v-if="title && (image || description)"
          >
            <img :src="image" class="img-thumbnail desc-image" alt="Site image">
            <div class="media-body content-desc">
              <h5>
                <a :href="url" target="_blank" class="mt-0 content-link">{{ title }}</a>
              </h5>
              {{ description }}
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col text-center">
          <!--post likes-->
          <span v-if="liked" @click="unlike()">
            <i class="fas fa-heart post-icon"></i>
          </span>
          <span v-else @click="like()">
            <i class="far fa-heart post-icon"></i>
          </span>
          <small class="post-icon-text">{{ likeCount }} Likes</small>
        </div>
        <div class="col text-center">
          <!--KB add button-->
          <span v-if="saved" @click="removeFromKB()">
            <i class="fas fa-bookmark post-icon"></i>
            <small class="post-icon-text">Saved</small>
          </span>
          <span v-else @click="addToKB()">
            <i class="far fa-bookmark post-icon"></i>
            <small class="post-icon-text">Save</small>
          </span>
        </div>
        <div class="col text-center">
          <!--comment count + @click for expand-->
          <a
            class="comments"
            href="#"
            @click="expandComments === false ? expandComments = true : expandComments = false"
          >
            <i class="far fa-comment post-icon"></i>
            <small class="post-icon-text">Comments ({{ commentCount }})</small>
          </a>
        </div>
      </div>
      <div class="row">
        <div class="col p-0 m-0">
          <!--comment section only shown on collapse - external component -->
          <app-post-comments
            :comments="comments_"
            v-if="expandComments"
            :currentUserId="currentUserId"
            :postId="_id"
            @comment-removed="refreshComments"
          />
          <app-new-comment v-if="expandComments" :postId="_id" @commentAdded="refreshComments"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Comments from "@/components/dashboard/Comment";
import linkifyHtml from "linkifyjs/html";
import NewComment from "@/components/forms/NewComment";
import moment from "moment";
import SaveToKb from "@/components/modals/SaveArticle";
import api from "../../utils/api.js";
import UpdatePost from "@/components/menus/UpdatePost";
export default {
  props: [
    "user",
    "body",
    "date",
    "likes",
    "comments",
    "title",
    "url",
    "image",
    "description",
    "_id",
    "currentUserId",
    "currentUserKB"
  ],
  data() {
    return {
      liked: this.$props.likes.indexOf(this.currentUserId) > -1,
      expandComments: false,
      saved: false,
      likeCount: this.likes ? this.likes.length : 0,
      userName: this.user.firstName + " " + this.user.lastName,
      formattedDate: this.date
        ? moment(this.date).format("MM/DD/YY - hh:mm a")
        : "",
      createKB: false,
      edit: false,
      remove: false,
      updatedPost: this.$props.body,
      body_: this.$props.body,
      comments_: this.$props.comments
    };
  },
  computed: {
    commentCount() {
      return this.comments_ ? this.comments_.length : 0;
    }
  },
  components: {
    appPostComments: Comments,
    appNewComment: NewComment,
    appSaveArticle: SaveToKb,
    appUpdatePost: UpdatePost
  },
  methods: {
    returnOptions() {
      this.remove = false;
      this.edit = false;
    },
    like() {
      const self = this;
      api.posts.like(this._id).then(res => {
        self.likeCount++;
        self.liked = true;
      });
    },
    unlike() {
      const self = this;
      api.posts.unlike(this._id).then(res => {
        self.likeCount--;
        self.liked = false;
      });
    },
    addToKB() {
      this.createKB = true;
    },
    markSaved(newKbItem) {
      this.createKB = false;
      this.saved = true;
      this.$emit("saved", newKbItem);
    },
    getAnchorTag() {
      var options = {
        className: "text-link",
        format: function(value, type) {
          if (type === "url" && value.length > 25) {
            value = value.slice(0, 25) + "…";
          }
          return value;
        }
      };
      var str = this.$props.body;
      return linkifyHtml(str, options);
    },
    editPost() {
      this.edit = true;
    },
    deletePost() {
      this.remove = true;
    },
    updatePost() {
      //send this.body to db as the new text to be rerendered
      api.posts
        .updatePost(this.$props._id, this.updatedPost)
        .then(res => {
          if (res.status === 200) {
            this.body_ = this.updatedPost;
          }
        })

      this.edit = false;
      this.remove = false;

      this.edit = false;
      this.remove = false;
    },
    purgePost() {
      //remove this post from DB forever
      this.edit = false;
      this.remove = false;
      api.posts.deletePost(this.$props._id).then(res => {
        if (res.data.n) this.$emit("post-deleted");
      });
    },
    refreshComments(updatedPost) {
      this.comments_ = updatedPost.comments;
      if (updatedPost.body !== this.body_) this.body_ = updatedPost.body;
    }
  },
  created() {
    const currentUserKB = this.$props.currentUserKB;
    for (var i = 0; i < currentUserKB.length; i++) {
      if (currentUserKB[i].post === this.$props._id) return (this.saved = true);
    }
  }
};
</script>

<style>
.post-wrapper {
  margin: 10px;
  padding: 0px 0px 5px 0px;
  background-color: white;
  border-radius: 25px;
  border: 4px solid #3dc0ec;
  -webkit-box-shadow: 0px 14px 27px -13px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 14px 27px -13px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 14px 27px -13px rgba(0, 0, 0, 0.75);
  overflow-wrap: break-word;
}
.post-userinfo {
  padding: 5px 1px 5px 5px;
  margin-top: 10px;
}
.user-prof-img {
  border-radius: 100%;
  height: 100%;
  width: 100%;
}
.post-img-container {
  border-radius: 100%;
  height: 60px;
  width: 60px;
  display: inline-block;
  vertical-align: top;
}
.btn-danger {
  border-radius: 100px;
  font-family: roboto, sans-serif;
}
.post-details {
  margin-top: 10px;
  display: inline-block;
  padding-left: 15px;
}
.post-edit-menu {
  float: right;
  margin-right: -17px;
}
textarea.edit-post-text {
  resize: none;
}
textarea.edit-post-text:focus {
  outline: none;
  box-shadow: none;
}
.edit-post-group {
  width: 96.5%;
  margin: 10px 30px 25px 10px;
}
.edit-post-button {
  background-color: #3dc0ec;
  color: white;
  border: none;
  font-family: roboto, sans-serif;
}
.edit-post-button:focus {
  background-color: #859595;
}
.edit-post-button:hover {
  background-color: #859595;
}
.text-link {
  color: #3dc0ec;
}
.text-link:hover {
  color: #3dc0ec;
  text-decoration: none;
}
.content-media-wrapper {
  margin: 10px 30px 25px 10px;
  background-color: rgba(133, 149, 149, 0.2);
}
.content-link {
  color: #3dc0ec;
  font-family: roboto, sans-serif;
  font-size: 1em;
}
.content-link:hover {
  color: #3dc0ec;
}
.content-desc {
  padding: 10px;
  margin: 0 !important;
  font-family: roboto, sans-serif;
  text-align: left;
  color: black;
  font-size: 0.75em;
}
.desc-image {
  width: 15%;
  min-width: 80px;
  margin-top: 10px;
}
.content-top {
  padding: 0 !important;
  margin: 0 !important;
}
.content-bottom {
  padding: 10px 10px 0 10px;
}
.post-username {
  font-family: alternate-gothic-no-1-d, sans-serif;
  color: #3dc0ec;
  font-size: 2em;
  line-height: 1;
}
.post-username:hover {
  color: #3dc0ec;
  text-decoration: none;
}
.post-date {
  font-family: roboto, sans-serif;
  color: #859595;
  font-size: 0.75em;
}
.post-text {
  padding: 10px;
  font-family: roboto, sans-serif;
  white-space: pre-line;
}
.post-title {
  padding: 10px 10px 0 10px;
  font-family: roboto, sans-serif;
  color: #859595;
  font-weight: bold;
}
.post-icon {
  color: #3dc0ec;
  font-size: 1em;
  margin-right: 2px;
}
.post-icon-text {
  color: #3dc0ec;
  font-family: roboto, sans-serif;
  font-size: 1em;
}
.comments:hover {
  text-decoration: none;
}
/* higher resolution laptops */
/* @media (min-width: 1025px) and (max-width: 1600px) { */
  .post-userinfo {
    margin-left: 1px !important;
  }
  .post-icon-text {
    font-size: 0.75em;
  }
  .post-icon {
    font-size: 0.75em;
  }
/* } */
@media (max-width: 440px) {
  .content-media-wrapper {
    margin-right: 10px;
  }
}
@media (max-width: 359px) {
  .content-media-wrapper {
    margin: 0 0 15px;
  }
  .media-body.content-desc {
    display: inline-block;
    width: 100%;
    overflow-wrap: break-word;
  }
  .content-bottom > .row {
    width: 100%;
    margin: 0;
  }
  .content-bottom .col {
    padding: 0;
  }
}
</style>
