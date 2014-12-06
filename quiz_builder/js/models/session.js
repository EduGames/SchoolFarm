var Session = {
  dataRef: 'https://resplendent-torch-8357.firebaseio.com/Sessions',
  id: 'session12245',
  createQuiz: function(quiz_obj, callback){
    var myDataRef = new Firebase(this.dataRef);
    var obj = {};
    obj["Questions"] = quiz_obj["questions"];
    myDataRef.push(obj, callback);
  },
  fetchSessionQuestions: function() {
    var dataRef = new Firebase(this.dataRef + '/' + this.id + '/Questions'),questions;
    // Attach an asynchronous callback to read the data at our posts reference
    dataRef.on("value", function(snapshot) {
      questions=snapshot.val();
      localStorage.setItem("questions",JSON.stringify(questions));
        console.log(questions);
    }, function(errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
  },
  updateUserAnswer: function(pathId, blockType, callback){
    var myDataRef = new Firebase(this.dataRef+'/'+this.id+'/Students');
    userUUID = localStorage.getItem('currentUUID');
    var questionRef = myDataRef.child(userUUID).child("Path").child(pathId);
    answer = true;
    if(blockType == "g"){
        answer = true
    }else if(blockType == "s"){
        answer = false
    }else{
        answer = "notyet"
    }
    var obj = {"State": answer};
    questionRef.update(obj, callback); 
  },
  createUser: function(userUuid, userObj, callback){
    var myDataRef = new Firebase(this.dataRef+'/'+this.id+'/Students');
    var userRef = myDataRef.child(userUuid)
    userRef.set(userObj, callback); 
  }
}
