export default class Comment {
  constructor(data) {
    this.id = data[`id`];
    this.author = data[`author`];
    this.comment = data[`comment`];
    this.date = new Date(data[`date`]);
    this.emotion = data[`emotion`];
  }

  toRAW() {
    return {
      "id": this.id,
      "author": this.author,
      "comment": this.comment,
      "date": this.date.toISOString(),
      "emotion": this.emotion,
    };
  }

  getText() {
    return this.comment;
  }

  getEmotion() {
    return this.emotion;
  }

  setText(text) {
    this.comment = text;
  }

  setEmotion(emotion) {
    this.emotion = emotion;
  }

  setDate(date) {
    this.date = date;
  }

  static parseComment(data) {
    return new Comment(data);
  }

  static parseComments(data) {
    return data.map(Comment.parseComment);
  }
}
