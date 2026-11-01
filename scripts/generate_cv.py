"""Generate the public CV from the same content used by the Nuxt portfolio.

Run: python3 scripts/generate_cv.py (requires reportlab).
"""

import json
from pathlib import Path
from xml.sax.saxutils import escape

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph

ROOT = Path(__file__).resolve().parents[1]
profile = json.loads((ROOT / "domain/data/profile.json").read_text())
output = ROOT / "public/Kum_Brian_Ihimbru_CV.pdf"
output.parent.mkdir(parents=True, exist_ok=True)

styles = {
    "name": ParagraphStyle("name", fontName="Helvetica-Bold", fontSize=22, leading=26, textColor=colors.HexColor("#102b42"), spaceAfter=4),
    "title": ParagraphStyle("title", fontName="Helvetica-Bold", fontSize=10, leading=14, textColor=colors.HexColor("#12627a"), spaceAfter=3),
    "body": ParagraphStyle("body", fontName="Helvetica", fontSize=9.2, leading=12.4, spaceAfter=4, alignment=TA_LEFT),
    "section": ParagraphStyle("section", fontName="Helvetica-Bold", fontSize=9, leading=12, textColor=colors.HexColor("#12627a"), spaceBefore=9, spaceAfter=5),
    "role": ParagraphStyle("role", fontName="Helvetica-Bold", fontSize=9.4, leading=12.6, spaceBefore=3, spaceAfter=3),
    "bullet": ParagraphStyle("bullet", fontName="Helvetica", fontSize=9.2, leading=12.4, leftIndent=9, firstLineIndent=-9, spaceAfter=3),
}
story = []


def add(text, style="body"):
    story.append(Paragraph(text, styles[style]))


add(escape(profile["name"]), "name")
add(escape(profile["title"].upper()), "title")
add(f'{escape(profile["location"])} | <link href="{profile["website"]}">kumbrian.vercel.app</link> | <link href="{profile["github"]}">github.com/KumBrian</link>')
add("PROFESSIONAL SUMMARY", "section")
add(escape(profile["summary"]))
add("PROFESSIONAL EXPERIENCE", "section")
for role in profile["experience"]:
    add(f'{escape(role["title"])} | {escape(role["company"])} | {escape(role["period"])}', "role")
    for highlight in role["highlights"]:
        add("&#8226; " + escape(highlight), "bullet")

add("SELECTED PROFESSIONAL PROJECTS", "section")
for project in profile["projects"]:
    if project["engagement"] == "Professional":
        add(f'<b>{escape(project["title"])}</b> — {escape(project["contribution"])}')

add("INDEPENDENT CLIENT WORK", "section")
for project in profile["projects"]:
    if project["engagement"] == "Independent client":
        add(f'<b>{escape(project["title"])}</b> (<link href="{project["url"]}">{project["url"].removeprefix("https://").rstrip("/")}</link>) — {escape(project["contribution"])} {escape(", ".join(project["tech"]))}.')

add("TECHNICAL SKILLS", "section")
add(" | ".join(f'<b>{escape(skill["category"])}</b>: {escape(skill["tools"])}' for skill in profile["skills"]))
add("EDUCATION", "section")
education = profile["education"]
add(" | ".join(escape(education[key]) for key in ["degree", "institution", "location"]))


def footer(canvas, doc):
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(colors.HexColor("#526477"))
    canvas.drawString(40, 23, f'Updated {profile["updated"]}')
    canvas.drawRightString(A4[0] - 40, 23, str(doc.page))


SimpleDocTemplate(
    str(output), pagesize=A4, topMargin=34, bottomMargin=34, leftMargin=40, rightMargin=40,
    title=f'{profile["name"]} — CV', author=profile["name"],
).build(story, onFirstPage=footer, onLaterPages=footer)
print(output)
