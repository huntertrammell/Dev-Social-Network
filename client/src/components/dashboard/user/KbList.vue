<template>
    <div class="kb-item grid-item">
        <div class="kb-show">
            <i class="kb-icon fas fa-chevron-circle-down" @click="kbExpand = false ? kbExpand === true : kbExpand === false"></i>
            <a class="kb-title" :href="link" target="_blank">{{ title }}</a>
        </div>
        <div class="kb-hide">
            <transition name="bounce">
                <app-kb-comment
                    v-if="kbExpand" 
                    :post="post"
                    :comments="comments"
                />
            </transition>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
import KbComments from '@/components/dashboard/profile/KbComments'
export default {
    props: ['title', 'link', 'post', 'comments'],
    data(){
        return {
            kbExpand: false,
        }
    },
    components: {
        appKbComment: KbComments
    }
}
</script>

<style>
.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
.kb-item {
    margin: 10px;
    padding: 10px 0 10px 10px;
    border-radius: 25px 0 0 25px;
    border: 3px solid rgb(61,192,236);
    background-color: rgba(61,192,236, 0.6); 
    -webkit-box-shadow: 0px 14px 30px -10px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 14px 30px -10px rgba(0,0,0,0.75);
    box-shadow: 0px 14px 30px -10px rgba(0,0,0,0.75);
}
.kb-show{
    padding: 5px;
}
.kb-icon {
    color: white;
    font-size: 1.25em;
    padding-right: 10px;
}
.kb-title {
    color:  white;
    font-family: roboto, sans-serif;
    font-size: 1.75em;
}
.kb-title:hover {
    color:  white;
}
</style>
