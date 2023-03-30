# Changelog
## 1.1.3 | 2023-03-29
Scheduled updates and bug fixes. This release fixes all the bugs in the new SDK (v1.1.0)
### Version changes.
- [FIXED] Updated validation for empty meta objects in charge and transfer methods.
- [FIXED] Added conditional validation for `Country`, `Network`and `Voucher` parameters in Mobile Money schema.
- [FIXED] [#111](https://github.com/Flutterwave/Node/issues/111) Verify transaction error.
- [FIXED] Title validation in Card issuing schema.
- [FIXED] Import errors in Virtual account methods.
- [ADDED] Support for query parameters in listing methods.
- [REMOVED] Replaced `first_name` and `last_name` in the Card tokenization schema with a single `full_name`field.

## 1.1.1 | 2023-03-17
This release fixes all morx errors thrown in custom request class.
### Version changes.
- [FIXED] Morx error returned in custom service class in v1.1.0

## 1.1.0 | 2023-03-14
This release fixes all npm warnings and dependabot error messages.
### Version changes.
- [FIXED] [#103](https://github.com/Flutterwave/Node/issues/103)  Multiple Vulnerabilities Introduced by dependencies
- [FIXED] [#87](https://github.com/Flutterwave/Node/issues/87)  Amount is required for payment plan creation
- [FIXED] [#84](https://github.com/Flutterwave/Node/issues/84)  Cannot filter bills by category
- [FIXED] [#79](https://github.com/Flutterwave/Node/issues/79)  Urgent: Transactions GET endpoint or any endpoints with qs doesn't work
- [ADDED] Support for ApplePay, GooglePay and eNaira payments.

