# Graph Report - .  (2026-05-30)

## Corpus Check
- 28 files · ~259,081 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 88 nodes · 68 edges · 25 communities (10 shown, 15 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.72)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]

## God Nodes (most connected - your core abstractions)
1. `Semyon Shuchkin` - 7 edges
2. `Post` - 4 edges
3. `main()` - 2 edges
4. `activateTab()` - 2 edges
5. `nextTab()` - 2 edges
6. `startCycle()` - 2 edges
7. `stopCycle()` - 2 edges
8. `hooks` - 2 edges
9. `BlogConfig` - 2 edges
10. `PostAdmin` - 2 edges

## Surprising Connections (you probably didn't know these)
- `PostAdmin` --uses--> `Post`  [INFERRED]
  blog/admin.py → blog/models.py

## Communities (25 total, 15 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.12
Nodes (15): activateTab(), cursor, dots, nav, navIndicator, navList, nextTab(), panels (+7 more)

### Community 1 - "Community 1"
Cohesion: 0.12
Nodes (14): activateTab(), cursor, dots, nav, navIndicator, navList, nextTab(), panels (+6 more)

### Community 2 - "Community 2"
Cohesion: 0.22
Nodes (3): PostAdmin, Meta, Post

### Community 3 - "Community 3"
Cohesion: 0.25
Nodes (8): Arduino, CEO & Tech Entrepreneur, C++, Django, fundev, PostgreSQL, Python, Semyon Shuchkin

### Community 4 - "Community 4"
Cohesion: 0.5
Nodes (3): main(), Run administrative tasks., Django Settings

## Knowledge Gaps
- **45 isolated node(s):** `Run administrative tasks.`, `cursor`, `track`, `sections`, `dots` (+40 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **15 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.