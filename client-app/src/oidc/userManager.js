import Oidc from "oidc-client"

var config = {
    authority: "https://localhost:7089/",
    client_id: "ClientApp",
    redirect_uri: "http://localhost:3000/callback",
    response_type: "code",
    scope: "openid profile API",
    post_logout_redirect_uri: "http://localhost:3000/",
    response_mode: "query",
};
const UserManager = new Oidc.UserManager(config);

export default UserManager