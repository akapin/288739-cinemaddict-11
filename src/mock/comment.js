import {getRandomArrayItem, getRandomDate} from "../utils/common.js";

const EMOJIS = [
  `./images/emoji/smile.png`,
  `./images/emoji/sleeping.png`,
  `./images/emoji/puke.png`,
  `./images/emoji/angry.png`,
];

const TEXTS = [
  `Excellent!`,
  `Good`,
  `Bad`,
  `Meh...`,
];

const AUTHORS = [
  `Vasya Pupkin`,
  `Mike Smith`,
  `John Doe`,
  `Gendalf Gray`,
];

const generateComment = () => {
  return {
    text: getRandomArrayItem(TEXTS),
    emoji: getRandomArrayItem(EMOJIS),
    author: getRandomArrayItem(AUTHORS),
    date: getRandomDate(),
  };
};

const generateComments = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateComment);
};


export {generateComments};
