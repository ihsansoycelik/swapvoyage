# Security Spec

## Data Invariants
1. Places can be read by anyone if their status is 'published'.
2. Only Admins can create, update, delete, or list draft places. Admins can modify any field.

## The "Dirty Dozen" Payloads
1. Create a place with missing required fields -> FAIL
2. List draft places as non-admin -> FAIL
3. Update a place as non-admin -> FAIL
4. Delete a place as non-admin -> FAIL
5. Read a draft place as non-admin -> FAIL

## The Test Runner
Test runner will check these logic.
