class LogController {

  // gevoelige data velden
  sensDatas = ['password', 'repeat_password'];

  /**
   * verwijderd gevoelige info uit de logs
   * @param  {...any} args 
   */
  static log(...args){
    let newArgs = args;

    args.map((argument, index) => {

      switch(typeof(argument)){
        case Object:

          sensDatas.map((sensData) => {
            if(argument.hasOwnProperty(sensData)){
              argument[sensData] = "";
            }
          });

          break;
        case Array:

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

    console.log(newArgs);

  }


  // static log(...args){

  //   let newArgs = args;

  //   args.map((value, index) => {

  //   });

  //   let newData = data;

  //   if(typeof(data) == Array){
  //     newData.map((value, index) => {
  //       if(typeof(value) == Object){
  //         if(value.hasOwnProperty("password")){
  //           newData[index].password = "";
  //         }
  //         if(value.hasOwnProperty("repeat_password")){
  //           newData[index].repeat_password = "";
  //         }
  //       }
  //     });
  //   }else if(typeof(data) == Object){
  //     if(data.hasOwnProperty("password")){
  //       newData.password = "";
  //     }
  //     if(data.hasOwnProperty("repeat_password")){
  //       newData.repeat_password = "";
  //     }
  //   }

  //   console.log(type, newData);
  // }

}