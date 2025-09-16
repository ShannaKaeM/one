---
type: L1-ATOM
category: PRESETS
status: COMPLETE
source: Implementation patterns and system architecture
related: [preset-concept, theme-loading-sequence, self-applying-variables]
---

# Smart Presets

## Definition
Preset variations that can be manually configured to adapt based on context and content, maintaining design system constraints through careful manual setup.

## Key Principles
- Context-aware adaptation
- Manual configuration
- Design system compliance
- Designer control

## Smart Adaptation

### Content-Based Intelligence
```javascript
// Preset adapts based on content length
const smartCardPreset = {
  base: {
    padding: "1rem",
    minHeight: "200px"
  },
  adaptations: {
    shortContent: {
      condition: "{{ content.length < 100 }}",
      styles: {
        padding: "0.75rem",
        minHeight: "120px"
      }
    },
    longContent: {
      condition: "{{ content.length > 500 }}",
      styles: {
        padding: "1.5rem",
        minHeight: "300px"
      }
    }
  }
};
```

### Context-Aware Sizing
```javascript
// Adapts to container and viewport
const smartButtonPreset = {
  base: {
    fontSize: "1rem",
    padding: "0.75rem 1.5rem"
  },
  contextRules: {
    narrow: {
      condition: "{{ container.width < 300 }}",
      styles: {
        fontSize: "0.875rem",
        padding: "0.5rem 1rem"
      }
    },
    hero: {
      condition: "{{ context.section === 'hero' }}",
      styles: {
        fontSize: "1.25rem",
        padding: "1rem 2rem"
      }
    }
  }
};
```

## Manual Preset Variations

### Pattern Configuration
```javascript
// Manually configure preset variations
function configureSmartPreset(basePreset, context) {
  const variations = manuallyDefineVariations({
    existingPresets: getAllPresets(),
    targetContext: context,
    designTokens: getDesignTokens(),
    constraints: getSystemConstraints()
  });
  
  return {
    ...basePreset,
    variations: variations.filter(v => 
      validateAgainstConstraints(v)
    )
  };
}
```

### Adaptive Color Schemes
```javascript
// Manually configured color adaptations
const smartColorPreset = {
  base: {
    background: "var(--surface-primary)",
    color: "var(--text-primary)"
  },
  smartAdaptations: {
    accessibility: {
      trigger: "{{ user.needsHighContrast }}",
      styles: {
        background: "var(--surface-high-contrast)",
        color: "var(--text-high-contrast)",
        border: "2px solid var(--border-emphasis)"
      }
    },
    brandAlignment: {
      trigger: "{{ context.brand }}",
      styles: {
        background: "var(--brand-primary)",
        color: "var(--brand-text)"
      }
    }
  }
};
```

## Improvement System

### Usage Analytics
```javascript
// Track preset effectiveness
class PresetAnalytics {
  trackUsage(presetId, context, outcome) {
    this.analytics.push({
      presetId,
      context,
      outcome,
      timestamp: Date.now(),
      userInteraction: this.getUserInteraction()
    });
  }
  
  getOptimizationSuggestions() {
    return this.ai.analyzeUsagePatterns(this.analytics);
  }
  
  getUserInteraction() {
    return {
      timeOnPage: this.getTimeOnPage(),
      clickThroughRate: this.getCTR(),
      userSatisfaction: this.getSatisfactionScore()
    };
  }
}
```

### Feedback Loop
```javascript
// Continuous improvement
function optimizePreset(presetId) {
  const analytics = getPresetAnalytics(presetId);
  const suggestions = generateOptimizations(analytics);
  
  // Apply manually approved variations
  suggestions
    .filter(s => s.approved)
    .forEach(suggestion => {
      updatePresetVariation(presetId, suggestion);
    });
  
  // Queue for designer review
  suggestions
    .filter(s => !s.approved)
    .forEach(suggestion => {
      queueForDesignerReview(presetId, suggestion);
    });
}
```

## Dynamic Property Calculation

### Responsive Intelligence
```javascript
// Smart responsive breakpoints
const smartLayoutPreset = {
  base: {
    display: "grid",
    gap: "1rem"
  },
  smartGrid: {
    columns: "{{ calculateOptimalColumns(content.items, container.width) }}",
    itemSize: "{{ calculateOptimalItemSize(content.complexity) }}",
    gap: "{{ calculateOptimalGap(content.density) }}"
  }
};

function calculateOptimalColumns(items, width) {
  const idealItemWidth = 250;
  const maxColumns = Math.floor(width / idealItemWidth);
  return Math.min(maxColumns, items.length);
}
```

### Performance-Aware Styling
```javascript
// Adapts complexity based on device capability
const smartAnimationPreset = {
  base: {
    transition: "all 0.2s ease"
  },
  performanceAware: {
    highEnd: {
      condition: "{{ device.performance === 'high' }}",
      styles: {
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        transform: "translateZ(0)",
        willChange: "transform"
      }
    },
    lowEnd: {
      condition: "{{ device.performance === 'low' }}",
      styles: {
        transition: "none",
        transform: "none"
      }
    }
  }
};
```

## Constraint Enforcement

### Design Token Validation
```javascript
// Ensure AI suggestions follow design system
function validateSmartPreset(preset) {
  const violations = [];
  
  // Check color compliance
  if (!isValidColor(preset.background)) {
    violations.push("Background must use design tokens");
  }
  
  // Check spacing compliance
  if (!isValidSpacing(preset.padding)) {
    violations.push("Padding must use spacing scale");
  }
  
  // Check typography compliance
  if (!isValidTypography(preset.fontSize)) {
    violations.push("Font size must use type scale");
  }
  
  return violations;
}
```

### Brand Guidelines
```javascript
// Maintain brand consistency
const brandConstraints = {
  colors: {
    primary: ["#007bff", "#0056b3", "#004085"],
    secondary: ["#6c757d", "#495057", "#343a40"],
    forbidden: ["#ff0000", "#00ff00"] // Never use these
  },
  typography: {
    allowedFonts: ["Inter", "Roboto", "system-ui"],
    minSize: "0.75rem",
    maxSize: "3rem"
  },
  spacing: {
    unit: 4, // 4px base unit
    maxGap: "4rem"
  }
};
```

## Preset Intelligence Engine

### Smart Suggestions
```javascript
class PresetIntelligence {
  suggestPresets(context) {
    const candidates = this.ai.generateCandidates({
      userIntent: context.intent,
      contentType: context.type,
      brandGuidelines: this.brandConstraints,
      existingPresets: this.getExistingPresets()
    });
    
    return candidates.map(candidate => ({
      ...candidate,
      confidence: this.calculateConfidence(candidate),
      reasoning: this.explainSuggestion(candidate)
    }));
  }
  
  calculateConfidence(preset) {
    let confidence = 0.5; // Base confidence
    
    // Increase for design token usage
    if (this.usesDesignTokens(preset)) confidence += 0.2;
    
    // Increase for pattern similarity
    confidence += this.getPatternSimilarity(preset) * 0.2;
    
    // Increase for accessibility compliance
    if (this.isAccessible(preset)) confidence += 0.1;
    
    return Math.min(confidence, 1.0);
  }
}
```

### Real-time Optimization
```javascript
// Continuously optimize based on performance
function monitorPresetPerformance() {
  setInterval(() => {
    const performanceData = getPerformanceMetrics();
    const slowPresets = identifySlowPresets(performanceData);
    
    slowPresets.forEach(preset => {
      const optimized = optimizeForPerformance(preset);
      if (optimized.improvement > 0.2) {
        suggestOptimization(preset.id, optimized);
      }
    });
  }, 60000); // Check every minute
}
```

## Designer Control

### Review Interface
```javascript
// UI for reviewing preset variations
function PresetReviewInterface({ suggestions }) {
  return (
    <div className="preset-review">
      {suggestions.map(suggestion => (
        <div key={suggestion.id} className="suggestion-card">
          <PresetPreview preset={suggestion.preset} />
          <div className="preset-reasoning">
            <h4>Variation Details</h4>
            <p>{suggestion.description}</p>
            <div className="context">
              Context: {suggestion.context}
            </div>
          </div>
          <div className="actions">
            <button onClick={() => approve(suggestion)}>
              Approve
            </button>
            <button onClick={() => modify(suggestion)}>
              Modify
            </button>
            <button onClick={() => reject(suggestion)}>
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
```

### Feedback Integration
```javascript
// Track designer decisions
function processDesignerFeedback(suggestionId, decision, modification) {
  const feedback = {
    suggestionId,
    decision, // 'approve', 'modify', 'reject'
    modification,
    timestamp: Date.now(),
    context: getCurrentContext()
  };
  
  // Update preset history
  updatePresetHistory(feedback);
  
  // Update preset library
  if (decision === 'approve') {
    addPresetToLibrary(suggestion.preset);
  } else if (decision === 'modify') {
    addPresetToLibrary(modification);
  }
}
```

## Examples

### Smart Card Preset
```javascript
const smartProductCard = {
  base: {
    display: "flex",
    flexDirection: "column",
    borderRadius: "var(--radius-md)",
    overflow: "hidden"
  },
  smartAdaptations: {
    hasImage: {
      condition: "{{ product.image }}",
      styles: {
        aspectRatio: "16/9",
        backgroundImage: "url({{ product.image }})",
        backgroundSize: "cover"
      }
    },
    onSale: {
      condition: "{{ product.sale }}",
      styles: {
        border: "2px solid var(--accent-primary)",
        background: "var(--surface-accent)"
      }
    },
    outOfStock: {
      condition: "{{ product.stock === 0 }}",
      styles: {
        opacity: "0.6",
        filter: "grayscale(50%)"
      }
    }
  }
};
```

### Smart Navigation Preset
```javascript
const smartNavigation = {
  base: {
    display: "flex",
    gap: "var(--space-md)"
  },
  smartBehavior: {
    mobileCollapse: {
      condition: "{{ viewport.width < 768 }}",
      styles: {
        flexDirection: "column",
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100vh",
        background: "var(--surface-overlay)"
      }
    },
    activeIndicator: {
      condition: "{{ hasActiveRoute }}",
      styles: {
        "::after": {
          content: "''",
          position: "absolute",
          bottom: "0",
          left: "0",
          width: "100%",
          height: "2px",
          background: "var(--accent-primary)"
        }
      }
    }
  }
};
```

## Related Atoms
- `preset-concept` - Core preset system
- `theme-loading-sequence` - How presets load
- `ai-era-design` - AI integration philosophy
- `self-applying-variables` - Dynamic CSS variables