'use strict';

const Service = require('../core/base_service');

class TagService extends Service {
  constructor(ctx) {
    super(ctx);
  }
  get modelName() {
    return 'Tag'
  }

  async getTagDetail(tagId,userId) {
    let tag = await this.dao.findOne({
      where: { id: tagId },
      include: [
        {
          model: this.app.model.User,
          attributes: [],
          through: {
            attributes: []
          },
          as: 'follower'
        },
        {
          model: this.app.model.Question,
          as: 'questions',
          include: [{
            model: this.app.model.User,
            as: 'creator'
          }]
        }
      ]
    });
    let [res] = await this.rawQuery('select count(*) as num from user_follow_tag_relation where tag_id=? and user_id=?',tagId,userId);
    let hasFollowed = res.num > 0;
    return this.jsonModel(tag,{hasFollowed});
  }

  async getUserTag(userId) {
     let tags = await this.dao.findAll({
      include: [
        {
          model: this.app.model.User,
          attributes: [],
          through: {
            attributes: []
          },
          as: 'follower',
          where: { id: userId }
        },]
    }
    );
    tags = this.jsonModel(tags);
    return tags.map(tag => {
      tag.hasFollowed = true;
      return tag;
    });
  }

  async getAllTag(userId) {
    let allTags = await this.dao.findAll();

    // hasFollowed followerCount itemCount
    return this.addHasFollowed(allTags,userId);
  }
  async addHasFollowed(allTags,userId){
    allTags = this.jsonModel(allTags);
    let followingTags = await this.getUserTag(userId);
    let mapTag = {};
    followingTags.forEach((tag) => mapTag[tag.id] = true)
    allTags.forEach((tag) => {
      if (mapTag[tag.id]) {
        tag.hasFollowed = true;
      } else {
        tag.hasFollowed = false;
      }
    })
    return allTags;
  }
  async getTagByJoinTable(usertWhere = null) { // no use
    //1. group by 配合 count 直接查出数量 避免1+N
    let tags = await this.dao.findAll({
      group: ['tag.id'],
      attributes: {
        include: [
          [this.app.model.fn('COUNT', this.app.model.col('follower.id')), 'followerCount'],
          [this.app.model.fn('COUNT', this.app.model.col('questions.id')), 'itemCount'],
        ]
      },
      include: [ // 不需要嵌套属性
        {
          model: this.app.model.User,
          attributes: [],
          through: {
            attributes: []
          },
          as: 'follower',
          where: usertWhere
        },
        {
          model: this.app.model.Question,
          attributes: [],
          through: {
            attributes: []
          },
          as: 'questions'
        }
      ]
    });
    return this.jsonModel(tags);
  }
  async queryTagByKeywords(keywords,userId) {
    let tags = await this.dao.findAll({
      where: {
        name: {
          [this.Op.like]: `%${keywords}%`
        }
      }
    });
    return this.addHasFollowed(tags,userId);
  }
  async addFollower(tagId, followerId) {
    let tag = await this.findById(tagId);
    let follower = await this.getService('user').findById(followerId);
    let res = await tag.hasFollower(follower);
    if (res) {
      this.throwError();
    }
    await tag.addFollower(follower);
    await tag.increment('follower_count', { by: 1 });
    await tag.reload();
    return this.jsonModel(tag, { hasFollowed: true });
  }
  async deleteFollower(tagId, followerId) {
    let tag = await this.findById(tagId);
    let follower = await this.getService('user').findById(followerId);
    let res = await tag.hasFollower(follower);
    if (!res) {
      this.throwError();
    }
    await tag.removeFollower(follower);
    await tag.increment('follower_count', { by: -1 });
    await tag.reload();
    return this.jsonModel(tag, { hasFollowed: false });;
  }
}

module.exports = TagService;
