<template>
  <div class="main-panel container pd20">
    <div class="notify-list">
      <div v-for="notifyItem in notifyItems" class="notify-item">
        <div class="notify-item-time">
          {{ notifyItem.createdAt | formatDate}}
        </div>
        <div class="notify-item-content" :class="{highlight:!notifyItem.viewed}">
          <router-link v-if="notifyItem.action.startsWith('USER')"
                       :to="{name:'userProfile',params:{userId:notifyItem.actor.id}}"
                       v-text="notifyItem.actor.name" class="link">

          </router-link>
          {{ notifyItem.verb }}
          <router-link v-if="/(ANSWER|QUESTION)$/i.test(notifyItem.action)"
                       :to="{name:'questionDetail',params:{questionId:notifyItem.target.id}}"
                       v-text="notifyItem.target.title" class="link"
                       @click.native="updateViewedStatus(notifyItem.id)">
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import requestByPage from '@/mixins/requestByPage'

  export default {
    name: 'UserNotification',
    mixins: [requestByPage],
    data() {
      return {
        notifyItems: []
      }
    },
    computed: {
      ...mapGetters([
        'loggedInUserId'
      ]),
    },
    methods: {
      updateViewedStatus(id) {
        this.$api.updateNotification(id, {viewded: true})
      }
    },
    async created() {
      this.$store.dispatch('ChangeNavHeader', {type: 'title', title: '通知提醒'});
      this.initRequestByPage({
        datasetKey: 'notifyItems',
        request: this.$api.getNotifications,
        adapter(items) {
          return items.map((item) => {
            item.verb = item.tpl.replace(/{}/g, '');
            return item;
          })
        }
      })
    },
  }
</script>

<style scoped lang="scss">
  .notify-item {
    border-radius: 3px;
    border-bottom: 1px solid #ddd;
    margin-bottom: 20px;
  }

  .notify-item-time {
  }

  .notify-item-content {
    padding: 10px;
  }

  .highlight {
    background: #f6f6f6;
    .link {
      font-weight: bold;
    }
  }
</style>
