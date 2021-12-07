---
date: '0'
title: 'AI Spline System'
cover: './demo.png'
github: 'https://github.com/bchiang7/halcyon-site'
external: 'https://halcyon-theme.netlify.com/'
youtube1: 'true'
doc: 'Documentation'
tech:
  - Unity
  - C#
text: 'The AI System that makes my second year group project feel alive for Skates Delivery. Later also merged with Jack Smith-Hokings AI system'
---

During 2020 while studying at AIE I was a programmer in a team of 7 (2 Designers, 2 Artists and 3 programmers). I was in charge of doing the AI systems for [Skatres Delivery](https://valorkr.itch.io/skates-delivery) [[Alt](https://drive.google.com/file/d/1c76uegHtl-lmVtWYAfRb5wz78sHyKQs4/view)].

The system works by having an array of nodes at positions attached to each other (a spline). At each node and in between an action can set to be taken. Nodes from other splines can be attached to each other
to create a network of splines where they can more in more than 1 dimensional.

Here is shown the spline system working as a traffic system

- When cars are within distance of each other they slow down or stop.
- At traffic intersection and corners cars slow down.
- At traffic intersection cars wait for passing cars to cross in depending on the lane they are on.
- Cars are shown to intentionally ignore some node paths.

Earlier on in the year (2021) I worked as part of a team for a practice project. This AI system was
used to merge with a previous programmers AI system (Combat AI) to complement it.
The AI will do its attacks with choices on moving while attacking, stop at point and attach and attack and stop when within range. Both AI's end up working together with nothing breaking.
