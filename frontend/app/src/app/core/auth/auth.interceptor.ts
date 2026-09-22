import { HttpInterceptorFn } from '@angular/common/http';

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
}

export const csrfInterceptor: HttpInterceptorFn = (req, next) => {
  const csrfToken = getCookie('csrftoken');
  const isUnsafeMethod = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method);

  if (csrfToken && isUnsafeMethod) {
    req = req.clone({
      setHeaders: { 'X-CSRFToken': csrfToken },
      withCredentials: true
    });
  } else {
    req = req.clone({ withCredentials: true });
  }

  return next(req);
};