---
date: '0'
title: 'AI Spline System'
titl: 'AI Spline System'
cover: './demo.png'
external: 'https://valorkr.itch.io/skates-delivery'
youtube1: 'true'
youtube11: 'true'
code: './code.png'
doc: 'Documentation'
tech:
  - Unity
  - C#
text: 'The AI System that makes my second year group project feel alive for <a href="https://valorkr.itch.io/skates-delivery">Skates Delivery</a>. Later also merged with <a href="https://jacksmithhocking.wordpress.com/2020/11/26/error-404/">Jack Smith-Hokings AI system</a>.'
text2: 'In this code snippet all nodes that are close together are merged and set speed is priotitized to a non default value. After an action list is set order is gathered from a priority value if they are different.'
---

During 2020 while studying at AIE I was a programmer in a team of 7 (2 Designers, 2 Artists and 3 programmers). I was in charge of doing the AI systems for [Skatres Delivery](https://valorkr.itch.io/skates-delivery) [[Alt](https://drive.google.com/file/d/1c76uegHtl-lmVtWYAfRb5wz78sHyKQs4/view)].

The system works by having an array of nodes at positions attached to each other (a spline). At each node and in between an action can set to be taken. Nodes from other splines can be attached to each other
to create a network of splines where they can more in more than 1 dimensional.

Here is shown the spline system working as a traffic system

- When cars are within distance of each other they slow down or stop.
- At traffic intersection and corners cars slow down.
- At traffic intersection cars wait for passing cars to cross in depending on the lane they are on.
- Cars are shown to intentionally ignore some node paths.
