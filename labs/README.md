# Labs for Applied Angular

If you could really learn by just watching someone code, all it would take to be a great programmer is a YouTube Premium or Udemy subscription.

You have to do it. You have to struggle, succeed, fall apart, cry in the shower, then get back at it and have a brief intense moment of joy enough to keep you going through the next grief/shower-crying cycle.

Do these labs _up to the point_ you want to cry in the shower. Remember, this is "Fake", nobody is going to be mad at you if your code sucks, doesn't work quite right, whatever. The point is to stretch and learn, and then experiment.

## Choose Your Own Adventure

The point of these labs is _not_ for me to force you to do some things so you get some kind of gold sticker for following directions. They are meant to be "prompts" to help you find what you need to get good at applying Angular.

Take as little or as much time with each one as you think is beneficial. If you are really trying to get good at "design", spend more time (after a thing works) making it look right, whatever inspires you.

## There is (almost) no such thing as "cheating"

I want you to do the work, but you can ask me or even other people questions. You can google (or Bing, or whatever), I don't care if you use Github CoPilot. But remember, the point isn't to get "done", it's to learn.

## My Intentions With This Course and These Labs

I want you to practice "inside out" development. In other words, if the first thing you do is create services, stores, etc. and you don't 100% know what you are doing already, you can easily create a mess.

- _Start With the UI_ - that is the most important thing in Angular. "How will express this to our customer?". Create "mockups" in templates that have fake data, don't do anything at all. Progress to making it less "fake" until you think you "Have it".

- _Generalize_ after you have something you've got down. Create child components, create services, decide to use formal state management, etc.

  - Note: I _really_ suggest you do this _all the time_. Resist the temptation to think "Oh, this is close enough to what this other person on my team did" and just copy and paste and tweak some code you don't understand. You might _think_ it is faster, your lead or whatever might think that too, but just look at them and smile and do your thing. They will all be happy - and so will - with the results. \*\*Most frustration in coding isn't a "skills issue", it is you are using someone else's ideas of how something should work even when it isn't the right thing or you don't understand it. Remember your job isn't an "Angular Developer", it's an "Application Developer" in your company that applies Angular to create business value. You are not a paid typist or copy-pasta.

- _Pay Attention To State_ and data flow. Get good at `inputs`, `signals`, and experiment with the control flow syntax in templates. Try (in these labs) to find excuses to use `@for`, `@if`, `@switch`. You want these in your toolbox for when you need them.
  - Create `computed` fields for weird things nobody will care about, even if it isn't in the lab.
    - How many pages of books were written in each century?
    - Can I show if the current value of the counter is a prime number or not?
    - You all write _very important code_ for a living where you have to "stick to requirements" and deal with _process_. This ain't that. Have fun.
    - If you have a lightbulb moment on _anything_ revel in that for a bit. See you if you can use that insight in other ways _even if it doesn't make sense_.

## Some Lab Suggestions / Options

Read through these, and take a guess at where you should start, based on what interests you, and where your previous skills are. You can even make something up that I didn't suggest here \*\*as long as you are practicing "applying" Angular from the inside-out. Start at the UI, grow "out" from there into services, other components, directives, state management, etc.

I'm listing out each of my suggestions in order of increasing challenge, though each option has levels in it, and you can do as little or as much as you feel you are able/need to.

### Option 1 - Counter [Counter Lab](./options-counter.md)

We did a little of this in class, but it's a good way to get going, I think. No API stuff (unless you want to), about Signals primarily, and "Lifting State" (a technique for working from the inside out).

### Option 2 - Books [Books Lab](./option-books.md)

This is harder, but more "real". Involves API. Will require (at some level) formal state management.

### Option 3 - Halloween Tracker

Add / Finish Features for the Halloween Tracker, Add Polish.

#### The "edit" Functionality

When you look at the list of houses you've rated, there is an edit button that opens a modal.

1. Can you load the record for that house from the store in some way and display the details?
2. Can you (using the concepts from the form we built to add a house) create a form where they can edit the details?
3. Can you mock the API call?
4. What if the user "hacks" the URL and adds the id for a house that doesn't exist? How would you handle that?

#### NitPicks

On the house-list, it would be nice if the filter slider had a label of some kind.

It might be nice if it indicated what the current setting for that slider is.

It might be nice if the lowest setting you can filter to with the slider is the lowest recorded score for the houses (so you can't filter them all away)

Likewise, the max should be the highest recorded score for all the houses.

Really nit-picky, but the sort for address or rating only allows you to sort in descending order. Can we add a way to toggle either ascending and descending.

Really, really nit-picky and challenging: Can we make it so you can sort by multiple properties at the same time? In other words, I want to sort by score, then address, or address, then score, either ascending or descending.

Really, really, really nit-picky. You know, it might be nice if there was a way to sort just in the order they were added, chronologically. We'd have to store the time they were added at the API, I suppose, but then you could not only sort by that, but we could add some kind of "timeline" visualization of your journey. [See "TimeLine" at DaisyUI for inspiration](https://daisyui.com/components/timeline/)

#### Add a 'delete' button

On the list of houses, add a button (next to edit) to delete the house. This should take them to another route (maybe a modal like the edit) that asks them to
confirm if they really want to delete the house.

If they do, remove it from the list of houses, and update the mocked API appropriately.

### Option 4 - Fix Issues in the Classroom App

Some examples:

- Looking at the routes for 'learning', 'halloween', and whatever you did in 'labs', each has a pretty week UI for navigation. Can you make them better and _consistent_?

- The dashboard component: right now it is showing some weak stats for the golf score.
  - Make that look better.
- Add in a section on the dashboard for showing some summary items about the halloween tracker.
  - How many houses?
  - What is the average score for all the houses?
  - What is the number of houses with full size candybars? What percentage of the houses does that represent?
  - What is the number of houses with good ambiance? What is the percentage of the houses with good ambiance?
  - Whatever else you think might be helpful or fun.

## Submitting Your Work

When you are done, you have to send me your progress for the day.

Rules:

- In the project, please run `ng lint` and fix any linting errors that are discovered by the linter.
- Please do not send me code that does not build.
- You do not need to rebase or squash your commits or anything.
- Push your branch to your repository, and then go to your repository and send me a pull request.

I will review (in the next day or two, at least) what you've sent, give you a bit of feedback. Check your github account notifications to see what I've sent.

Remember, this is a public repository. That means:

- Anyone (including other students) can see what you've sent.
