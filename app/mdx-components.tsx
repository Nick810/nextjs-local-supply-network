import { MDXComponents } from "mdx/types";
import { ComponentPropsWithoutRef } from "react";

type HeadingProps = ComponentPropsWithoutRef<'h1'>;
type ParagraphProps = ComponentPropsWithoutRef<'p'>;

const components: MDXComponents = {
  h1: (props: HeadingProps) => (
    <h1 className="text-xl pt-12 mb-0 fade-in" {...props} />
  ),
  p: (props: ParagraphProps) => (
    <p className="mb-8!" {...props} />
  )
}

export function useMDXComponents(
  otherComponents: MDXComponents,
): MDXComponents {
  return {
    ...otherComponents,
    ...components
  }
}