import createAuth0Client, { Auth0Client, type PopupLoginOptions } from "@auth0/auth0-spa-js";
import { user, isAuthenticated, popupOpen } from "./stores/auth";
import config from "../auth_config";

async function createClient() {
  const auth0Client = await createAuth0Client({
    domain: config.domain,
    client_id: config.clientId
  });

  return auth0Client;
}

async function loginWithPopup(client: Auth0Client, options?: PopupLoginOptions) {
  popupOpen.set(true);
  try {
    await client.loginWithPopup(options);
    const usr = await client.getUser();
    user.set(usr ? usr : {});
    isAuthenticated.set(true);
  } catch (e) {
    // eslint-disable-next-line
    console.error(e);
  } finally {
    popupOpen.set(false);
  }
}

function logout(client: Auth0Client) {
  return client.logout();
}

const auth = {
  createClient,
  loginWithPopup,
  logout
};

export default auth;