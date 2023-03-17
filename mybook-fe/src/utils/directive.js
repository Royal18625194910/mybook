import { isAdmin } from './character';

export const regDirectives = (app) => {
  app.directive('only-admin', {
    mounted(el, { value = true }) {
      const res = isAdmin();
      // 若不是管理员
      // if ( value ) {
      //   el.style.display = 'none';
      // }
      if (!res && value) {
        el.style.display = 'none';
      }
    },
  });
};
