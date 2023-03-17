import { VNode } from "inferno";

function asArray(children: VNode | Array<VNode>) : Array<VNode> {
  if (children instanceof Array) {
    return children;
  } else {
    return [children];
  }
}

export { asArray };
