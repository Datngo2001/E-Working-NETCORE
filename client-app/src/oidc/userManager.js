import Oidc from "oidc-client"

var config = {
    authority: "https://identity-setver-datngo2001.azurewebsites.net/",
    client_id: "ClientApp",
    redirect_uri: "https://e-working-netcore.web.app/",
    response_type: "code",
    scope: "openid profile API",
    post_logout_redirect_uri: "https://e-working-netcore.web.app/",
    response_mode: "query",
};
const UserManager = new Oidc.UserManager(config);

export default UserManager