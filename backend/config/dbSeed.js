const role = [
    {
        role: "user",
        permissions: [
            "commentPost", "votePost"
        ]
    },
    {
        role: "admin",
        permissions: [
            "commentPost", "removeComment", "votePost", "createPost",
            "approvePost", "editPostSelf", "editPost", "banip", "unbanip",
            "deleteUser", "verifyUser", "modifyRole"
        ]
    },
    {
        role: "author",
        permissions: [
            "commentPost", "votePost", "createPost"
        ]
    }
];

module.exports = role;