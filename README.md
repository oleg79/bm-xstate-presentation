```json
{
  "id": "xstate-presentation-repo",
  "initial": "idle",
  "context": {
    "starsAmount": 0
  },
  "states": {
    "idle": {
      "on": {
        "CLONE": "cloning",
        "CLICK_STAR": {
          "actions": ["increase-stars"],
          "cond": "i-find-it-useful"
        }
      }
    },
    "cloning": {
      "invoke": {
        "src": "clone-git-repo-from-terminal",
        "onDone": {
          "target": "idle",
          "actions": ["run-locally"]
        }
      }
    },
  }
}
```
😅 😜