import sanitizeHtml from 'sanitize-html';

interface ContentElementProps {
  content: string;
  isBlock?: boolean;
}

function ContentElement({ content, isBlock = false }: ContentElementProps) {
  const Tag = isBlock ? 'div' : 'span'
  const sanitizedContent = sanitizeHtml(content, {
    allowedTags: [ 'b', 'i', 'em', 'strong', 'br', 'p', 'ul', 'li', 'blockquote' ],
    allowedAttributes: {},
    allowedIframeHostnames: []
  })
  return (
    <Tag className={isBlock ? 'block-content' : 'inline-content'} dangerouslySetInnerHTML={{__html: sanitizedContent}} />
  );
}

export default ContentElement;
