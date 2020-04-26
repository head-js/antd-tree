export default function splitNs(org) {
  const ids = [];
  let ns = '';
  org.split('.').forEach((n) => {
    if (ns === '') {
      ns += n;
    } else {
      ns += '.' + n; // eslint-disable-line prefer-template
    }
    ids.push(ns);
  });
  return ids;
}
