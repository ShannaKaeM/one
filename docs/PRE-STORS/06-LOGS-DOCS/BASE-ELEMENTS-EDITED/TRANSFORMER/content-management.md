---
type: L1-ATOM
category: TRANSFORMER
status: COMPLETE
source: 01.01-VISUAL-BUILDER-ROADMAP.md#L302-330
related: [json-template-structure, props-injection, content-slots-system]
---

# Content Management

## Definition
A centralized system for storing, organizing, and loading content that can be injected into components through JSON hydration, supporting multiple sources and formats.

## Key Principles
- Centralized storage
- Multiple sources
- Type organization
- Async loading
- Preview support

## Content Store Structure

### Basic Store
```javascript
const contentStore = {
  heroes: {
    'home-hero': { 
      title: 'Welcome',
      subtitle: 'Start your journey',
      image: '/images/home-hero.jpg',
      cta: 'Get Started'
    },
    'about-hero': { 
      title: 'About Us',
      subtitle: 'Our story',
      image: '/images/about-hero.jpg'
    }
  },
  cards: {
    'feature-1': {
      title: 'Fast Performance',
      description: 'Lightning quick',
      icon: 'bolt'
    }
  }
}
```

### Hierarchical Organization
```javascript
contentStore = {
  // By page
  pages: {
    home: {
      hero: { ... },
      features: [ ... ],
      testimonials: [ ... ]
    },
    about: {
      hero: { ... },
      team: [ ... ]
    }
  },
  
  // By component type
  components: {
    heroes: { ... },
    cards: { ... },
    testimonials: { ... }
  },
  
  // By campaign
  campaigns: {
    summer2024: { ... },
    blackfriday: { ... }
  }
}
```

## Content Loading

### Basic Loader
```javascript
const loadContent = async (type: string, id: string) => {
  // From local store
  if (contentStore[type]?.[id]) {
    return contentStore[type][id];
  }
  
  // From API
  const response = await fetch(`/api/content/${type}/${id}`);
  return response.json();
}
```

### Advanced Loading
```javascript
class ContentManager {
  private cache = new Map();
  
  async load(type: string, id: string, options = {}) {
    const cacheKey = `${type}:${id}`;
    
    // Check cache
    if (this.cache.has(cacheKey) && !options.fresh) {
      return this.cache.get(cacheKey);
    }
    
    // Load from source
    const content = await this.fetchContent(type, id, options);
    
    // Cache result
    this.cache.set(cacheKey, content);
    
    return content;
  }
  
  async fetchContent(type, id, options) {
    const sources = [
      this.loadFromStore,
      this.loadFromAPI,
      this.loadFromCMS,
      this.loadFromFile
    ];
    
    for (const source of sources) {
      try {
        return await source(type, id, options);
      } catch (e) {
        continue;
      }
    }
    
    throw new Error(`Content not found: ${type}/${id}`);
  }
}
```

## Content Sources

### Local JSON Files
```javascript
// Load from file system
async loadFromFile(type, id) {
  const path = `/content/${type}/${id}.json`;
  const response = await fetch(path);
  return response.json();
}
```

### CMS Integration
```javascript
// Load from headless CMS
async loadFromCMS(type, id) {
  const query = `
    query GetContent($type: String!, $id: String!) {
      content(type: $type, id: $id) {
        ...contentFields
      }
    }
  `;
  
  return await cmsClient.request(query, { type, id });
}
```

### API Endpoints
```javascript
// Load from REST API
async loadFromAPI(type, id) {
  const response = await fetch(`/api/content/${type}/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  return response.json();
}
```

### Database
```javascript
// Direct database access
async loadFromDB(type, id) {
  return await db.content
    .where('type', type)
    .where('id', id)
    .first();
}
```

## Content Picker UI

### Visual Picker
```javascript
function ContentPicker({ type, onSelect }) {
  const [contents, setContents] = useState([]);
  const [preview, setPreview] = useState(null);
  
  useEffect(() => {
    loadContentList(type).then(setContents);
  }, [type]);
  
  return (
    <div className="content-picker">
      <div className="content-list">
        {contents.map(content => (
          <ContentCard
            key={content.id}
            content={content}
            onHover={setPreview}
            onSelect={onSelect}
          />
        ))}
      </div>
      
      {preview && (
        <ContentPreview content={preview} />
      )}
    </div>
  );
}
```

### Search & Filter
```javascript
// Search functionality
function searchContent(query, filters = {}) {
  return contentStore.search({
    q: query,
    type: filters.type,
    tags: filters.tags,
    dateRange: filters.dateRange
  });
}

// Filter UI
<ContentFilters
  onFilter={(filters) => {
    const results = searchContent('', filters);
    setFilteredContent(results);
  }}
/>
```

## Content Preview

### Preview Component
```javascript
function ContentPreview({ content, template }) {
  const [hydrated, setHydrated] = useState(null);
  
  useEffect(() => {
    const result = hydrate(template, content);
    setHydrated(result);
  }, [content, template]);
  
  return (
    <div className="content-preview">
      <div className="preview-header">
        <h3>{content.title || 'Untitled'}</h3>
        <span>{content.type}</span>
      </div>
      
      <div className="preview-body">
        {hydrated && <ComponentRenderer {...hydrated} />}
      </div>
      
      <div className="preview-meta">
        <span>Last updated: {content.updatedAt}</span>
        <span>Version: {content.version}</span>
      </div>
    </div>
  );
}
```

## Content Versioning

### Version Tracking
```javascript
const contentWithVersions = {
  id: 'hero-001',
  type: 'hero',
  currentVersion: 3,
  versions: [
    {
      version: 1,
      content: { ... },
      createdAt: '2024-01-01',
      author: 'user1'
    },
    {
      version: 2,
      content: { ... },
      createdAt: '2024-01-15',
      author: 'user2'
    }
  ]
}
```

### Version Management
```javascript
// Load specific version
async loadVersion(type, id, version) {
  const content = await loadContent(type, id);
  return content.versions.find(v => v.version === version);
}

// Save new version
async saveVersion(type, id, newContent) {
  const existing = await loadContent(type, id);
  existing.versions.push({
    version: existing.currentVersion + 1,
    content: newContent,
    createdAt: new Date(),
    author: getCurrentUser()
  });
  existing.currentVersion++;
  await saveContent(type, id, existing);
}
```

## Best Practices

### Organization
- Group by purpose
- Use clear naming
- Tag for discovery
- Version important content

### Performance
- Cache frequently used
- Lazy load on demand
- Paginate large sets
- Index for search

### Integration
- Support multiple sources
- Provide fallbacks
- Handle errors gracefully
- Validate content types

## Related Atoms
- `json-template-structure` - Template definitions
- `props-injection` - Content injection
- `content-slots-system` - Slot management