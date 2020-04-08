import {getRandomDate} from "../utils.js";

const generateComment = () => {
  return {
    text: ``,
    emoji: ``,
    author: ``,
    date: getRandomDate(),
  };
};

const generateComments = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateComment);
};


export {generateComments};
