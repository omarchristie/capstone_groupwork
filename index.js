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

            loadLoginPage(session);
        }
    });
    
    // load login page
    function loadLoginPage(session){
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
                    register(session);
                });
                $("#about").click(function(){
                    about(session);
                });
            }
        });
    }
    
    function register(session){
        $.ajax({
            url: "register.html",
            success: function(page){
                $("body").html(page);
                $('.goback').click(function() {
                    loadLoginPage(session);
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

    function login(result,session){
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
                       loadAdminPage(result, page, session);
                    }
                });
            } else if (temp.type == "user"){
                loadUser(result, session);
            }
        
        }
    }
    function loadAdminPage(admin, page, session){
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
            logOut(session);
        });
    }
    
    function loadUser(user, session){
        $.ajax({
            url: "user.html",
            success: function(page){
                loadUserPage(user, page, session);
            }
        });
    }
    
    function loadUserPage(user,page, session){
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
            logOut(session);
        });
        $("#addmovie").click(function(){
            addmovie(user, session);
        });
         $("#hot").click(function(){
            popularmoviepage(user, session);
        });
        showmovie(user, session);
        recommendmovie(user, session);
    }
    
    function popularmoviepage(user, session){
        $.ajax({
            url: "popular.html",
            success: function(page){
                $("#displayblock").html(page);
                popularmovie(user);
                $("#return").click(function() {
                    loadUser(user, session);
                });
            }
        });
    }
    
    
    function popularmovie(user, session){
        $.ajax({
            url: "popular.php",
            success: function(data){
                console.log("Popular movie connect");
                if (data){
                    $("#hotblock").html(data);
                }else{
                    $("#hotblock").html("nothing returned");
                }
                 $(".hotmovie").each(function() {
                    $(this).click(function() {
                        var moviename= $(this).attr("id");
                         $.ajax({
                            url: "reviews.html",
                            success: function(page){
                                $("#displayblock").html(page);
                                movieallreview(user, moviename, session);
                            }
                         });
                    });
                        
                });
            }
        });
    }
    
    
    function addmovie(user, session){
        $.ajax({
            url: "addmovie.html",
            success: function(page){
                $("body").html(page);
                $("#returntouser").click(function() {
                    loadUser(user, session)
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
                                $("#message").html(data);
                            }
                        }
                    });
                    e.preventDefault();
                });
            }
        });
    }
    
    function showmovie(user, session){
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
                            moviereview(user, moviename, session);
                    });
                });
            }
        });
    }
    
    function recommendmovie(user, session){
        $.ajax({
            type: "POST",
            url: "getuserrecommendation.php",
            data: { username: user.username },
            success: function(data){
                console.log("get movierec conected");
                console.log(data);
                if (data){
                    $("#reclst").html(data);
                }else{
                    $("#reclst").html("<p>No movie recommendation is available for you at this time.</p><p> Check Popular movie page for recommendation</p>")
                }
                $(".movierec").each(function() {
                    $(this).click(function() {
                        var moviename= $(this).attr("id");
                         $.ajax({
                            url: "reviews.html",
                            success: function(page){
                                $("#displayblock").html(page);
                                movieallreview(user, moviename, session);
                            }
                         });
                    });
                        
                });
            }
        });
    }
    function movieallreview(user, moviename, session){
        $.ajax({
            type: "POST",
            url: "reviews.php",
            data: { movienamed: moviename },
            success: function(data){
                console.log("show all review conected");
                console.log(data);
                if (data){
                    $("#reviewblock").html(data);
                }else{
                    $("#reviewblock").html("nothing returned");
                }
                $("#return").click(function() {
                    loadUser(user, session);
                });
            }
        });
    }
    
    function moviereview(user, moviename, session){
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
                    loadUser(user, session);
                });
            }
        });
    }
    
    function logOut(session){
        if(confirm("Are you sure you want to log out?")){
            $.ajax({
                url: "logout.php",
                success: function(data){
                    loadLoginPage(session);
                }
            });
        }
    }
    
    
    function about(session){
        $.ajax({
            url: "about.html",
            success: function(data){
                $("body").html(data);
                $("#return").click(function() {
                    if(session.hasOwnProperty("user")){
                        login(session.user);
                    }else{
                        loadLoginPage(session);
                    }
                });
            }
        });
    }
    
    
    function instruction(){
        
    }
    
    
});//on page load ends here