<template>
    <div class="kb-hide-item">
        <div class="kb-post">
            <p class="kb-post-body">{{ post }}</p>
        </div>
        <div class="kb-comment-wrapper">
            <div class="kb-comments" v-for="(comment, index) in comments" :key="index">
                <small class="text-muted mr-2">{{ comment.date }}</small>
                <small class="kb-comment-user"><strong>{{ comment.user }}: </strong>{{ comment.post }}</small>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: [ 'post', 'comments']
}
</script>

<style>
.kb-hide-item{
    padding: 5px 0px 5px 5px;
}
.kb-post {
    border-radius: 25px 0 0 25px;
    background-color: #859595;
    padding: 10px;
    border-top: 2px solid rgb(61,192,236);
    border-left: 2px solid rgb(61,192,236);
    border-bottom: 2px solid rgb(61,192,236);
}
.kb-post-body {
    font-family: roboto, sans-serif;
    color: white;
    padding: 5px;
}
.kb-comment-wrapper {
    background-color: white;
    padding: 10px;
    margin-left: 25px;
    border-radius: 0 0 0 25px;
    border-left: 3px solid #859595;
    border-bottom: 3px solid #859595;
}
.kb-comments {
    text-align: left;
    vertical-align: text-top;
    font-family: roboto, sans-serif;
    padding: 1% 1% 1% 5%;
    font-size: 1em;
    margin-top: 5px;
    border-radius: 25px;
    background-color: rgba(133,149,149, 0.3);
}
</style>
