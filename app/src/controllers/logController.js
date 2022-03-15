// gevoelige data velden
sensDatas = ['password', 'repeat_password'];
class LogController {

  /**
   * verwijderd gevoelige info uit de logs
   * @param  {...any} args 
   */
  static log(...args){
    let newArgs = args;

    args.map((argument, index) => {

      switch(typeof(argument)){
        case 'object':

          sensDatas.map((sensData) => {
            if(argument.hasOwnProperty(sensData)){
              argument[sensData] = "";
            }
          });

          break;
        case 'array':

          argument.map((argumentItem, index) => {
            sensDatas.map((sensData) => {
              if(argumentItem.hasOwnProperty(sensData)){
                argument[index][sensData] = "";
              }
            });
          });

          break;
        default:
          newArgs[index] = argument;
          break;
      }

    });

    console.log(...newArgs);

  }

}

module.exports = LogController;