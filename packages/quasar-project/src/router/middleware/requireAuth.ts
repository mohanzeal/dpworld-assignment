import { me } from "src/modules/auth/auth.api";
import type { NavigationGuardNext } from "vue-router";

const redirectToLogin = (next: NavigationGuardNext) => {
  return next({
    name: "LoginPage",
  });
};

export default async function requireAuth({
  next,
  authStore,
}: {
  next: NavigationGuardNext;
  authStore: any;
}) {
  try {
    let user = null;
    if (authStore.user && authStore.user._id) {
      user = authStore.user;
    } else {
      const response = await me();
      if (response && response.data) {
        user = response.data;
        authStore.setUser(user);
      } else {
        console.error("unable to fetch user details");
        return redirectToLogin(next);
      }
    }

    if (!user) {
      return redirectToLogin(next);
    }
  } catch (error) {
    return redirectToLogin(next);
  }

  return next();
}
