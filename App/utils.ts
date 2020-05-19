const trimText = (mytextvar: string, maxlimit: number = 12) => {
  return mytextvar.length > maxlimit
    ? mytextvar.substring(0, maxlimit - 3) + '...'
    : mytextvar;
};
export default {trimText};
