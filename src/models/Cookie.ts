export class SetCookieProps {
  key = '';
  value = '';
  expires = new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 30);
}

export class SetSignedCookieProps extends SetCookieProps {
  secret = '';
}
