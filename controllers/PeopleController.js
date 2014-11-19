module.exports = {
    /*
     Will be translated to get("/people") (first level is generated by controller name)
 */
    //http://localhost:1972/people/
    get_index : function(req, res) {
        //atdo 通过 expressController.js 里面的
        ///<summery>获取黑社会的数据</summery>
        ///<params>
        res.send("Hello visitor!");
    },

    /*
     Will be translated to get("/people") (HTTP-method is extracted by first item in function name)
     */
    ///
    post_index : function(req, res) {
        res.send("A post");
    },

    /*
     Will be translated to get("/people/finest") (subsections automatically appended)
     */
    //http://localhost:1972/people/finest
    get_finest : function(req, res) {
        res.send("/people/finest");
    },

    /*
     Will be translated to get("/people/:id") (parameters automatically extracted from function parameters)
     */
    get_id : function(req, res, id) {
        res.send("You are requesting the resource with id: " + id);
    },

    /*
     Will be translated to get("/people/:id/friends") (if parameter is included in function-name, it will be be included in the same position)
 */
//http://localhost:1972/people/abcd/friends
get_id_friends : function(req, res, id) {
    res.send("You are requesting the friends of the person with id: " + id);
},
/*
 Will be translated to get("/people/:userName/friend-requests") (non parameter parts that use camelCase will be separated by hyphens in the url)
 */
//http://localhost:1972/people/abcd/friend-requests
get_userName_friendRequests : function(req, res, userName) {
    res.send("You are requesting the friend requests of the person with user name: " + userName);
}
};