export default class NewComment {
  constructor() {
    this._id = String(new Date() + Math.random());
    this._text = ``;
    this._emoji = ``;
    this._author = `Me`;
    this._date = null;
  }

  get() {
    return {
      id: this._id,
      text: this._text,
      emoji: this._emoji,
      author: this._author,
      date: new Date()
    };
  }

  setText(text) {
    this._text = text;
  }

  setEmoji(emoji) {
    this._emoji = `images/emoji/${emoji}.png`;
  }
}
