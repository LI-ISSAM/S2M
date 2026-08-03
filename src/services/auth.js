import { createAuth0Client } from "@auth0/auth0-spa-js";

let auth0 = null;

export async function initAuth() {
  auth0 = await createAuth0Client({
    domain: "dev-t3tagp8a6ybx8mc5.us.auth0.com",
    clientId: "FWO9Zig0ex3SjXuagFU7N5QZhVAnU92L",
    authorizationParams: {
      redirect_uri: window.location.origin,
      // Décommentez et renseignez si votre backend vérifie les tokens Auth0
      // (Spring Security OAuth2 Resource Server) :
      // audience: process.env.VUE_APP_AUTH0_AUDIENCE
    },
    cacheLocation: "localstorage", // conserve la session après un refresh de page
    useRefreshTokens: true,
  });

  // Si on revient d'Auth0 après le login (l'URL contient ?code=...&state=...)
  const query = window.location.search;
  if (query.includes("code=") && query.includes("state=")) {
    try {
      await auth0.handleRedirectCallback();
    } catch (e) {
      console.error("Erreur lors du traitement du callback Auth0", e);
    }
    // Nettoie l'URL (retire ?code=...&state=...) sans recharger la page
    window.history.replaceState({}, document.title, window.location.pathname);
  }
}

export function getAuth() {
  return auth0;
}

export async function isAuthenticated() {
  return auth0 ? await auth0.isAuthenticated() : false;
}

export async function login() {
  await auth0.loginWithRedirect();
}

export function logout() {
  auth0.logout({
    logoutParams: { returnTo: window.location.origin },
  });
}

export async function getAccessToken() {
  try {
    return await auth0.getTokenSilently();
  } catch (e) {
    // Session expirée ou révoquée : on relance le login
    console.warn(
      "Impossible de récupérer le token, redirection vers le login",
      e,
    );
    await login();
    return null;
  }
}

export async function getUser() {
  return auth0 ? await auth0.getUser() : null;
}
