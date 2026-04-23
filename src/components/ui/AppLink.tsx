import type { AnchorHTMLAttributes, MouseEvent } from "react";
import { isInternalHref, navigate, normalizeInternalHref } from "../../lib/navigation";

type AppLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
};

export function AppLink({ href, onClick, ...props }: AppLinkProps) {
  const resolvedHref = isInternalHref(href) ? normalizeInternalHref(href) : href;

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);

    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      props.target === "_blank" ||
      !isInternalHref(href)
    ) {
      return;
    }

    event.preventDefault();
    navigate(href);
  }

  return <a {...props} href={resolvedHref} onClick={handleClick} />;
}
