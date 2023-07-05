import { VNode } from "inferno";

function asArray(children: VNode | VNode[]) : VNode[] {
  if (children instanceof Array) {
    return children;
  } else {
    return [children];
  }
}

export { asArray };
