var arrChoose = ["0"],papersChoose = "";
 function add(addNum){
    for(var i = 0 ; i < arrChoose.length ; i++){
        if( arrChoose[i] != addNum ){
            arrChoose.push(addNum)
            // console.log(arrChoose)
            break;   
        }
    }
 }
 function del(delNum){
    for(var i = 0 ; i <= arrChoose.length ; i++){
        if( arrChoose[i] == delNum ){
            // console.log("存在")
            arrChoose.splice(i,1)
            // console.log(arrChoose)
            break;
        }
    }
 }
 function getArr(arrChoose){
     arrChoose.sort()
    //  console.log(arrChoose)
    for(var i = 0 ; i < arrChoose.length ; i++){
        if( i > arrChoose.length ){
            break;
        }else{
            papersChoose += arrChoose[i]
            papersChoose += ","
        }
    }
 }
