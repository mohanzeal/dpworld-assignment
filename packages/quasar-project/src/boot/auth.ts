import { useAuthStore } from "./../modules/auth/auth.store";
import { boot } from "quasar/wrappers";
import middlewarePipeline from "src/router/middlewarePipeline";

export default boot(({ router, store }) => {
  router.beforeEach((to, from, next) => {
    // if we don't pass store we will get SSR error while runtime
    // https://pinia.vuejs.org/ssr/#using-the-store-outside-of-setup
    const authStore = useAuthStore(store);

    if (!to.meta.middleware) {
      return next();
    }
    const middleware = to.meta.middleware as any;
    const context = {
      to,
      from,
      next,
      authStore,
    };
    return middleware[0]({
      ...context,
      next: middlewarePipeline(context, middleware, 1),
    });
  });
});
