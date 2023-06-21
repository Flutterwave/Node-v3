# Changelog

## 1.1.6 | 2023-06-21
Hotfix on Transfer fees and Bank lists.
### Version changes.
- [FIXED] Transfer fees returning 0 for all amounts.
- [FIXED] Null data response for Bank lists.

## 1.1.5 | 2023-04-13
Hotfix to hide header information in the library response.
### Version changes.
- [FIXED] Removed headers in the response.

## 1.1.4 | 2023-04-13
This release fixes the empty subscription fetch query with user email.
### Version changes.
- [FIXED] Empty data in response object for subscription fetch with email query parameter


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

