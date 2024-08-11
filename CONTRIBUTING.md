# Contributors guidelines

This document summarizes the most important points for people interested in
contributing to Vitruvian, especially via bug reports or pull requests.

## Table of contents

- [Reporting bugs](#reporting-bugs)
- [Proposing features or improvements](#proposing-features-or-improvements)
- [Contributing pull requests](#contributing-pull-requests)
- [Communicating with developers](#communicating-with-developers)

## Reporting bugs

Report bugs [here](https://github.com/two-shots-later/vitruvian-vtt/issues/new/choose).
Please follow the instructions in the chosen template.

Make sure that the bug you are experiencing is reproducible in the latest Vitruvian
releases. 

## Proposing features or improvements

Feel free to submit an issue with the `Feature request` template!
link: https://github.com/two-shots-later/vitruvian-vtt/issues/new?assignees=&labels=&projects=&template=feature_request.md&title=

## Contributing pull requests

If you want to add new features, please make sure that:

- This functionality is desired, which means that it solves a common use case
  that several users will need in their real-life projects.
- You talked to other developers on how to implement it best. 
- Even if it doesn't get merged, your PR is useful for future work by another
  developer.

Similar rules can be applied when contributing bug fixes - it's always best to
discuss the implementation in the bug report first if you are not 100% about
what would be the best fix.

### Be mindful of your commits

Try to make simple PRs that handle one specific topic. Just like for reporting
issues, it's better to open 3 different PRs that each address a different issue
than one big PR with three commits. This makes it easier to review, approve, and
merge the changes independently.

When updating your fork with upstream changes, please use ``git pull --rebase``
to avoid creating "merge commits". Those commits unnecessarily pollute the git
history when coming from PRs.

Also try to make commits that bring the app from one stable state to another
stable state, i.e. if your first commit has a bug that you fixed in the second
commit, try to merge them together before making your pull request. This
includes fixing build issues or typos, adding documentation, etc.

This [Git style guide](https://github.com/agis-/git-style-guide) also has some
good practices to have in mind.

### Format your commit messages with readability in mind

The way you format your commit messages is quite important to ensure that the
commit history and changelog will be easy to read and understand. A Git commit
message is formatted as a short title (first line) and an extended description
(everything after the first line and an empty separation line).

The short title is the most important part, as it is what will appear in the
changelog or in the GitHub interface unless you click the "expand" button.
Try to keep that first line under 72 characters, but you can go slightly above
if necessary to keep the sentence clear.

It should be written in English, starting with a capital letter, and usually
with a verb in imperative form. A typical bugfix would start with "Fix", while
the addition of a new feature would start with "Add". A prefix can be added to
specify the Vitruvian area affected by the commit. Some examples:

- Add Wizard Class support
- Show doc tooltips when hovering properties in the theme editor
- Fix Character Creator box sizes and custom data defaults

If your commit fixes a reported issue, please include it in the _description_
of the PR (not in the title, or the commit message) using one of the
[GitHub closing keywords](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue)
such as "Fixes #1234". This will cause the issue to be closed automatically if
the PR is merged. Adding it to the commit message is easier, but adds a lot of
unnecessary updates in the issue distracting from the thread.

Here's an example of a well-formatted commit message (note how the extended
description is also manually wrapped at 80 chars for readability):

```text
Prevent French fries carbonization by fixing heat regulation

When using the French fries frying module, Vitruvian would not regulate the heat
and thus bring the oil bath to supercritical liquid conditions, thus causing
unwanted side effects in the character creater.

By fixing the regulation system via an added binding to the internal feature,
this commit now ensures that Vitruvian will not go past the ebullition temperature
of cooking oil under normal atmospheric conditions.
```

### Write unit tests

When fixing a bug or contributing a new feature, we recommend including unit
tests in the same commit as the rest of the pull request. Unit tests are pieces
of code that compare the output to a predetermined *expected result* to detect
regressions. 

Pull requests that include tests are more likely to be merged, since we can have
greater confidence in them not being the target of regressions in the future.

For bugs, the unit tests should cover the functionality that was previously
broken. If done well, this ensures regressions won't appear in the future
again. For new features, the unit tests should cover the newly added
functionality, testing both the "success" and "expected failure" cases if
applicable.

Feel free to contribute standalone pull requests to add new tests or improve
existing tests as well.

## Communicating with developers

Vitruvian has a discord! All are welcome @ https://discord.gg/eq43DZ5M

Thanks for your interest in contributing!

—The Vitruvian development team
