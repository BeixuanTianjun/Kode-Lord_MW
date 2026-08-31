# Scientific Agent Skills

163 scientific and research Agent Skills from
[K-Dense-AI/scientific-agent-skills](https://github.com/K-Dense-AI/scientific-agent-skills),
vendored here as project-scoped skills so they load automatically for anyone
working in this repository.

- **Upstream:** https://github.com/K-Dense-AI/scientific-agent-skills
- **Version:** 2.65.0
- **Commit:** f6fcafeb1cc8c82eca0160a18bc41c38427b8e0f (2026-08-29)
- **License:** MIT — see `LICENSE.md`, © 2025 K-Dense Inc.

Each subdirectory is one skill with a `SKILL.md` at its root. Nothing here was
modified; the contents are a verbatim copy of the upstream `skills/` directory.

## Updating

```bash
git clone --depth 1 https://github.com/K-Dense-AI/scientific-agent-skills /tmp/sas
rm -rf .claude/skills/*/
cp -r /tmp/sas/skills/. .claude/skills/
```

Then update the version and commit recorded above.

## Note on context

163 skills is a lot of standing context — upstream itself suggests installing a
topical subset instead of the full collection. If sessions start feeling slow or
unfocused, delete the skill directories you don't need; each one is independent.
