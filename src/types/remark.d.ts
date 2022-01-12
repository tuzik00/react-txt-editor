declare module 'remark-text-decoration' {
  export default function remarkGfm(one: string, two: string):
    | void
    | import('unified').Transformer<import('mdast').Root, import('mdast').Root>;
}
