---
title: Continuous Integration Solutions on Pantheon
description: Run automated unit and integration tests with Terminus and Drupal SimpleTest.
tags: [platformintegrations]
categories: []
---
Continuous Integration (CI) is a method of running automated unit and integration tests to apply quality control. Pantheon doesn't provide or host tools for continuous integration, but many tools and techniques are compatible with Pantheon. If you have a particular use case or technique that you'd like to highlight, let us know by [contacting support](/docs/support).

## Terminus Command-Line Interface

[Terminus](/docs/terminus/) is a Drush-based command-line interface (CLI) in the Pantheon core API. Most operations available through the Pantheon Dashboard can be performed with Terminus, including:

- Site creation
- [Multidev environment](/docs/multidev) creation and removal
- Content cloning
- Code pushes

You can use Terminus for scripting many operations. For example, a post-commit hook can trigger Jenkins to create a Multidev environment with the latest code on master and the content from Live, then run automated browser tests using [Selenium](https://github.com/SeleniumHQ/selenium).

## Drupal SimpleTest
[SimpleTest](https://drupal.org/project/simpletest){.external} is a testing framework based on the [SimpleTest PHP library](https://github.com/simpletest/simpletest){.external} included with Drupal core. If you are creating a custom web application, you should consider including SimpleTests for your module functionality.

**Note:** The `drush test-run` command was dropped in Drush 7 and 8. See this [GitHub issue](https://github.com/drush-ops/drush/issues/1362){.external} for more details.

[SiteTest](https://www.drupal.org/project/site_test){.external} is a contrib module designed to allow running tests directly against your sites code instead of a base Drupal clone of your site.  This module is recommended to use SimpleTest on Pantheon.

<div class="alert alert-export" role="alert">
<h4 class="info">Exports</h4>
<p markdown="1">This section uses [Terminus](/docs/terminus/) commands with variables for your site and environment. Before continuing, set the variables `$site` and `$env` in your terminal session to match your site name and the Dev environment:</p>

<pre>
<code class="bash hljs">export site=yoursitename
export env=dev
</code></pre>

</div>

1. Enable site_test:

   ```bash
   terminus drush $site.$env -- en site_test -y
   ```

2. Clear the cache immediately before running tests:

   ```bash
   terminus drush $site.$env -- cc all
   ```

3. Tests require the absolute path to the code base, found in the variable `DRUPAL_ROOT`:

   ```bash
   terminus drush $site.$env -- eval "echo DRUPAL_ROOT"
   ```

   You can use `2>/dev/null` to strip the output to only the path, as shown below.

4. To run tests the full command will look something like this:

   ```bash
   terminus drush $site.$env -- exec php `terminus drush $site.$env -- eval "echo DRUPAL_ROOT" 2>/dev/null`/scripts/run-tests.sh --url http://$env-$site.pantheonsite.io Genomeweb
   ```

   NOTE: In the above command the `--url` option is required to be passed as multidevs do not respond to `localhost`.

A full CircleCI command might look similar to this:

```
      - run:
          name: Test simpletest
          command: |
            if [ "${CIRCLE_BRANCH}" != "master" ]; then

              terminus drush $site.$env -- en site_test -y

              # If you don't clear the cache immediately before running tests
              # we get the html gibberish instead of a passing test.
              terminus drush $site.$env -- cc all

              # NOTE: It is a requirement to be running the latest version of
              # terminus in order to exclude the notice in shell output of the
              # embedded command to find the absolute path.
              terminus drush $site.$env -- exec php `terminus drush $site.$env -- eval "echo DRUPAL_ROOT" 2>/dev/null`/scripts/run-tests.sh --url http://$env-$site.pantheonsite.io ExampleTestGroupName

            fi
```

## Integration Bot

We recommend creating a bot user account that will handle the tasks or jobs by an external continuous integration service rather a standard user account.

- Add the bot to select projects
- Manage separate SSH Keys for CI

## Known Limitations

At this time, Pantheon does not provide or support:

  - [Webhooks](https://en.wikipedia.org/wiki/Webhook)
- [Git hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks)
- Running [Jenkins](https://jenkins.io/index.html) or other Continuous Integration software on our servers. You'll need to self-host or use a hosted CI solution. [Compare solutions here](https://en.wikipedia.org/wiki/Comparison_of_continuous_integration_software).
- Shell access
- [PHPUnit](https://github.com/sebastianbergmann/phpunit/) Unit Testing PHP Framework: You can still write tests and include them in your code, but you'll need to run them on a CI server, not Pantheon.
