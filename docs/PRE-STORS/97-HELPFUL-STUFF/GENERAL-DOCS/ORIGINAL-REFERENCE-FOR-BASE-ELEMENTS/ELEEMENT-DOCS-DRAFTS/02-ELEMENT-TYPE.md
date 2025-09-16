# 02 - Element Type

**Status**: Core concept  
**Domain**: Level 1 - Element Variable (Atomic)  
**References**: UI Generator lines 31-35, 88-102

## Definition

An **Element Type** determines what HTML element will be rendered. It's the bridge between JSON structure and semantic HTML output.

## Core Element Types

### 1. wrapper
- **Renders as**: `<div>`
- **Purpose**: Container elements, layout structures
- **Use for**: Sections, groups, layout containers

### 2. text
- **Renders as**: `<div>` by default OR custom via 'as' property
- **Purpose**: Text content of any kind
- **Use for**: Headings, paragraphs, labels, any text

### 3. image
- **Renders as**: `<img>`
- **Purpose**: Image content
- **Attributes**: src, alt, loading

### 4. [custom]
- **Renders as**: Any valid HTML element
- **Purpose**: Direct HTML element specification
- **Use for**: Semantic HTML (nav, article, section, etc.)

## JSON to HTML Mapping

### Basic Mapping
```json
{
  "type": "wrapper"  // → <div>
}

{
  "type": "text"     // → <div> or custom
}

{
  "type": "image"    // → <img>
}
```

### Custom Element Mapping
```json
{
  "type": "nav"      // → <nav>
}

{
  "type": "article"  // → <article>
}

{
  "type": "button"   // → <button>
}
```

## The 'as' Property

For text elements, override the default tag:

```json
{
  "type": "text",
  "as": "h1",        // → <h1>
  "content": "Title"
}

{
  "type": "text",
  "as": "p",         // → <p>
  "content": "Paragraph"
}
```

## Element Type vs Styling

**Critical Understanding**: Element type determines structure, NOT appearance.

```json
{
  "type": "text",           // Structure: text element
  "preset": "huge-title",   // Appearance: large, bold
  "as": "h1"               // Semantic: heading level 1
}
```

## Semantic HTML Priority

### ✅ Correct Usage
```json
{
  "type": "nav",     // Semantic navigation
  "children": [...]
}

{
  "type": "text",
  "as": "h1",        // Semantic heading
  "content": "Title"
}
```

### ❌ Wrong Usage
```json
{
  "type": "wrapper",  // Generic div
  "preset": "navigation"  // Styling doesn't make it semantic
}

{
  "type": "text",    // Generic text
  "preset": "heading"  // Not semantically a heading
}
```

## Children and Nesting

Element types that support children:

```json
{
  "type": "wrapper",
  "children": [
    {
      "type": "text",
      "content": "Child content"
    }
  ]
}
```

Self-closing elements (no children):

```json
{
  "type": "image",
  "src": "image.jpg",
  "alt": "Description"
  // No children property
}
```

## Special Element Types

### Canvas Content
```json
{
  "type": "wrapper",
  "data-label": "canvas-content"
  // Triggers DirectRenderer embedding
}
```

### Interactive Elements
```json
{
  "type": "text",
  "as": "button",
  "data-label": "add-one-button"
  // Triggers event handler
}
```

## Element Type Rules

1. **Use Semantic Types**: Prefer semantic HTML elements
2. **Type Determines Tag**: Not styling or behavior
3. **Children Awareness**: Know which types support children
4. **Custom When Needed**: Use specific HTML elements directly

## Common Patterns

### Layout Container
```json
{
  "type": "wrapper",
  "preset": "dashboard grid",
  "children": [...]
}
```

### Content Section
```json
{
  "type": "article",
  "children": [
    {
      "type": "text",
      "as": "h2",
      "content": "Article Title"
    },
    {
      "type": "text",
      "as": "p",
      "content": "Article content..."
    }
  ]
}
```

### Navigation
```json
{
  "type": "nav",
  "children": [
    {
      "type": "text",
      "as": "a",
      "content": "Link",
      "href": "/page"
    }
  ]
}
```

## Type Selection Guide

| Content | Element Type | Notes |
|---------|-------------|-------|
| Layout containers | wrapper | Generic containers |
| Text content | text | With 'as' for semantic tag |
| Images | image | Self-closing |
| Navigation | nav | Semantic |
| Main content | main | Semantic |
| Articles | article | Semantic |
| Sections | section | Semantic |
| Headers | header | Semantic |
| Footers | footer | Semantic |

## Guardian Note

Element type is about structure and semantics, not styling. Choose the type that best represents the content's purpose, not its appearance.

---

**Note**: The element type system ensures clean, semantic HTML output while maintaining flexibility for any content structure.