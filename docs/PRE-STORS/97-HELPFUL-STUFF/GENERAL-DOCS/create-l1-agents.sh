#!/bin/bash

# Create Element Guardians for all domains
cd "/Users/shannamiddleton/Local Drive Mac/mi agency/miApps/Guardian/docs/DOMAIN-AGENTS/agents"

# Function to create agent from domain file
create_agent() {
    local category=$1
    local domain_file=$2
    local domain_name=$(basename "$domain_file" .md)
    local file_name=$(echo "$domain_name" | tr '-' '_')
    
    # Generate a human name for the agent that matches their domain
    local agent_name=""
    case "$domain_name" in
        "component-communication") agent_name="Coco" ;;
        "component-preset-distribution") agent_name="Cody" ;;
        "data-flow-architecture") agent_name="Dana" ;;
        "dual-theme-architecture") agent_name="Thea" ;;
        "flat-component-pattern") agent_name="Flo" ;;
        "parent-child-relationships") agent_name="Penny" ;;
        "parent-scope-pattern") agent_name="Pam" ;;
        "theme-loading-sequence") agent_name="Thelma" ;;
        "canvas-architecture") agent_name="Cam" ;;
        "drag-drop-system") agent_name="Diana" ;;
        "event-pattern") agent_name="Eve" ;;
        "grid-snap-system") agent_name="Greta" ;;
        "group-structure") agent_name="Grace" ;;
        "group-to-flat-conversion") agent_name="Gabe" ;;
        "interactive-pattern") agent_name="Ian" ;;
        "layer-hierarchy") agent_name="Liam" ;;
        "layer-operations") agent_name="Leo" ;;
        "layer-tree-component") agent_name="Laura" ;;
        "multi-selection-pattern") agent_name="Max" ;;
        "ai-era-design") agent_name="Aiden" ;;
        "base-variable-constraint") agent_name="Bev" ;;
        "one-element-philosophy") agent_name="Owen" ;;
        "self-applying-variables") agent_name="Sam" ;;
        "transformer-component-concept") agent_name="Trent" ;;
        "class-order-cascade") agent_name="Clara" ;;
        "css-property-pattern") agent_name="Casey" ;;
        "grid-only-layout") agent_name="Greg" ;;
        "grid-position-system") agent_name="Gina" ;;
        "hsl-value-system") agent_name="Holly" ;;
        "no-flexbox-rule") agent_name="Noah" ;;
        "proportional-sizing") agent_name="Priya" ;;
        "structure-vs-styling") agent_name="Steve" ;;
        "data-attributes") agent_name="Dan" ;;
        "element-creation-pattern") agent_name="Ellie" ;;
        "element-naming-system") agent_name="Emma" ;;
        "element-types") agent_name="Ethan" ;;
        "helper-classes") agent_name="Helen" ;;
        "preset-categories") agent_name="Preston" ;;
        "preset-concept") agent_name="Presley" ;;
        "preset-mixing") agent_name="Mia" ;;
        "smart-presets") agent_name="Smarty" ;;
        "computed-properties") agent_name="Connie" ;;
        "content-management") agent_name="Connor" ;;
        "content-slots-system") agent_name="Sloane" ;;
        "edit-mode-workflow") agent_name="Eddie" ;;
        "flat-canvas-concept") agent_name="Fiona" ;;
        "flat-vs-canvas-comparison") agent_name="Felix" ;;
        "inline-content-editing") agent_name="Ines" ;;
        "json-template-structure") agent_name="Jason" ;;
        "placeholder-syntax") agent_name="Phil" ;;
        "props-injection") agent_name="Pete" ;;
        "react-integration-pattern") agent_name="Rita" ;;
        "save-and-flatten") agent_name="Sasha" ;;
        "slot-visibility-rules") agent_name="Susie" ;;
        "temporary-ungrouping") agent_name="Tammy" ;;
    esac
    
    # Create agent file
    cat > "${file_name}.md" << EOF
# ${agent_name} - Element Guardian of ${domain_name}

You are ${agent_name}, the Element Guardian of the ${domain_name} domain.

## Your Domain:
- **Primary**: ${category}/${domain_name}.md
- **Category**: ${category}
- **Type**: Element Guardian

## Your Mission:
Protect the integrity of the ${domain_name} concept by reviewing all changes for:
- Consistency with the documented pattern
- No breaking changes to the established concept
- Proper usage in implementations
- Clear and accurate documentation

## Review Protocol:
1. Analyze changes against your specific domain document
2. Verify the concept remains intact
3. Check for impacts on dependent concepts
4. Ensure documentation stays clear

## Response Format:
🟢 'Approved - maintains ${domain_name} integrity'
🟡 'Review needed - potential impact on [aspect]'
🔴 'CONFLICT - violates ${domain_name} principle: [specific issue]'

## Core Principles:
Protect the specific patterns and rules defined in ${category}/${domain_name}.md
EOF

    echo "Created ${file_name}.md for ${agent_name} (${domain_name})"
}

# Process all domains
echo "Creating Element Guardians for all domains..."

# ARCHITECTURE domains
for domain in /Users/shannamiddleton/Local\ Drive\ Mac/mi\ agency/miApps/S1-Domains/L1-ATOMS/ARCHITECTURE/*.md; do
    create_agent "ARCHITECTURE" "$domain"
done

# CANVAS domains
for domain in /Users/shannamiddleton/Local\ Drive\ Mac/mi\ agency/miApps/S1-Domains/L1-ATOMS/CANVAS/*.md; do
    create_agent "CANVAS" "$domain"
done

# CORE domains
for domain in /Users/shannamiddleton/Local\ Drive\ Mac/mi\ agency/miApps/S1-Domains/L1-ATOMS/CORE/*.md; do
    create_agent "CORE" "$domain"
done

# DESIGN-SYSTEM domains
for domain in /Users/shannamiddleton/Local\ Drive\ Mac/mi\ agency/miApps/S1-Domains/L1-ATOMS/DESIGN-SYSTEM/*.md; do
    create_agent "DESIGN-SYSTEM" "$domain"
done

# ELEMENTS domains
for domain in /Users/shannamiddleton/Local\ Drive\ Mac/mi\ agency/miApps/S1-Domains/L1-ATOMS/ELEMENTS/*.md; do
    create_agent "ELEMENTS" "$domain"
done

# PRESETS domains
for domain in /Users/shannamiddleton/Local\ Drive\ Mac/mi\ agency/miApps/S1-Domains/L1-ATOMS/PRESETS/*.md; do
    create_agent "PRESETS" "$domain"
done

# TRANSFORMER domains
for domain in /Users/shannamiddleton/Local\ Drive\ Mac/mi\ agency/miApps/S1-Domains/L1-ATOMS/TRANSFORMER/*.md; do
    create_agent "TRANSFORMER" "$domain"
done

echo "All Element Guardians created!"