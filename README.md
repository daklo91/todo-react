# Todo React

A todo-list app made with React.  
Live version on Netlify: https://daklo-todo-react.netlify.app/

![Introduction image](/screenshots/intro-picture.png?raw=true "Picture showing how the app looks like in use")

## Table of contents

1. [About](#about)
2. [Hurdles during development](#hurdles-during-development)
3. [Development Choices](#development-choices)
   - [Confetti](#confetti)
   - [Smooth Animations](#smooth-animations)
   - [Confirmation Modal](#confirmation-modal)
   - [Snackbar](#snackbar)
   - [Copying Text](#copying-text)
   - [Keyboard Support](#keyboard-support)
   - [Support For Very Large Texts](#support-for-very-large-texts)
   - [Saving Tasks To LocalStorage](#saving-tasks-to-localstorage)
   - [Extensive Touchscreen Support](#extensive-touchscreen-support)
4. [Other](#other)

## About

This project was a challenge from [Frontend Mentor](https://www.frontendmentor.io/). They gave me the design files and these user stories:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Add new todos to the list
- Mark todos as complete
- Delete todos from the list
- Filter by all/active/complete todos
- Clear all completed todos
- Toggle light and dark mode
- **Bonus**: Drag and drop to reorder items on the list

After completing these user stories, I added some of my own. You can read about these in the [Development Choices](#development-choices) section.

I broke myself free from the constraints I gave myself in the [last challenge](https://github.com/daklo91/reactolator) and used two third party packages which were [React DOM Confetti](https://github.com/daniel-lundin/react-dom-confetti) by Daniel Lundin and [React Beautiful DnD](https://github.com/atlassian/react-beautiful-dnd) by the Atlassian team.

Lastly, this app is in fact my first ever React app. It was first started as a way to practice what I was learning from Academind's [React Course](https://www.udemy.com/course/react-the-complete-guide-incl-redux/), and later developed with the experience I had gained through other projects. I figured this was a good idea because the CSS and general app structure was already in place.

## Hurdles during development

In my [last challenge](https://github.com/daklo91/reactolator), I wrote about problems and how I overcame them. I'm happy to say that in this project, there were of course some small problems, but nothing to really mention. The development was pretty much problem free. The only "hurdles" was to read the documentation for [React Beautiful DnD](https://github.com/atlassian/react-beautiful-dnd) and celebrating Christmas and New Year.

## Development Choices

I made some choices to make my app stand out from the crowd in Frontend Mentor and to make the app more "real world" ready.

### Confetti

<details>
  <summary>Show gif</summary>
  
  ![Confetti gif](/screenshots/confetti.gif?raw=true "a Gif showing the confetti")
</details>

I wanted the user to feel a little bit of gratification when completing a task. An idea I had was to light up the todo element similar to how [Asana](https://asana.com/) does it, but I eventually went for [Confetti](https://github.com/daniel-lundin/react-dom-confetti) because I was no longer constrained to not use third-party packages.
Another reason for why I decided to use Confetti was because I think it looks cool.

### Smooth Animations

<details>
<summary>Show gif</summary>

![Animation gif](/screenshots/animation.gif?raw=true "Gif showing the animations")

</details>

To make the app feel better to use, I had to create some animations. The animations are very simple and effective at giving the user cues, feedback and time to understand what is happening on the screen.

### Confirmation Modal

When one or more tasks are completed and when clicking the "Clear Completed" button, a modal will pop up to ask if the user really wants to delete the completed tasks. <br/>
I think it is really important to have security measures like this for users to prevent accidents.

### Snackbar

![Snackbar image](/screenshots/snackbar.png?raw=true "A picture showing the snackbar")

Speaking of security measures, I added a Snackbar similar to most Google products.<br/>
This snackbar is a reusable component that has options for content, position, display time, and an optional function.<br/>
I use this in two cases, when the user copies a tasks text to the clipboard and when deleting a single task. The latter has a button with a function that gives the user the option to undo the deletion.

### Copying Text

This function is actually a band aid. I had to code it like this to make users able to copy text on touchscreens. The reason is that if the user tries to copy text the normal way without this function, a drag and drop event happens instead.
An alternative to this which I would create if I had the time would be to create a modal which pops up when tapping the task. In this modal, the user would be able to copy the text and even edit it, just like in Trello and Google Keep (and countless other apps that uses DnD).

### Keyboard Support

React Beautiful DnD comes with its own support for Keyboard. Because of this, I decided to make the app work 100% with keyboards because I think it would be a waste to disable this feature or have the app work halfway with keyboards.<br/>
Now the user can tab-focus to any element that has an action with some extra features:</br>

- When focusing on a task, all of the delete buttons will be visible.
- When using the Clear Completed button, the focus will automatically go to the modal that appears.
- Ctrl + Z will Undo a deleted task.

There is a lot going on behind the scenes here, like disabling the Undo button when the user drags an item (without disabling, it would screw with the state updates).

### Support For Very Large Texts

<details>
<summary>Show gif</summary>

![Large text gif](/screenshots/big-text.gif?raw=true "A gif showing how large tasks work")

</details>

It is typical for todo-lists to only have a task in a single line. But I coded it so that the user can take as long notes as they want. When they do, the task will be restricted to 4 lines, but with a button that allows it to expand to the full text. The function that expands the task is not animated however, because that would require me to restrict the height of the note, something that I don't want to impose on the user.<br/>
The user can basically copy/paste the whole Lord of the Rings trilogy in a task but it is definitively not designed for this kind of use though.

### Saving Tasks To LocalStorage

It was not specified in the user stories, but I did it anyway. It requires little effort once you know how to do it, and it allows for the app to actually be useable instead of just being a showpiece.

### Extensive Touchscreen Support

![Touchscreen version png](/screenshots/touchscreen-version.png?raw=true "A åicture showing the touchscreen version of the app")

The app will adapt the instruction text (the text in the footer) depending on the device. It will also show all the delete buttons if the user uses a touchscreen. I also made the text larger than the original design, from 12px to 16px. This gives a much better user experience.

## Other

The performance on low-end devices is poor. The reason is because that I animate height, something that is a "no-go" in the real world. Another reason is because of the confetti. I would definitively make both of these an option that can be toggled off if I had the time.<br/>The app works fine on medium to high end devices though.

Found a problem with the code or want to ask a question? Please don't hesitate to create an issue or contact me.
Frontend Mentor has asked me to not share their design files and I will honor it.
