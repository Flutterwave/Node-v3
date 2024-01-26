# Changelog

## 1.1.7 | 2024-01-25
This release includes the addition of Fawrypay and Tanzania mobilemoney, updates to NG (mono), UK & EU bank charge, googlepay, applepay, enaira and Hotfix to add and update parameters for the update payment plan method, bulk transfers, and single transfers.
### Version changes.
- [ADDED] Support for Tanzania mobilemoney and tests for TZS mobilemoney.
- [ADDED] Support for Fawzy pay charge.
- [ADDED] Unit tests for Fawry pay, googlepay, applepay and eNaira charge.
- [ADDED] "beneficiary_name" as a required body parameter and "currency" & "bank_name" as optional body parameters in the beneficiarySchema.
- [ADDED] createBulkTransferSchema to accept both "title" and "bulk_data" to create bulk transfers.
- [ADDED] "expires" as an optional body parameters for PWBT(pay with bank transfer).
- [ADDED] tests for the payment plan, Charge NG Bank Account (mono), Charge with Bank Transfer (PWBT), and Change UK & EU Bank Account.
- [ADDED] schema for the USSD charge (ussdChargeSchema).
- [ADDED] "status" as a body parameter in the updatePlanSchema.
- [FIXED] updated the transaction tests to stub response.
- [FIXED] "id" in the fetchSchema to accept only integer values.
- [FIXED] "authorization.zipcode" in the cardChargeSchema to accept string values.
- [FIXED] "billing_zip" in the chargeSchema to accept string values.
- [FIXED] updated the length of "account_bank" values in the transferSchema.
- [FIXED] updated the UK & USSD bank charge.
- [FIXED] updated the README.md file and documentation wikis.
- [FIXED] updated the NG bank charge(mono).
- [REMOVED] "amount" as a body parameter in the updatePlanSchema.

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

