# personal/libs

Reusable local libraries shared by personal automation scripts and skills.

This repository is currently consumed as a git submodule by the personal
skills repository. Keep the code here generic: skill-specific business logic
should stay in the consuming skill or script repository.

## Layout

```text
bun/
  image-handling/   # Bun/Node image helpers
  zectrix/          # Bun/Node Zectrix API helpers
uv/                 # Python/uv libraries
```

## Known Consumers

| Consumer | How it uses this repo |
|---|---|
| `Stark-X/skills.git:publish-token-costs` | Uses this repo as `publish-token-costs/scripts/modules` for reusable Bun helpers used by the token cost report skill. |

## Maintenance Rule

If another repository or script imports code from this repo, add it to the
Known Consumers table in this README in the same change that introduces the
dependency. This makes it clear which reports, skills, or scripts may break
when a library API changes.
