'use strict';

const Service = require('../core/base_service');

class TagService extends Service {
  constructor(ctx) {
    super(ctx);
  }
  get modelName() {
    return 'Tag'
  }

  async getTagDetail(tagId, userId, page) {
    let tag = await this.dao.findOne({
      subQuery: false,
      ...page,
      where: { id: tagId },
      include: [
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
    if (tag == null) {
      return null;
    }
    let [row] = await this.rawQuery(
      ' select count(*) as num from user_follow_tag_relation where tag_id=? and user_id=?',
      tagId, userId);
    let hasFollowed = row.num > 0;
    return this.jsonModel(tag, { hasFollowed });
  }

  async getUserTag(userId, page) {
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
        },],
      ...page
    });
    tags = this.jsonModel(tags);
    return tags.map(tag => {
      tag.hasFollowed = true;
      return tag;
    });
  }

  async getAllTag(userId, page) {
    let allTags = await this.dao.findAll({
      ...page,
    });

    // hasFollowed followerCount itemCount
    return this.addHasFollowed(allTags, userId);
  }
  async addHasFollowed(allTags, userId) {
    allTags = this.jsonModel(allTags);
    let followingTags = await this.getUserTag(userId);
    let followingTagsMap = {};
    followingTags.forEach((tag) => followingTagsMap[tag.id] = true)
    allTags.forEach((tag) => {
      if (followingTagsMap[tag.id]) {
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
  async queryTagByKeywords(keywords, userId, page) {
    let tags = await this.dao.findAll({
      ...page,
      where: {
        name: {
          [this.Op.like]: `%${keywords}%`
        }
      }
    });
    return this.addHasFollowed(tags, userId);
  }
  async addFollower(tagId, followerId) {
    let tag = await this.findById(tagId);
    let follower = await this.getService('user').findById(followerId);
    let hasFollowed = await tag.hasFollower(follower);
    if (hasFollowed) {
      return this.jsonModel(tag, { hasFollowed: true });
    }
    tag.addFollower(follower);
    tag.increment('follower_count', { by: 1 });
    // tag.reload();
    // return this.jsonModel(tag, { hasFollowed: true });
  }
  async deleteFollower(tagId, followerId) {
    let tag = await this.findById(tagId);
    let follower = await this.getService('user').findById(followerId);
    let hasFollowed = await tag.hasFollower(follower);
    if (!hasFollowed) {
      return this.jsonModel(tag, { hasFollowed: false });
    }
    tag.removeFollower(follower);
    tag.increment('follower_count', { by: -1 });
    // return this.jsonModel(tag, { hasFollowed: false });;
  }
}

module.exports = TagService;
