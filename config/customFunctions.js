module.exports = {
  // see tutorial regular expression part 14
  //no use , it was going to be used in edit function
  // https://stackoverflow.com/questions/30535309/where-should-i-define-js-function-to-call-in-ejs-template
  // https://stackoverflow.com/questions/30535309/where-should-i-define-js-function-to-call-in-ejs-template
    selectOption : function (status, options) {

        return options.fn(this).replace(new RegExp('value=\"'+status+'\"'), '$&selected="selected"');
    },


///this is for file
    isEmpty: function (obj) {
        for(let key in obj) {
            if(obj.hasOwnProperty(key)) {
                return false;
            }
        }

        return true;
    }


};
