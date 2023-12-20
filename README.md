# Lottokeeper

## Developer

Balázs Valentin Leyrer

## User's Documentary

### Summary

Make a Lottery Game with localStorage using. The coin is the "akcse". The first state the player start with 10.000 akcse and the operator start with 0 akcse. The game cost is 500 akcse. The player can bet and the operator can run a rule.

### Game rules

| Count | Opeartor | Player | Chance |
|-------|----------|--------|--------|
| 0 | +500 | -500 | very big
| 1 | +500 | -500 | 1:3
| 2 | -250 | +250 | 1:47
| 3 | -1000 | +1000 | 1:1806
| 4 | -2000 | +2000 | 1:211876
| 5 | -5000 | +5000 | 1:575757

## Developer's Documentary

### Requirements

- node.js
- React

### File Structure

- public
    - favicon.ico
    - index.html
    - logo192.png
    - logo512.png
    - manifest.json
    - robots.txt
- src
    - Assests
        - akcse.png
    - Components
        - Lottery.js
        - Tickets.js
        - TopBar.js
    - Styles
        - Lottery.css
        - Tickets.css
        - TopBar.css
    - App.js
    - AppContext.css
    - index.css
    - index.js
- README.md