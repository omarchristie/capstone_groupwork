$(document).ready(function(){
    // check current php session on start
    $.ajax({
        url: "getsession.php",
        success: function(data){
            var session = JSON.parse(data);

            if(session.hasOwnProperty("logged_in") && session.logged_in == true){
                if(session.hasOwnProperty("user")){
                    login(session.user);
                    return;
                }
            }

            loadLoginPage();
        }
    });
    
    // load login page
    function loadLoginPage(){
        $.ajax({
            url: "login.html",
            success: function(page){

                $("body").html(page);
                // login page
                $("#loginForm").submit(function(e) {
                    $.ajax({
                        type: "POST",
                        url: "login.php",
                        data: { username: $('#username').val(), 
                            pass: $('#pass').val(),
                        },
                        success: function(data){
                            console.log(data);
                            login(data);
                        }
                    });
                    e.preventDefault(); // avoid to execute the actual submit of the form.
                });
                $(".reg").click(function(){
                    register();
                });
            }
        });
    }
    
    function register(){
        $.ajax({
            url: "register.html",
            success: function(page){
                $("body").html(page);
                $('.goback').click(function() {
                    loadLoginPage();
                });
                $("#registrationForm").submit(function(e){
                    $.ajax({
                        type: "POST",
                        url: "register.php",
                        data: { firstname: $('#firstname').val(),
                            lastname: $('#lastname').val(),
                            username: $('#username').val(), 
                            pass: $('#pass').val(),
                            cpass: $('#cpass').val(),
                        },
                        success: function(data){
                            console.log(data);
                            // respond to errors
                            if(data == "password_mismatch"){
                                $("#error").html("Passwords must match.");
                            } else if (data == "name_taken"){
                                $("#error").html("Sorry, this username is already taken.");
                            } else if (data == "failed"){
                                $("#error").html("Something went wrong, but we're not sure what.");
                            } else if (data == "success"){
                                $("#error").html("Successfully registered.");
                            }
                        }
                    });
                    e.preventDefault();
                });
            }
        });
    }

    function login(result){
        var temp = null;
        
        try{
            temp = JSON.parse(result);
            
        }catch(e){
            temp = result;
        }
        // check result for success
         console.log(result);
         
         console.log(result.type);
        if(temp.result == "not_found"){
            $("#message").html("User does not exist");
        } else if (temp.result == "password_mismatch"){
            $("#message").html("Incorrect username or password");
        } else if (temp.result == "success"){
            //determine the user type
            if(temp.type == "admin"){
                $.ajax({
                    url: "admin.html",
                    success: function(page){
                       loadAdminPage(result, page);
                    }
                });
            } else if (temp.type == "user"){
                loadUser(result);
            }
        
        }
    }
    function loadAdminPage(admin, page){
        var temp = null;
         try{
             temp = JSON.parse(admin);
        }catch(e){
            temp = admin;
        }
        admin = temp;
        
        $("body").html(page);
        $("#name").html(admin.fname + " " + admin.lname);

        // logout
        $("#logout").click(function(){
            logOut();
        });
    }
    
    function loadUser(user){
        $.ajax({
            url: "user.html",
            success: function(page){
                loadUserPage(user, page);
            }
        });
    }
    function loadUserPage(user,page){
        var temp = null;
        try{
            temp = JSON.parse(user);
        }catch(e){
            temp = user;
        }
        user = temp;
        $("body").html(page);
        $("#name").html(user.fname + " " + user.lname);

        // logout
        $("#logout").click(function(){
            logOut();
        });
        $("#addmovie").click(function(){
            addmovie(user);
        });
        showmovie(user);
    }
    
    function addmovie(user){
        $.ajax({
            url: "addmovie.html",
            success: function(page){
                $("body").html(page);
                $("#returntouser").click(function() {
                    loadUser(user)
                })
                $("#addmovierating").submit(function(e){
                    $.ajax({
                        type: "POST",
                        url: "addmovie.php",
                        data: { moviename: $('#moviename').val(),
                            movierating: $('#movierating').val(),
                            review: $('#review').val(), 
                            username: user.username,
                        },
                        success: function(data){
                            console.log(data)
                            if(data == "success"){
                                loadUser(user);
                                alert("Movie Rating added!");
                            }else{
                                alert("Movie ratings failed to add")
                            }
                        }
                    });
                    e.preventDefault();
                });
            }
        });
    }
    
    function showmovie(user){
        $.ajax({
            type: "POST",
            url: "showmovie.php",
            data: { username: user.username, 
            subject: "all" },
            success: function(data){
                console.log("get movie conected");
                console.log(data);
                $("#mlst").html(data);
                $(".movie").each(function(){
                $(this).click(function(){
                    var moviename = $(this).attr("id");
                        moviereview(user, moviename);
                    });
                });
            }
        });
    }
    
    function moviereview(user, moviename){
        $.ajax({
            type: "POST",
            url: "showmovie.php",
            data: { username: user.username, 
            subject: moviename },
            success: function(data){
                console.log("show messages conected");
                console.log(data);
                $("#mlst").html(data);
                $("#return").click(function(){
                    loadUser(user);
                });
            }
        });
    }
    
    function logOut(){
        if(confirm("Are you sure you want to log out?")){
            $.ajax({
                url: "logout.php",
                success: function(data){
                    loadLoginPage();
                }
            });
        }
    }
});//on page load ends here