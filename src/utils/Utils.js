const Utils = () => {};

Utils.getRandomString = (length, isNumber) => {
	
  let text = "";
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let max = 2600;
  let min = 600;

  if (isNumber) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }else{
    for (let i = 0; i < length; i++){
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

};

module.exports = Utils;
