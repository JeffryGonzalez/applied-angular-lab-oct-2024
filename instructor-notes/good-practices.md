# Good Practices with Angular

## Prefer opening your editor in the folder with the `angular.json` file in it.

## Coding Stuff Up

### Not Using the Angular CLI to Generate Components (etc.)
It was more useful when you had to also add a component to the module.

It would also create (by default) a test for you. 
- This was never "right" in that as soon as you added some your tests would break.
- You probably don't want to write tests for each of your components unless you are building a component library.

### Using Templates / Snippets to Generate Components

Components are mostly "refactored" to - you start with something "big" and break it down into smaller pieces.

> Two Defaults for Components: They should be `standalone`, and should have the `ChangeDetectionStrategy.OnPush` set on them.


