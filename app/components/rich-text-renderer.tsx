import React from "react";

type TextNode = { type: 'text'; value: string };
type LinkNode = {
  type: 'link';
  url: string;
  title?: string | null;
  target?: string | null;
  children: TextNode[];
};
type ParagraphNode = {
  type: 'paragraph';
  children: (TextNode | LinkNode)[];
};
type RootNode = {
  type: 'root';
  children: ParagraphNode[];
};

type Props = {
  value: RootNode;
  className?: string;
};

function renderNode(node: TextNode | LinkNode | ParagraphNode, key: number): React.ReactNode {
  switch (node.type) {
    case 'text':
  return node.value.split('\n').map((line, i) => (
    <React.Fragment key={i}>
      {line}
      <br />
    </React.Fragment>
  ));
    case 'link':
      return (
        <a
          key={key}
          href={node.url}
          rel="noopener noreferrer"
          className="underline"
        >
          {node.children.map((child, i) => renderNode(child, i))}
        </a>
      );
    case 'paragraph':
      return (
        <p key={key} className="mb-4">
          {node.children.map((child, i) => renderNode(child, i))}
        </p>
      );
    default:
      return null;
  }
}

export default function RichTextRenderer({ value, className }: Props) {
  return <div className={className}>{value.children.map((node, i) => renderNode(node, i))}</div>;
}
