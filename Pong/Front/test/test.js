var LoginController = {
  errors: [],
  getUser: function() {
      return document.getElementById(
         "login_username"
      ).value;
  },
  getPassword: function() {
      return document.getElementById(
         "login_password"
      ).value;
  },
  validateEntry: function(user,pw) {
      user = user || this.getUser();
      pw = pw || this.getPassword();
      if (!(user && pw)) {
          return this.failure(
             "Please enter a username & password!"
          );
      }
      else if (user.length < 5) {
          return this.failure(
             "Password must be 5+ characters!"
          );
      }
      // got here? validated!
      return true;
  },
  showDialog: function(title,msg) {
      // display success message to user in dialog
  },
  failure: function(err) {
      this.errors.push( err );
      this.showDialog( "Error", "Login invalid: " + err );
  }
};

// Link `AuthController` to delegate to `LoginController`
var AuthController = Object.create( LoginController );
AuthController.errors = [];
AuthController.checkAuth = function() {
  var user = this.getUser();
  var pw = this.getPassword();
  if (this.validateEntry( user, pw )) {
      this.server( "/check-auth",{
          user: user,
          pw: pw
      } )
      .then( this.accepted.bind( this ) )
      .fail( this.rejected.bind( this ) );
  }
};
AuthController.server = function(url,data) {
  return $.ajax( {
      url: url,
      data: data
  } );
};
AuthController.accepted = function() {
  this.showDialog( "Success", "Authenticated!" )
};
AuthController.rejected = function(err) {
  this.failure( "Auth Failed: " + err );
};

AuthController.checkAuth();


var controller1 = Object.create( AuthController );
