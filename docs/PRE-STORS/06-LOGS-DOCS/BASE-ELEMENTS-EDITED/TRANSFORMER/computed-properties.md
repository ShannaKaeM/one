---
type: L1-ATOM
category: TRANSFORMER
status: COMPLETE
source: WHITEBOARDS/WB-01-JSON-HYDRATION.md
related: [placeholder-syntax, props-injection, json-template-structure]
---

# Computed Properties

## Definition
Dynamic property calculation within templates that allows for derived values, conditional logic, and transformations during the hydration process.

## Key Principles
- Calculate at hydration time
- Support expressions
- Enable derived values
- Maintain reactivity

## Basic Computations

### Math Operations
```javascript
// In template
"{{ price * quantity }}"
"{{ originalPrice - discount }}"
"{{ price * (1 + taxRate) }}"

// With props
{
  price: 100,
  quantity: 2,
  taxRate: 0.08
}
// Result: 200, 216
```

### String Concatenation
```javascript
// Template
"{{ firstName + ' ' + lastName }}"
"{{ 'Hello, ' + userName }}"
"{{ currency + price }}"

// Result
"John Doe"
"Hello, Alice"
"$99.99"
```

### Boolean Logic
```javascript
// Conditionals
"{{ price > 100 ? 'Premium' : 'Standard' }}"
"{{ hasDiscount && isActive }}"
"{{ !isHidden || isAdmin }}"
```

## Advanced Patterns

### Array Operations
```javascript
// Length checks
visible: "{{ items.length > 0 }}"

// Array mapping
"{{ items.map(i => i.name).join(', ') }}"

// Filtering
"{{ items.filter(i => i.active).length }}"
```

### Object Access
```javascript
// Nested properties
"{{ user.profile.displayName || user.email }}"

// Dynamic keys
"{{ settings[currentLanguage].title }}"

// Optional chaining
"{{ user?.address?.city || 'Unknown' }}"
```

### Type Conversions
```javascript
// To number
"{{ parseInt(stringValue) }}"
"{{ parseFloat(price) }}"

// To boolean
"{{ !!value }}"
"{{ value === 'true' }}"

// To string
"{{ value.toString() }}"
"{{ JSON.stringify(object) }}"
```

## Computed Slots

### Dynamic Visibility
```javascript
slots: {
  premium: {
    visible: "{{ plan === 'premium' || plan === 'enterprise' }}"
  },
  trial: {
    visible: "{{ daysLeft > 0 && !isPaid }}"
  }
}
```

### Computed Content
```javascript
slots: {
  price: {
    value: "{{ '$' + (basePrice * (1 - discount)).toFixed(2) }}"
  },
  savings: {
    value: "{{ 'Save ' + (discount * 100) + '%' }}",
    visible: "{{ discount > 0 }}"
  }
}
```

### Conditional Styles
```javascript
slots: {
  status: {
    style: {
      color: "{{ isActive ? 'green' : 'red' }}",
      fontWeight: "{{ isPriority ? 'bold' : 'normal' }}"
    }
  }
}
```

## Complex Examples

### E-commerce Pricing
```javascript
// Template
{
  originalPrice: "{{ price }}",
  salePrice: "{{ price * (1 - discount) }}",
  savings: "{{ price * discount }}",
  finalPrice: "{{ (price * (1 - discount) * (1 + tax)).toFixed(2) }}",
  shippingText: "{{ finalPrice > 50 ? 'Free Shipping' : '$5.99 Shipping' }}"
}

// Props
{
  price: 100,
  discount: 0.2,
  tax: 0.08
}

// Result
{
  originalPrice: 100,
  salePrice: 80,
  savings: 20,
  finalPrice: "86.40",
  shippingText: "Free Shipping"
}
```

### User Display
```javascript
// Template
{
  displayName: "{{ fullName || username || 'Anonymous' }}",
  initials: "{{ firstName[0] + lastName[0] }}",
  memberSince: "{{ new Date(joinDate).getFullYear() }}",
  isPremium: "{{ plan === 'premium' || credits > 1000 }}"
}
```

## Performance Considerations

### Caching
```javascript
// Compute once, use many times
const computed = {
  fullPrice: price * (1 + tax),
  discountAmount: price * discount
};

// Use computed values
slots: {
  price: { value: computed.fullPrice },
  savings: { value: computed.discountAmount }
}
```

### Memoization
- Cache expensive calculations
- Recompute only on change
- Store derived values
- Optimize re-renders

## Limitations

### No Side Effects
```javascript
// ❌ Don't do this
"{{ localStorage.setItem('key', value) }}"

// ✅ Pure computations only
"{{ value * 2 }}"
```

### No Async Operations
```javascript
// ❌ No promises or async
"{{ await fetchData() }}"

// ✅ Synchronous only
"{{ data.value || 'Loading...' }}"
```

## Best Practices

### Keep Simple
- Avoid complex logic
- Extract to functions
- Use clear expressions
- Document computations

### Type Safety
- Validate inputs
- Handle null/undefined
- Provide defaults
- Check types

### Readability
```javascript
// ❌ Too complex
"{{ items.reduce((a,c) => a + (c.p * c.q * (1 - c.d)), 0) }}"

// ✅ Clear and simple
"{{ calculateTotal(items) }}"
```

## Related Atoms
- `placeholder-syntax` - Basic syntax rules
- `props-injection` - How props flow
- `json-template-structure` - Template system