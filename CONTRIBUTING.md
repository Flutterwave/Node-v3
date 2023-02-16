<p align="center">
    <img title="Flutterwave" height="200" src="https://flutterwave.com/images/logo/full.svg" width="50%"/>
</p>

Thank you for taking the time to contribute to our library🙌🏾.

In this section, we detail everything you need to know about contributing to this library.


**[Code of Conduct](https://github.com/probot/template/blob/master/CODE_OF_CONDUCT.md)**

## **I don't want to contribute, I have a question**

Please don't raise an issue to ask a question. You can ask questions on our [forum](http://forum.flutterwave.com) or developer [slack](https://bit.ly/34Vkzcg). We have an army of Engineers on hand to answer your questions there.

## How can I contribute?

### Reporting a bug

Have you spotted a bug? Fantastic! Before raising an issue, here are some things to do:

1. Search to see if another user has reported the bug. For existing issues that are still open, add a comment instead of creating a new one.
2. Check our forum and developer slack to confirm that we did not address it there.

When you report an issue, it is important to:

1. Explain the problem
    - Use a clear and descriptive title to help us to identify the problem.
    - Describe steps we can use to replicate the bug and be as precise as possible.
    - Include screenshots of the error messages.
2. Include details about your configuration and setup
    - What version of the library are you using?
    - Did you experience the bug on test mode or live?
    - Do you have the recommended versions of the library dependencies?

<aside>

💡 Please make use of the issue template when reporting bugs.

</aside>

### Requesting a feature

If you need an additional feature added to the library, kindly send us an email at developers@flutterwavego.com. Be sure to include the following in your request:

1. A clear title that helps us to identify the requested feature.
2. A brief description of the use case for that feature.
3. Explain how this feature would be helpful to your integration.
4. Library name and version.

### Submitting changes (PR)

Generally, you can make any of the following changes to the library:

1. Bug fixes
2. Performance improvement
3. Documentation update
4. Functionality change (usually new features)

<aside>

💡 Changes that are cosmetic in nature and do not add anything substantial to the stability, functionality, or testability of the library will generally not be accepted.

</aside>

Follow these steps when making a pull request to the library:

1. Fork the repository and create your branch from master.
2. For all types of changes (excluding documentation updates), add tests for the changes.
3. If you are making a functionality change, update the docs to show how to use the new feature.
4. Ensure all your tests pass.
5. Make sure your code lints.
6. Write clear log messages for your commits. one-liners are fine for small changes, but bigger changes should have a more descriptive commit message (see sample below). 
7. Use present tense for commit messages, "Add feature" not "Added feature”.
8. Ensure that you fill out all sections of the PR template.
9. Raise the PR against the `staging` branch.
10. After you submit the PR, verify that all [status checks](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/collaborating-on-repositories-with-code-quality-features/about-status-checks) are passing

```markdown
$ git commit -m "A brief summary of the commit
> 
> A paragraph describing what changed and its impact."
```

<aside>

💡 For your pull request to be reviewed, you need to meet the requirements above. We may ask you to complete additional tests, or other changes before your pull request can be ultimately accepted.

</aside>

We encourage you to contribute and help make the library better for the community. Got questions? send us a [message](https://bit.ly/34Vkzcg).

Thank you.

The Flutterwave team 🦋