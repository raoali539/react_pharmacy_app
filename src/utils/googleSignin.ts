import { GoogleSignin } from "@react-native-google-signin/google-signin";

/**
 * Options for configuring Google Sign-In.
 */
type GoogleSignInOptions = {
  scopes?: string[]; // Optional additional OAuth scopes
  offlineAccess?: boolean; // Optional offline access requirement
};

/**
 * Configures Google Sign-In with predefined or custom options.
 *
 * The default configuration includes:
 * - `userinfo.profile`: Access to basic profile information.
 * - `user.gender.read`: Access to the user's gender information.
 *
 * @param {GoogleSignInOptions} [options={}] - Optional configuration overrides.
 */
export const configureGoogleSignIn = (options: GoogleSignInOptions = {}) => {
  const defaultScopes = [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/user.gender.read",
  ];

  GoogleSignin.configure({
    scopes: options.scopes || defaultScopes,
    offlineAccess: options.offlineAccess ?? false,
  });
};
