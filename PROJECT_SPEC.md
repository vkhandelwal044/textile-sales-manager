# Textile Sales Manager — Project Specification

**Version:** 0.2.0 (category-based bill entry)

## Goal
A lightweight, responsive internal sales-record tool for a textile retail shop, with less repetitive typing and a conventional, print-friendly retail sales bill.

## Bill fields
- Customer name and mobile (optional)
- Date and unique challan/reference number
- Salesperson
- Payment mode: cash or online; optional online bank/provider
- One or more item lines

## Item line fields
- Category selected from a reusable category list
- Item particulars entered per bill line
- Optional HSN/shop item code
- Quantity and rate
- Automatic line amount and bill total

The app provides common starter categories and lets the user add categories as needed. Individual designs do not need to be pre-registered. Items in the same category can have different particulars, codes, quantities and rates.

## Reports and data
- Dashboard daily totals, cash/online breakdown, recent bills
- Searchable sales history and print action
- Daily/monthly/all-time reports and bank/provider totals
- CSV export and JSON backup/restore
- Shop name setting

## Print layout
Use a conventional monochrome sales-bill/cash-memo layout. Display only business details actually entered by the user. Do not fabricate a GSTIN, tax breakdown, address, phone number or legal compliance claim. Label the printout as an internal sales record and not a GST tax invoice.

## Limitations
- Local browser storage only; no backend, authentication, central database or cross-device sync
- Not GST-compliant invoicing software
- No inventory, stock deduction, supplier accounts, alteration tracking, parcel tracking, split payments or bank integration

## Acceptance criteria
1. A bill line can select a category without retyping it.
2. User can add a new category, and it remains available after refresh in the same browser.
3. Item particulars, code, quantity and rate remain independently editable for every line.
4. Amounts and grand total calculate automatically.
5. Existing saved bills without category fields still display and print.
6. Printed bill has a clean monochrome layout and does not invent official tax/business identifiers.
7. Existing JSON backup/restore, history and reports continue to work.
