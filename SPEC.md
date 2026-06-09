# CBH Take-Home Project - Technical Specification

> Node.js take-home assessment: deterministic partition key algorithm + ticket breakdown exercise.
> Demonstrates refactoring skills, unit testing, clean code principles, and technical writing.

## Executive Summary

CBH Take-Home Project is a **Node.js + JavaScript** technical assessment with two parts: (1) refactoring the `deterministicPartitionKey` function with unit tests, and (2) breaking down a staffing platform feature ticket into actionable sub-tickets. The project showcases clean code principles, test-driven development, and technical communication skills.

---

## 1. Problem Statement

### Context
Clipboard Health (CBH) take-home interview assessment. Two independent tasks testing engineering fundamentals.

### Task 1 — Refactoring (`dpk/`)
Refactor `deterministicPartitionKey` to be more readable, add unit tests with Jest.

**Original contract:**
- Given an event object: if `event.partitionKey` exists, use it
- Otherwise, hash the entire event with SHA3-512
- Ensure result is a string ≤ 256 characters
- If no event: return `"0"` (literal zero string)

### Task 2 — Ticket Breakdown (`Ticket_Breakdown.md`)
Break down a feature ticket into 2-5 sub-tickets with acceptance criteria and estimates.

**Feature:** Allow Facilities to define custom Agent IDs (instead of internal DB IDs) on shift reports.

---

## 2. Technology Stack

| Component | Technology | Version |
|-----------|-----------|---------|
| Language | JavaScript (Node.js) | LTS |
| Testing | Jest | 26+ |
| Hash | Node.js `crypto` (SHA3-512) | Built-in |
| Linting | ESLint | 7.x |

---

## 3. Module Structure

```
dpk/
  dpk.js                # deterministicPartitionKey (refactored)
  dpk.test.js           # Jest unit tests
  index.js              # Module export

utils/
  hash.js               # SHA3-512 hash utility (createHash wrapper)
  hash.test.js          # Hash utility tests
  index.js              # Utils exports

index.js                # CLI entry: reads partitionKey from stdin, prints result
Ticket_Breakdown.md     # Sub-ticket breakdown (Task 2)
Refactoring.md          # Explanation of refactoring decisions
```

---

## 4. Core Logic

```javascript
// deterministicPartitionKey (refactored)
const MAX_PARTITION_KEY_LENGTH = 256;
const TRIVIAL_PARTITION_KEY = "0";

function deterministicPartitionKey(event) {
  if (!event) return TRIVIAL_PARTITION_KEY;
  
  const candidate = event.partitionKey 
    ? event.partitionKey 
    : hash(JSON.stringify(event));
  
  const key = typeof candidate === "string" 
    ? candidate 
    : JSON.stringify(candidate);
  
  return key.length > MAX_PARTITION_KEY_LENGTH 
    ? hash(key) 
    : key;
}
```

**Refactoring principles applied:**
- Extract constants (`MAX_PARTITION_KEY_LENGTH`, `TRIVIAL_PARTITION_KEY`) to named values
- Early return for null event case
- Separate concerns: hash utility in `utils/hash.js`
- Avoid nested conditionals
- Prefer explicit returns over variable accumulation

---

## 5. CLI Usage

```bash
node index.js
# Prompts: "Insert a partition key:"
# Returns: deterministic hash result
```

---

## 6. Testing Strategy

```bash
npm test    # Jest tests for dpk.js and hash.js
```

**Test cases cover:**
- `deterministicPartitionKey(undefined)` → `"0"`
- `deterministicPartitionKey({})` → SHA3-512 hash of `"{}"`
- `deterministicPartitionKey({ partitionKey: "abc" })` → `"abc"`
- `deterministicPartitionKey({ partitionKey: 123 })` → `"123"` (coerced to string)
- Long partition key (> 256 chars) → hashed result

---

## 7. Ticket Breakdown (Task 2 Summary)

Feature: Custom Agent IDs for Facility reports

Sub-tickets proposed:
1. **DB Schema** — Add `FacilityAgentId` join table (facilityId, agentId, customId)
2. **API — Create/Update custom ID** — `PUT /facilities/:fid/agents/:aid/custom-id`
3. **API — Query with custom IDs** — Update `getShiftsByFacility` to join custom IDs
4. **Report generator update** — Use `customId` (if exists) instead of internal `agent.id`
5. **Frontend** — UI to assign/manage custom IDs per agent per facility

---

## 8. Issues Found

### Logic Issues
- **`index.js` uses `interface` as a variable name** — `interface` is a **reserved word** in strict mode and TypeScript. While it works in non-strict Node.js, it will cause a `SyntaxError` in TypeScript or strict mode JavaScript. Should be renamed (e.g., `rl` for readline interface).

### Missing Test Cases
- Edge case: `event.partitionKey` is an object (not string) — the refactored code calls `JSON.stringify()` on it, but tests should explicitly verify this path.
- Edge case: `event.partitionKey` is `null` (explicitly null, not undefined) — `null.partitionKey` would not be reached but `{ partitionKey: null }` would use the falsy branch (hash the event), which may or may not be the intended behavior.

### Code Quality
- `Refactoring.md` section "Your Explanation Here" is unfilled — the explanation of refactoring decisions was not written.
- `Ticket_Breakdown.md` section "Your Breakdown Here" only contains coding preferences, not the actual ticket breakdown requested by the prompt.
