# qip.iaqi.org
static copies of QIP websites

## Archiving a year, robots.txt, sitemap.xml, llms.txt

Adding a year, and keeping `robots.txt`, `sitemap.xml`, `llms.txt` and the
Event data of the year pages up to date, is done with two scripts of
[IAQI/conference-theme](https://github.com/IAQI/conference-theme):
`scripts/archive_year.py` and `scripts/archive_discovery.py`. The procedure and
the reasons behind it are in the website guide,
["Archiving a year"](https://github.com/IAQI/conference-theme/blob/main/docs/website-guide.md#archiving-a-year).
Do not edit `robots.txt`, `sitemap.xml`, `llms.txt` or the
`<!-- iaqi-archive:... -->` blocks by hand: run `archive_discovery.py` again.
