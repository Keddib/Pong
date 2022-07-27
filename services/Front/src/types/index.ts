type Link = {
  name: string;
  path: string;
};
export interface Links {
  first: Link;
  second: Link;
  third?: Link;
}
