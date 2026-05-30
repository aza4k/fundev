## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- ALWAYS read graphify-out/GRAPH_REPORT.md before reading any source files, running grep/glob searches, or answering codebase questions. The graph is your primary map of the codebase.
- IF graphify-out/wiki/index.md EXISTS, navigate it instead of reading raw files
- For cross-module "how does X relate to Y" questions, prefer `graphify query "<question>"`, `graphify path "<A>" "<B>"`, or `graphify explain "<concept>"` over grep — these traverse the graph's EXTRACTED + INFERRED edges instead of scanning files
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).

## Django Project

This is a Django-based web application.

Structure:
- `studio/`: Main project configuration (settings, urls).
- `blog/`: Application handling the blog models, views, and logic.
- `templates/`: HTML templates.
- `static/`: Static assets (CSS, JS, images).
- `media/`: User-uploaded files (blog thumbnails).

Workflows:
- Start server: `python manage.py runserver`
- Create migrations: `python manage.py makemigrations`
- Apply migrations: `python manage.py migrate`
- Create superuser: `python manage.py createsuperuser`
- Admin interface: `/admin/` (Default credentials: `admin` / `adminpass123`)
