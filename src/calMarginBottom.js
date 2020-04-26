export default function calMarginBottom(tree, selectedKeys) {
  const MENU_HEIGHT = 42;

  const INITIAL_MARGIN = tree.length;

  let offsets = 0;
  const heights = [];

  let children = tree.map(t => t);
  let ids = selectedKeys.map(k => k).reverse();
  let id = ids.shift();

  while (id) {
    const idx = children.findIndex(c => c.id === id); // eslint-disable-line no-loop-func
    if (idx < 0) {
      break;
    }

    offsets += idx;

    children = children[idx].children.map(t => t);
    heights.push(offsets + children.length);

    id = ids.shift();
  }

  let margin = Math.max.apply(null, heights) - INITIAL_MARGIN;
  margin = margin >= 0 ? margin : 0;
  // console.log(offsets, heights, margin);

  return margin * MENU_HEIGHT;
}
