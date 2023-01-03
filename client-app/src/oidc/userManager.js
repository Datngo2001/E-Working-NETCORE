import Oidc from "oidc-client"
import { Authority, Redirect_uri } from "../config";

var config = {
    authority: Authority,
    client_id: "ClientApp",
    redirect_uri: Redirect_uri,
    response_type: "code",
    scope: "openid profile API",
    post_logout_redirect_uri: Redirect_uri,
    response_mode: "query",
};
const UserManager = new Oidc.UserManager(config);

export default UserManager