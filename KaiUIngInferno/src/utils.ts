function asArray(children: any | any[]) : any[] {
  if (children instanceof Array) {
    return children;
  } else {
    return [children];
  }
}

export { asArray };
