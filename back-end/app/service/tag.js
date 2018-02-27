'use strict';

const Service = require('../core/base_service');

class TagService extends Service {
  constructor(ctx){
    super(ctx);
  }
  get modelName(){
    return 'Tag'
  }

  async getTagByUser(userId){
    let user = await this.getService('user').findById(userId);
    let tags = await user.getFollowingTag();
    return tags;
  }
  async getAllTag(userId){
    let tags = await this.dao.findAll({raw:true});
    let followingTags = await this.getTagByUser(user);
    let mapTag = {};
    followingTags.forEach((tag)=>{mapTag[tag.id]=true; })
    tags.forEach((tag)=>{
      if(mapTag[tag.id]){
        tag.isSubscribe = true;
      }else{
        tag.isSubscribe = false;
      }
    })
    // isSubscribe subscribersCount entryCount
    return tags;
  }
  async addFollower(tagId,followerId){
    let tag = await this.findById(tagId);
    let follower = await this.getService('user').findById(followerId);
    let res = await tag.hasFollower(follower);
    if (res) {
      this.throwError();
    }
    tag.addFollower(follower);
  }
  async deleteFollower(tagId,followerId){
    let tag = await this.findById(tagId);
    let follower = await this.getService('user').findById(followerId);
    let res = await tag.hasFollower(follower);
    if (!res) {
      this.throwError();
    }
    tag.deleteFollower(follower);
  }
}

module.exports = TagService;
